// src/core/ExportEngine.ts
/**
 * ExportEngine – Phase 4 high-fidelity offscreen export.
 *
 * When the user clicks "Export" the engine instantiates an invisible
 * OffscreenCanvas set to the original image's native resolution.
 * It replays the full history stack (transforms, filters, AI masks)
 * at full resolution and produces a lossless PNG or compressed WebP
 * download — all without touching a server.
 */

import type { TransformState, FilterUniforms, HistoryEntry } from './types';

export type ExportFormat = 'image/png' | 'image/webp';

export interface ExportOptions {
  format: ExportFormat;
  /** For WebP: 0..1 quality (default 0.92) */
  quality?: number;
}

/**
 * High-fidelity export pipeline.
 *
 * @param sourceImg - The original full-resolution HTMLImageElement.
 * @param history - The complete history stack to replay.
 * @param viewportW - The preview viewport width (for proportional scaling).
 * @param viewportH - The preview viewport height (for proportional scaling).
 * @param options - Format & quality settings.
 * @param maskData - The active AI transparency mask, if applied.
 * @returns Object URL to the final exported blob.
 */
export async function exportFullResolution(
  sourceImg: HTMLImageElement,
  history: HistoryEntry[],
  viewportW: number,
  viewportH: number,
  options: ExportOptions = { format: 'image/png' },
  maskData: ImageData | null = null,
): Promise<string> {
  const { format, quality = 0.92 } = options;
  const srcW = sourceImg.naturalWidth || sourceImg.width;
  const srcH = sourceImg.naturalHeight || sourceImg.height;

  // ── 1. Create offscreen canvas at native resolution ────────────
  const offscreen = new OffscreenCanvas(srcW, srcH);
  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('OffscreenCanvas 2D context not available');

  // ── 2. Base draw: the original image at full size ──────────────
  ctx.drawImage(sourceImg, 0, 0, srcW, srcH);

  // ── 3. Walk history stack & recompute transforms ──────────────
  // We accumulate the visual state from the history entries.

  let currentTransform: TransformState = {
    zoom: 1,
    translateX: 0,
    translateY: 0,
    rotation: 0,
    flipX: false,
    flipY: false,
  };

  let currentFilter: FilterUniforms = {
    brightness: 0,
    contrast: 1,
    saturation: 1,
  };

  for (const entry of history) {
    switch (entry.action) {
      case 'INGEST_IMAGE':
        currentTransform = entry.transform ?? currentTransform;
        break;
      case 'PAN_IMAGE': {
        const p = entry.payload as { dx?: number; dy?: number } | undefined;
        if (p) {
          currentTransform.translateX += p.dx ?? 0;
          currentTransform.translateY += p.dy ?? 0;
        }
        currentTransform = entry.transform ?? currentTransform;
        break;
      }
      case 'SET_ZOOM': {
        const p = entry.payload as { zoom?: number } | undefined;
        if (p) currentTransform.zoom = p.zoom ?? currentTransform.zoom;
        currentTransform = entry.transform ?? currentTransform;
        break;
      }
      case 'SET_ROTATION': {
        const p = entry.payload as { rotation?: number } | undefined;
        if (p) currentTransform.rotation = p.rotation ?? currentTransform.rotation;
        currentTransform = entry.transform ?? currentTransform;
        break;
      }
      case 'SET_FLIP': {
        const p = entry.payload as { flipX?: boolean; flipY?: boolean } | undefined;
        if (p) {
          currentTransform.flipX = p.flipX ?? currentTransform.flipX;
          currentTransform.flipY = p.flipY ?? currentTransform.flipY;
        }
        currentTransform = entry.transform ?? currentTransform;
        break;
      }
      case 'SET_FILTER':
        currentFilter = entry.filter ?? currentFilter;
        currentTransform = entry.transform ?? currentTransform;
        break;
      case 'APPLY_AI_MASK':
        // AI mask application is handled separately during composition
        currentTransform = entry.transform ?? currentTransform;
        break;
    }
  }

  // ── 4. Apply final transformation & filters ───────────────────

  // Determine scale factor: the preview viewport vs export resolution
  const scaleFactorX = srcW / viewportW;
  const scaleFactorY = srcH / viewportH;
  const scaleFactor = Math.max(scaleFactorX, scaleFactorY);

  // Build the transform for full-resolution export
  // This mirrors the CanvasManager.drawTransformedImage() logic
  // but at native resolution.

  const exportCanvas = new OffscreenCanvas(srcW, srcH);
  const exportCtx = exportCanvas.getContext('2d')!;

  // Clear
  exportCtx.clearRect(0, 0, srcW, srcH);

  exportCtx.save();
  // Origin at center of export canvas
  exportCtx.translate(srcW / 2, srcH / 2);

  // Apply rotation
  exportCtx.rotate((currentTransform.rotation * Math.PI) / 180);

  // Apply flipping
  exportCtx.scale(currentTransform.flipX ? -1 : 1, currentTransform.flipY ? -1 : 1);

  // Apply zoom & translation (scaled to export resolution)
  const exportZoom = currentTransform.zoom * scaleFactor;
  exportCtx.scale(exportZoom, exportZoom);
  exportCtx.translate(
    currentTransform.translateX * scaleFactor,
    currentTransform.translateY * scaleFactor,
  );

  // Draw image centered
  exportCtx.drawImage(sourceImg, -srcW / 2, -srcH / 2);

  const hasMask = history.some((e) => e.action === 'APPLY_AI_MASK');
  if (hasMask && maskData) {
    const maskCanvas = new OffscreenCanvas(maskData.width, maskData.height);
    maskCanvas.getContext('2d')!.putImageData(maskData, 0, 0);
    exportCtx.globalCompositeOperation = 'destination-in';
    exportCtx.drawImage(maskCanvas, -srcW / 2, -srcH / 2, srcW, srcH);
    exportCtx.globalCompositeOperation = 'source-over';
  }

  exportCtx.restore();

  // ── 5. Apply filters via a temporary 2D canvas pixel loop ──────
  // (For export we use CPU-based filtering since WebGL requires a
  // rendering context which OffscreenCanvas doesn't expose easily.)
  const finalData = exportCtx.getImageData(0, 0, srcW, srcH);
  applyFilterUniformsCPU(finalData.data, currentFilter);

  const finalExportCanvas = new OffscreenCanvas(srcW, srcH);
  const finalCtx = finalExportCanvas.getContext('2d')!;
  finalCtx.putImageData(finalData, 0, 0);

  // ── 6. Convert to Blob & create download URL ───────────────────
  const blob = await finalExportCanvas.convertToBlob({
    type: format,
    quality: format === 'image/webp' ? quality : undefined,
  });

  return URL.createObjectURL(blob);
}

/**
 * Trigger a browser download for the given object URL.
 * Creates a hidden <a> element and programmatically clicks it.
 */
export function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ── CPU-based filter application (matches WebGL shader logic) ──────

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function applyFilterUniformsCPU(pixels: Uint8ClampedArray, f: FilterUniforms): void {
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i] / 255;
    let g = pixels[i + 1] / 255;
    let b = pixels[i + 2] / 255;

    // Brightness (additive)
    r += f.brightness;
    g += f.brightness;
    b += f.brightness;

    // Contrast (scale around 0.5)
    r = (r - 0.5) * f.contrast + 0.5;
    g = (g - 0.5) * f.contrast + 0.5;
    b = (b - 0.5) * f.contrast + 0.5;

    // Saturation (distance from perceptual luminance)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = luminance + (r - luminance) * f.saturation;
    g = luminance + (g - luminance) * f.saturation;
    b = luminance + (b - luminance) * f.saturation;

    // Clamp and write back
    pixels[i] = Math.round(clamp(r, 0, 1) * 255);
    pixels[i + 1] = Math.round(clamp(g, 0, 1) * 255);
    pixels[i + 2] = Math.round(clamp(b, 0, 1) * 255);
    // Alpha channel (pixels[i+3]) is left unchanged
  }
}