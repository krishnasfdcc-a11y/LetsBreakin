// src/core/AIWorker.ts
/**
 * AIWorker – Phase 3 client-side AI background removal.
 *
 * Runs inside a dedicated Web Worker so that model inference
 * (which may be CPU/GPU intensive) never blocks the main thread.
 *
 * Uses Hugging Face Transformers.js with the briaai/RMBG-1.4 model
 * to generate a transparency mask.  The mask is returned to the main
 * thread as an ImageData (grayscale alpha channel).
 */

export interface AIMaskRequest {
  type: 'AI_MASK_REQUEST';
  /** The raw pixel data from the currently displayed image. */
  imageData: ImageData;
}

// ── Inline type for the pipeline (avoid importing full transformers types) ─
type RawImage = unknown;

let pipelinePromise: Promise<unknown> | null = null;

async function getPipeline() {
  if (!pipelinePromise) {
    // Dynamic import so Vite can chunk-transformers separately
    const { pipeline, env } = await import('@xenova/transformers');

    // Use local cache so model weights are downloaded once
    env.localModelPath = undefined; // let it use the default cache
    env.allowRemoteModels = true;
    // @xenova/transformers uses its own caching layer (IndexedDB / Cache API)

    pipelinePromise = pipeline('image-segmentation', 'briaai/RMBG-1.4', {
      quantized: true, // use quantized ONNX weights for smaller download / faster load
    });
  }
  return pipelinePromise;
}

self.onmessage = async (e: MessageEvent<AIMaskRequest>) => {
  if (e.data.type !== 'AI_MASK_REQUEST') return;

  try {
    const segmenter = (await getPipeline()) as {
      (img: RawImage): Promise<Array<{ mask: RawImage }>>;
    };

    // The pipeline expects a URL or a raw image – we can pass the ImageData
    // directly because Transformers.js supports HTMLCanvasElement / ImageData.
    const results = await segmenter(e.data.imageData as unknown as RawImage);

    // briaai/RMBG-1.4 returns a single mask (foreground probability)
    const mask = results[0]?.mask;
    if (!mask) throw new Error('No mask returned from model');

    // The mask object from Transformers.js has properties: .data (Float32Array), .width, .height
    const maskData = (mask as { data: Float32Array; width: number; height: number }).data;
    const maskWidth = (mask as { width: number }).width;
    const maskHeight = (mask as { height: number }).height;

    // Convert float probabilities [0..1] to Uint8Clamped alpha values [0..255]
    const alphaArray = new Uint8ClampedArray(maskData.length);
    for (let i = 0; i < maskData.length; i++) {
      alphaArray[i] = Math.round(Math.min(1, Math.max(0, maskData[i])) * 255);
    }

    const maskImageData = new ImageData(alphaArray, maskWidth, maskHeight);

    (self as unknown as Worker).postMessage({
      type: 'AI_MASK_READY',
      mask: maskImageData,
    });
  } catch (err) {
    (self as unknown as Worker).postMessage({
      type: 'ERROR',
      error: err instanceof Error ? err.message : 'AI masking failed',
    });
  }
};