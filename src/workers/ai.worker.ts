/**
 * AI Worker Phase 3 - Client-Side AI Integration
 *
 * Manages two AI pipelines inside a dedicated Web Worker:
 * 1. Background Removal (RMBG-1.4 via @huggingface/transformers v3)
 * 2. Smart Crop (COCO-SSD via TensorFlow.js)
 *
 * The worker uses a Singleton pattern for model loading to ensure
 * models only load into RAM once. Progress callbacks are posted
 * back to the main thread for UI progress bars.
 */

// ===================== Message Type Definitions =====================

export interface RequestMessage {
  type: 'REMOVE_BACKGROUND' | 'SMART_CROP';
  imageData: ImageData;
  requestId?: string;
}

export interface ProgressPayload {
  status: string;
  percentage: number;
  model: string;
}

export interface FocalPointPayload {
  focalX: number;
  focalY: number;
  detected: boolean;
  bbox?: number[];
  label?: string;
}

interface WorkerMessage {
  type: string;
  payload: any;
  requestId?: string;
}

// ===================== Part 1: Worker Message Handler =====================

self.addEventListener('message', async (event: MessageEvent<RequestMessage>) => {
  const { type, imageData, requestId } = event.data;

  try {
    switch (type) {
      case 'REMOVE_BACKGROUND':
        await handleRemoveBackground(imageData, requestId);
        break;
      case 'SMART_CROP':
        await handleSmartCrop(imageData, requestId);
        break;
      default:
        self.postMessage({
          type: 'ERROR',
          payload: `Unknown command type: ${type}`,
          requestId,
        });
    }
  } catch (error: any) {
    self.postMessage({
      type: 'ERROR',
      payload: `AI processing failed: ${error?.message || 'Unknown error'}`,
      requestId,
    });
  }
});

// ===================== Part 2: HuggingFace Transformers.js v3 Setup =====================

let transformersPipeline: any = null;

/**
 * Singleton accessor for the HuggingFace Transformers.js v3 background removal pipeline.
 * Loads the model only once and caches it in IndexedDB via browser cache.
 * v3 natively supports briaai/RMBG-1.4 (SegformerForSemanticSegmentation).
 */
async function getBackgroundRemovalPipeline(): Promise<any> {
  if (transformersPipeline) return transformersPipeline;

  // Dynamic import of @huggingface/transformers v3
  // This package natively supports briaai/RMBG-1.4 without model architecture errors
  const { pipeline, env } = await import('@huggingface/transformers');

  // Explicitly configure environment:
  // allowLocalModels = false forces fetch from HF Hub on first run
  // useBrowserCache = true traps downloaded model in IndexedDB for subsequent runs
  env.allowLocalModels = false;
  env.useBrowserCache = true;

  // Report download progress
  const progressCallback = (progressData: any) => {
    const msg: WorkerMessage = {
      type: 'PROGRESS',
      payload: {
        status: progressData.status || 'loading',
        percentage: progressData.progress || 0,
        model: 'RMBG-1.4',
      },
    };
    self.postMessage(msg);
  };

  // Initialize the image segmentation pipeline with progress tracking
  // @huggingface/transformers v3 natively supports briaai/RMBG-1.4 (SegformerForSemanticSegmentation)
  transformersPipeline = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
    progress_callback: progressCallback,
  });

  // Notify completion
  self.postMessage({
    type: 'PROGRESS',
    payload: {
      status: 'ready',
      percentage: 100,
      model: 'RMBG-1.4',
    },
  });

  return transformersPipeline;
}

// ===================== Part 3: Background Removal Execution =====================

