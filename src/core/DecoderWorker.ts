// src/core/DecoderWorker.ts
/**
 * Dedicated Web Worker for HEIC/HEIF → PNG conversion.
 * Runs entirely off the main thread to keep the UI responsive.
 * Uses the heic2any library which internally leverages a WASM decoder.
 */

import heic2any from 'heic2any';

export interface DecoderWorkerMessage {
  buffer: ArrayBuffer;
  fileName?: string;
}

self.onmessage = async (e: MessageEvent<DecoderWorkerMessage>) => {
  const { buffer } = e.data;
  try {
    // heic2any expects a Blob, so we convert the ArrayBuffer
    const blob = new Blob([buffer], { type: 'image/heic' });

    // Convert HEIC → PNG (lossless).  If you need JPEG set toBlobType: 'image/jpeg'
    const resultBlob = await heic2any({
      blob,
      toType: 'image/png',
    });

    // heic2any returns a Blob | Blob[]; guard for single image
    const pngBlob = Array.isArray(resultBlob) ? resultBlob[0] : resultBlob;

    // Transfer the blob back to the main thread
    (self as unknown as Worker).postMessage({ blob: pngBlob });
  } catch (err) {
    (self as unknown as Worker).postMessage({
      error: err instanceof Error ? err.message : 'Unknown HEIC decoding error',
    });
  }
};