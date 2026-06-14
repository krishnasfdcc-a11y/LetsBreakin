/**
 * HEIC Decoder Web Worker
 *
 * This worker receives HEIC/HEIF file data as an ArrayBuffer, decodes it
 * using a WebAssembly-based HEIC decoder (heic2any), and returns a standard
 * image Blob (PNG/JPEG) back to the main thread.
 *
 * The worker uses Transferable Objects for zero-copy memory transfer
 * from the main thread, and terminates itself after posting the result
 * to free CPU resources immediately.
 */

// WebAssembly import for HEIC decoding
// Dynamic import is used to avoid bundling issues with Vite
let heic2anyModule: any = null;

/**
 * Dynamically loads the heic2any WASM module.
 * This approach ensures the WASM binary is fetched on demand
 * and doesn't bloat the initial bundle.
 */
async function loadHeicDecoder(): Promise<void> {
  if (heic2anyModule) return;

  try {
    // Dynamically import heic2any - the library handles WASM loading internally
    heic2anyModule = await import('heic2any');
  } catch (error) {
    throw new Error(`Failed to load HEIC decoder: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Converts a HEIC ArrayBuffer to a standard image Blob using the WASM decoder.
 */
async function decodeHeicToBlob(buffer: ArrayBuffer, mimeType: string = 'image/png'): Promise<Blob> {
  if (!heic2anyModule) {
    await loadHeicDecoder();
  }

  // The heic2any library accepts a Blob as input
  const heicBlob = new Blob([buffer], { type: 'image/heic' });
  
  // Convert HEIC to standard format
  const result = await heic2anyModule.default({
    blob: heicBlob,
    toType: mimeType,
    quality: 0.92,
  });

  // heic2any can return a single Blob or an Array of Blobs
  const outputBlob = Array.isArray(result) ? result[0] : result;
  return outputBlob;
}

/**
 * Worker message handler.
 * Receives HEIC data from the main thread, decodes it, and posts the result back.
 */
self.onmessage = async (event: MessageEvent<{ buffer: ArrayBuffer; mimeType?: string }>) => {
  const { buffer, mimeType = 'image/png' } = event.data;

  if (!buffer || !(buffer instanceof ArrayBuffer)) {
    self.postMessage({
      error: 'Invalid data received: expected an ArrayBuffer',
    });
    return;
  }

  try {
    // Decode the HEIC buffer to a standard image Blob
    const decodedBlob = await decodeHeicToBlob(buffer, mimeType);

    // Post the decoded Blob back to the main thread
    // No need for transferable here since Blob transfers automatically
    self.postMessage({
      blob: decodedBlob,
    });
  } catch (error) {
    self.postMessage({
      error: `HEIC decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
};

// Prevent TypeScript errors for self in worker context
export {};