async function handleRemoveBackground(imageData: ImageData, requestId?: string): Promise<void> {
  const segmenter = await getBackgroundRemovalPipeline();

  // Pass the raw pixel data into the segmenter
  // @huggingface/transformers v3 accepts ImageData directly
  const result = await segmenter(imageData, {
    mask_threshold: 0.5,
  });

  // The model returns a 1-channel grayscale tensor mask
  // where 1.0 = solid foreground, 0.0 = absolute background
  const maskData = result[0]?.mask?.data || result[0]?.mask;

  if (!maskData) {
    throw new Error('No mask data returned from segmentation model');
  }

  // Convert mask tensor to a flat Uint8Array (0-255)
  const maskArray = maskData instanceof Float32Array
    ? new Uint8Array(maskData.map((v: number) => Math.round(v * 255)))
    : maskData instanceof Uint8Array
      ? maskData
      : new Uint8Array(maskData);

  // Construct a new ImageData matching original dimensions
  // Map grayscale tensor values to the Alpha channel
  // Leave RGB channels as 0 (the original image will provide them)
  const maskImageData = new ImageData(imageData.width, imageData.height);
  const maskPixels = maskImageData.data;

  for (let i = 0; i < imageData.width * imageData.height; i++) {
    // Alpha channel = mask value (0 = transparent, 255 = opaque foreground)
    const maskValue = maskArray[i] ?? 0;
    maskPixels[i * 4 + 3] = maskValue;
  }

  // Transfer the mask back to the main thread
  const transferables: Transferable[] = [maskImageData.data.buffer];
  (self as any).postMessage(
    {
      type: 'MASK_GENERATED',
      payload: maskImageData,
      requestId,
    },
    transferables
  );
}

// ===================== Part 5: Smart Crop (TF.js + COCO-SSD) =====================

let cocoDetector: any = null;

/**
 * Lazily loads TensorFlow.js with WebAssembly backend and COCO-SSD model.
 */
async function getCocoDetector(): Promise<any> {
  if (cocoDetector) return cocoDetector;

  // Report loading progress
  self.postMessage({
    type: 'PROGRESS',
    payload: {
      status: 'loading',
      percentage: 10,
      model: 'COCO-SSD',
    },
  });

  // Dynamic imports to avoid initial bundle bloat
  const tfjs = await import('@tensorflow/tfjs');
  const cocoSsd = await import('@tensorflow-models/coco-ssd');

  // Ensure TFJS uses the WebAssembly backend for faster CPU execution
  await tfjs.setBackend('wasm');

  self.postMessage({
    type: 'PROGRESS',
    payload: {
      status: 'loading',
      percentage: 40,
      model: 'COCO-SSD',
    },
  });

  // Load the object detection model
  cocoDetector = await cocoSsd.load();

  self.postMessage({
    type: 'PROGRESS',
    payload: {
      status: 'ready',
      percentage: 100,
      model: 'COCO-SSD',
    },
  });

  return cocoDetector;
}

async function handleSmartCrop(imageData: ImageData, requestId?: string): Promise<void> {
  const detector = await getCocoDetector();

  // Run object detection on the image data
  const predictions = await detector.detect(imageData);

  if (!predictions || predictions.length === 0) {
    // No objects detected - return center of image as fallback
    const payload: FocalPointPayload = {
      focalX: imageData.width / 2,
      focalY: imageData.height / 2,
      detected: false,
    };
    self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
    return;
  }

  // Filter to find the most prominent subject
  // Sort by area (largest bounding box first), use score as tiebreaker
  const sorted = predictions
    .filter((p: any) => p.score > 0.5) // Minimum confidence threshold
    .sort((a: any, b: any) => {
      const areaA = a.bbox[2] * a.bbox[3];
      const areaB = b.bbox[2] * b.bbox[3];
      return areaB - areaA; // Largest area first
    });

  if (sorted.length === 0) {
    // No high-confidence detections - return center
    const payload: FocalPointPayload = {
      focalX: imageData.width / 2,
      focalY: imageData.height / 2,
      detected: false,
    };
    self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
    return;
  }

  // Take the largest, highest-confidence prediction
  const primary = sorted[0];
  const [startX, startY, width, height] = primary.bbox;

  // Calculate the exact focal center of the subject
  // focalX = startX + width/2
  // focalY = startY + height/2
  const focalX = startX + width / 2;
  const focalY = startY + height / 2;

  const payload: FocalPointPayload = {
    focalX,
    focalY,
    detected: true,
    bbox: primary.bbox,
    label: primary.class,
  };
  self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
}

// Prevent TypeScript errors for self in worker context
export {};