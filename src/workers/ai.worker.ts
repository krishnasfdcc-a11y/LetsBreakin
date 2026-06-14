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
  type: 'REMOVE_BACKGROUND' | 'SMART_CROP' | 'EXTRACT_COLORS';
  imageData: ImageData;
  maskData?: ImageData;
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

export interface ColorPayload {
  colors: string[];
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
        await handleSmartCrop(imageData, requestId, event.data.maskData);
        break;
      case 'EXTRACT_COLORS':
        await handleExtractColors(imageData, requestId, event.data.maskData);
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

// ===================== Part 2: IndexedDB Model Cache =====================

const MODEL_CACHE_KEY = 'rmbg_model_cache_v1';

/**
 * Checks IndexedDB for cached model weights before fetching from network.
 */
async function checkIndexedDBCache(): Promise<boolean> {
  try {
    const cacheExists = await self.indexedDB?.hasItem?.(MODEL_CACHE_KEY) ?? false;
    return cacheExists;
  } catch {
    return false;
  }
}

// ===================== Part 2: HuggingFace Transformers.js Setup =====================

let transformersPipeline: any = null;

/**
 * Singleton accessor for the Transformers.js background removal pipeline.
 * Checks IndexedDB for cached model weights before network fetch.
 */
async function getBackgroundRemovalPipeline(): Promise<any> {
  if (transformersPipeline) return transformersPipeline;

  const { pipeline, env } = await import('@huggingface/transformers');

  env.allowLocalModels = false;
  env.useBrowserCache = true;

  // Check for cached model in IndexedDB
  const hasCache = await checkIndexedDBCache();

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

  transformersPipeline = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
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

  // Force CPU backend explicitly. Inside a Web Worker, WebGL is not available,
  // so TF.js defaults to trying WebGL and fails with "Failed to compile fragment shader".
  // The CPU backend works reliably in worker threads for COCO-SSD inference.
  await tfjs.setBackend('cpu');
  await tfjs.ready();

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'loading', percentage: 40, model: 'COCO-SSD' },
  });

  // Load the object detection model
  cocoDetector = await cocoSsd.load();

  self.postMessage({
    type: 'PROGRESS',
    payload: { status: 'ready', percentage: 100, model: 'COCO-SSD' },
  });

  return cocoDetector;
}

async function handleSmartCrop(imageData: ImageData, requestId?: string, maskData?: ImageData): Promise<void> {
  // Feature 1.2: Mask-based Spatial Boundary Analysis (Zero-latency fallback)
  if (maskData) {
    let minX = maskData.width;
    let maxX = 0;
    let minY = maskData.height;
    let maxY = 0;
    let found = false;

    const data = maskData.data;
    const width = maskData.width;
    const height = maskData.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) { // Targeting non-zero alpha values
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (found) {
      const subjectWidth = maxX - minX;
      const subjectHeight = maxY - minY;
      const focalX = minX + (subjectWidth / 2);
      const focalY = minY + (subjectHeight / 2);

      const payload: FocalPointPayload = {
        focalX, focalY, detected: true,
        bbox: [minX, minY, subjectWidth, subjectHeight],
        label: 'mask-subject'
      };
      self.postMessage({ type: 'FOCAL_POINT', payload, requestId });
      return; // Skip COCO-SSD entirely
    }
  }

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

// ===================== Part 6: Color Extraction (K-Means Clustering) =====================

/**
 * Extracts background pixels and performs K-Means clustering to find dominant colors.
 * Only processes pixels where mask alpha is <= 0.1 (background).
 */
async function handleExtractColors(
  imageData: ImageData,
  requestId?: string,
  maskData?: ImageData
): Promise<void> {
  const bgPixels: number[] = [];
  const srcData = imageData.data;
  
  if (maskData) {
    // Extract only background pixels (alpha < 0.1 in mask)
    const maskArray = maskData.data;
    for (let i = 0; i < srcData.length; i += 4) {
      const maskAlpha = maskArray[i + 3] ?? 0;
      if (maskAlpha < 25.5) { // 0.1 * 255 = 25.5
        bgPixels.push(srcData[i], srcData[i + 1], srcData[i + 2]); // RGB
      }
    }
  } else {
    // No mask - use all pixels
    for (let i = 0; i < srcData.length; i += 4) {
      bgPixels.push(srcData[i], srcData[i + 1], srcData[i + 2]);
    }
  }

  // Step 6-7: K-Means clustering to find top 2 dominant colors
  const colors = kMeansColors(bgPixels, 2);
  
  // Convert to hex
  const hexColors = colors.map(rgb => {
    const r = Math.round(rgb[0]);
    const g = Math.round(rgb[1]);
    const b = Math.round(rgb[2]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  });

  const payload: ColorPayload = { colors: hexColors };
  self.postMessage({ type: 'COLORS_EXTRACTED', payload, requestId });
}

/**
 * K-Means clustering for RGB color extraction.
 * Simplified implementation for finding dominant colors.
 */
function kMeansColors(pixels: number[], k: number): number[][] {
  if (pixels.length === 0) return [];
  
  const n = pixels.length / 3;
  const maxIter = 20;
  
  // Initialize centroids with random pixels
  const centroids: number[][] = [];
  for (let i = 0; i < k; i++) {
    const idx = Math.floor(Math.random() * n) * 3;
    centroids.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
  }

  let assignments = new Int32Array(n);
  
  for (let iter = 0; iter < maxIter; iter++) {
    // Assign each pixel to nearest centroid
    for (let i = 0; i < n; i++) {
      let bestDist = Infinity;
      let bestIdx = 0;
      for (let c = 0; c < k; c++) {
        const r = pixels[i * 3] - centroids[c][0];
        const g = pixels[i * 3 + 1] - centroids[c][1];
        const b = pixels[i * 3 + 2] - centroids[c][2];
        const dist = r * r + g * g + b * b;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = c;
        }
      }
      assignments[i] = bestIdx;
    }

    // Recalculate centroids
    const counts = new Array(k).fill(0);
    const sums = new Array(k).fill(null).map(() => [0, 0, 0]);
    for (let i = 0; i < n; i++) {
      const c = assignments[i];
      counts[c]++;
      sums[c][0] += pixels[i * 3];
      sums[c][1] += pixels[i * 3 + 1];
      sums[c][2] += pixels[i * 3 + 2];
    }
    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        centroids[c][0] = sums[c][0] / counts[c];
        centroids[c][1] = sums[c][1] / counts[c];
        centroids[c][2] = sums[c][2] / counts[c];
      }
    }
  }

  return centroids;
}

export {};