/**
 * AI Worker Phase 3 - Client-Side AI Integration
 *
 * Manages two AI pipelines inside a dedicated Web Worker:
 * 1. Background Removal (MODNet via @huggingface/transformers)
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

// ===================== Part 2: HuggingFace Transformers.js Setup =====================

let transformersPipeline: any = null;

/**
 * Singleton accessor for the Transformers.js background removal pipeline.
 */
async function getBackgroundRemovalPipeline(): Promise<any> {
  if (transformersPipeline) return transformersPipeline;

  const { pipeline, env } = await import('@huggingface/transformers');

  env.allowLocalModels = false;
  env.useBrowserCache = true;

  const progressCallback = (progressData: any) => {
    self.postMessage({
      type: 'PROGRESS',
      payload: {
        status: progressData.status || 'loading',
        percentage: progressData.progress || 0,
        model: 'MODNet',
      },
    });
  };

  transformersPipeline = await pipeline('image-segmentation', 'Xenova/modnet', {
    progress_callback: progressCallback,
  });

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'ready', percentage: 100, model: 'MODNet' },
  });

  return transformersPipeline;
}

// ===================== Part 3: Background Removal Execution =====================

/**
 * Converts ImageData to a PNG Blob inside the worker using OffscreenCanvas.
 * This is required because the image-segmentation pipeline expects
 * a URL string, Blob, or File, not raw ImageData.
 */
async function imageDataToBlob(imageData: ImageData): Promise<Blob> {
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create OffscreenCanvas context');
  ctx.putImageData(imageData, 0, 0);
  return canvas.convertToBlob({ type: 'image/png' });
}

async function handleRemoveBackground(imageData: ImageData, requestId?: string): Promise<void> {
  const segmenter = await getBackgroundRemovalPipeline();

  // Convert ImageData to a Blob URL string that the pipeline can consume
  const blob = await imageDataToBlob(imageData);
  const url = URL.createObjectURL(blob);

  try {
    // Pass the URL string to the pipeline (avoid "Unsupported input type" error)
    const result = await segmenter(url, {
      mask_threshold: 0.5,
    });

    // The model returns a 1-channel grayscale tensor mask
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
    const maskImageData = new ImageData(imageData.width, imageData.height);
    const maskPixels = maskImageData.data;

    for (let i = 0; i < imageData.width * imageData.height; i++) {
      const maskValue = maskArray[i] ?? 0;
      maskPixels[i * 4 + 3] = maskValue;
    }

    // Transfer the mask back to the main thread
    const transferables: Transferable[] = [maskImageData.data.buffer];
    (self as any).postMessage(
      { type: 'MASK_GENERATED', payload: maskImageData, requestId },
      transferables
    );
  } finally {
    // Clean up the temporary blob URL
    URL.revokeObjectURL(url);
  }
}

// ===================== Part 5: Smart Crop (TF.js + COCO-SSD) =====================

let cocoDetector: any = null;

/**
 * Lazily loads TensorFlow.js with WebAssembly backend and COCO-SSD model.
 */
async function getCocoDetector(): Promise<any> {
  if (cocoDetector) return cocoDetector;

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'loading', percentage: 10, model: 'COCO-SSD' },
  });

  const tfjs = await import('@tensorflow/tfjs');
  const cocoSsd = await import('@tensorflow-models/coco-ssd');

  await tfjs.setBackend('wasm');

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'loading', percentage: 40, model: 'COCO-SSD' },
  });

  cocoDetector = await cocoSsd.load();

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'ready', percentage: 100, model: 'COCO-SSD' },
  });

  return cocoDetector;
}

async function handleSmartCrop(imageData: ImageData, requestId?: string): Promise<void> {
  const detector = await getCocoDetector();

  // Convert ImageData to blob URL for TF.js compatibility
  const blob = await imageDataToBlob(imageData);
  const url = URL.createObjectURL(blob);

  try {
    // Create an ImageBitmap from the URL for TF.js
    const bitmap = await createImageBitmap(blob);

    // Run object detection
    const predictions = await detector.detect(bitmap);

    if (!predictions || predictions.length === 0) {
      const payload: FocalPointPayload = {
        focalX: imageData.width / 2,
        focalY: imageData.height / 2,
        detected: false,
      };
      self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
      return;
    }

    const sorted = predictions
      .filter((p: any) => p.score > 0.5)
      .sort((a: any, b: any) => {
        const areaA = a.bbox[2] * a.bbox[3];
        const areaB = b.bbox[2] * b.bbox[3];
        return areaB - areaA;
      });

    if (sorted.length === 0) {
      const payload: FocalPointPayload = {
        focalX: imageData.width / 2,
        focalY: imageData.height / 2,
        detected: false,
      };
      self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
      return;
    }

    const primary = sorted[0];
    const [startX, startY, width, height] = primary.bbox;

    const focalX = startX + width / 2;
    const focalY = startY + height / 2;

    const payload: FocalPointPayload = {
      focalX, focalY, detected: true,
      bbox: primary.bbox, label: primary.class,
    };
    self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export {};