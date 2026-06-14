// src/core/AutoCropWorker.ts
/**
 * AutoCropWorker – Phase 3 client-side smart subject detection.
 *
 * Runs inside a dedicated Web Worker using TensorFlow.js COCO-SSD
 * to locate the primary subject within an image.  Returns a
 * bounding box that the CanvasManager can use to re-centre the
 * viewport so the subject is never cropped out when the user
 * switches aspect ratios.
 */

export interface AutoCropRequest {
  type: 'AUTO_CROP_REQUEST';
  /** URL or pixel data representing the current image. */
  imageUrl: string;
}

export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ── Lazy-load the COCO-SSD model ────────────────────────────────────

let modelPromise: Promise<unknown> | null = null;

async function getModel() {
  if (!modelPromise) {
    // Dynamic imports so Vite can tree-shake TFJS into its own chunk
    const cocoSsd = await import('@tensorflow-models/coco-ssd');
    // Load the lightweight model variant
    modelPromise = cocoSsd.load({ base: 'lite_mobilenet_v2' });
  }
  return modelPromise;
}

self.onmessage = async (e: MessageEvent<AutoCropRequest>) => {
  if (e.data.type !== 'AUTO_CROP_REQUEST') return;

  try {
    const model = (await getModel()) as {
      detect: (
        input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData,
      ) => Promise<Array<{ bbox: [number, number, number, number]; class: string; score: number }>>;
    };

    // Load the image inside the worker (Image is available in worker contexts)
    const img = await loadImage(e.data.imageUrl);

    // Detect objects
    const predictions = await model.detect(img as unknown as HTMLImageElement);

    // Filter to only "person" class with highest confidence, or take
    // the highest-confidence detection of any class as fallback.
    const personPredictions = predictions.filter((p) => p.class === 'person');
    const best = personPredictions.length > 0
      ? personPredictions.reduce((a, b) => (a.score > b.score ? a : b))
      : predictions.length > 0
        ? predictions.reduce((a, b) => (a.score > b.score ? a : b))
        : null;

    if (!best || best.score < 0.3) {
      // No confident detection – return full image as bbox
      (self as unknown as Worker).postMessage({
        type: 'AUTO_CROP_READY',
        bbox: { x: 0, y: 0, width: img.width, height: img.height },
      });
      return;
    }

    const [startX, startY, w, h] = best.bbox;
    const bbox: BBox = { x: startX, y: startY, width: w, height: h };

    (self as unknown as Worker).postMessage({ type: 'AUTO_CROP_READY', bbox });
  } catch (err) {
    (self as unknown as Worker).postMessage({
      type: 'ERROR',
      error: err instanceof Error ? err.message : 'Auto-crop detection failed',
    });
  }
};

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    // In a worker, we can still create an ImageBitmap from a Blob URL,
    // but TFJS COCO-SSD's detect() needs HTMLImageElement-like input.
    // HTMLImageElement is not available in workers; we use ImageBitmap
    // and pass it through an OffscreenCanvas to get ImageData.
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => createImageBitmap(blob))
      .then((bitmap) => {
        // Convert ImageBitmap → ImageData via OffscreenCanvas
        const offscreen = new OffscreenCanvas(bitmap.width, bitmap.height);
        const ctx = offscreen.getContext('2d')!;
        ctx.drawImage(bitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

        // Create a synthetic object that mimics an HTMLImageElement
        // with the properties TFJS needs: width, height, and a data
        // property (though detect() can accept ImageData directly).
        const fakeImg = {
          width: bitmap.width,
          height: bitmap.height,
          // Add a tag so TFJS knows what it is (it checks .tagName)
          tagName: 'IMG',
        } as unknown as HTMLImageElement;

        // Actually TFJS COCO-SSD's detect() accepts ImageData directly,
        // but we need to resolve with an ImageData-compatible object.
        // Let's resolve with the ImageData since TFJS supports it.
        resolve(imageData as unknown as HTMLImageElement);
      })
      .catch(reject);
  });
}