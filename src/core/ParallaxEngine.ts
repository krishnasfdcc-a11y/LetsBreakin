/**
 * Feature 1.4: 3D Parallax Separation Engine
 *
 * Uses two independent OffscreenCanvas contexts:
 * - BackgroundCanvas: source image with subject hole stretched/inpainted
 * - ForegroundCanvas: isolated AI subject with transparent boundaries
 *
 * Renders frame-by-frame parallax with Z-space scaling:
 * - Background scales slower (bg=1.0 + frame*0.001)
 * - Foreground scales faster + translateY float (fg=1.0 + frame*0.002, translateY = -frame*0.5)
 *
 * Outputs ImageBitmap per frame for zero-copy transfer to VideoEncoder worker.
 */

export interface ParallaxFrameResult {
  frameNumber: number;
  bitmap: ImageBitmap;
  width: number;
  height: number;
}

export interface RenderProgress {
  currentFrame: number;
  totalFrames: number;
  percentage: number;
}

export type ParallaxProgressCallback = (progress: RenderProgress) => void;

export class ParallaxEngine {
  private sourceImage: HTMLImageElement | null = null;
  private maskCanvas: HTMLCanvasElement | null = null;

  private bgCanvas: OffscreenCanvas | null = null;
  private bgCtx: OffscreenCanvasRenderingContext2D | null = null;

  private fgCanvas: OffscreenCanvas | null = null;
  private fgCtx: OffscreenCanvasRenderingContext2D | null = null;

  private compositeCanvas: OffscreenCanvas | null = null;
  private compositeCtx: OffscreenCanvasRenderingContext2D | null = null;

  private isRendering: boolean = false;
  private abortController: AbortController | null = null;

  public static readonly TOTAL_FRAMES = 90;
  public static readonly FPS = 30;

  constructor() {}

  public setSourceImage(img: HTMLImageElement): void {
    this.sourceImage = img;
  }

  public setMaskCanvas(canvas: HTMLCanvasElement | null): void {
    this.maskCanvas = canvas;
  }

  public getIsRendering(): boolean {
    return this.isRendering;
  }

  public stopRendering(): void {
    this.isRendering = false;
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Initializes the three OffscreenCanvas contexts.
   * Fills background with inpainted subject hole using blur+stretch algorithm.
   */
  private initializeCanvases(width: number, height: number): boolean {
    if (!this.sourceImage || !this.maskCanvas) return false;

    this.bgCanvas = new OffscreenCanvas(width, height);
    this.fgCanvas = new OffscreenCanvas(width, height);
    this.compositeCanvas = new OffscreenCanvas(width, height);

    this.bgCtx = this.bgCanvas.getContext('2d')!;
    this.fgCtx = this.fgCanvas.getContext('2d')!;
    this.compositeCtx = this.compositeCanvas.getContext('2d')!;

    if (!this.bgCtx || !this.fgCtx || !this.compositeCtx) return false;

    // Background: draw source image
    this.bgCtx.drawImage(this.sourceImage, 0, 0, width, height);

    // Fill subject hole in background using blur + stretch algorithm (inpaint approximation)
    this.fillSubjectHole(width, height);

    // Foreground: draw isolated subject on transparent canvas
    this.fgCtx.drawImage(this.sourceImage, 0, 0, width, height);
    this.fgCtx.globalCompositeOperation = 'destination-in';
    this.fgCtx.drawImage(this.maskCanvas, 0, 0, width, height);
    this.fgCtx.globalCompositeOperation = 'source-over';

    return true;
  }

  /**
   * Fills the subject hole in the background using a multi-pass blur + stretch algorithm.
   * This creates a plausible background extension behind the subject.
   */
  private fillSubjectHole(width: number, height: number): void {
    if (!this.bgCtx || !this.maskCanvas) return;

    const maskCtx = this.maskCanvas.getContext('2d');
    if (!maskCtx) return;

    const maskData = maskCtx.getImageData(0, 0, width, height);
    const pixels = maskData.data;

    let minX = width, maxX = 0, minY = height, maxY = 0;
    let found = false;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = pixels[(y * width + x) * 4 + 3];
        if (alpha > 128) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) return;

    const holeW = maxX - minX;
    const holeH = maxY - minY;

    if (holeW <= 0 || holeH <= 0) return;

    // Expand hole by 15% for smoother blending
    const expandX = Math.floor(holeW * 0.15);
    const expandY = Math.floor(holeH * 0.15);
    const ex = Math.max(0, minX - expandX);
    const ey = Math.max(0, minY - expandY);
    const ew = Math.min(width - ex, holeW + expandX * 2);
    const eh = Math.min(height - ey, holeH + expandY * 2);

    // Multi-pass stretch: sample pixels from edges above/below/left/right of hole
    const stretchCanvas = new OffscreenCanvas(width, height);
    const stretchCtx = stretchCanvas.getContext('2d')!;
    stretchCtx.drawImage(this.bgCanvas!, 0, 0, width, height);

    // Sampling zones: top edge, bottom edge, left edge, right edge
    const topSourceY = Math.max(0, ey - eh);
    const bottomSourceY = Math.min(height - 1, ey + eh * 2);
    const leftSourceX = Math.max(0, ex - ew);
    const rightSourceX = Math.min(width - 1, ex + ew * 2);

    for (let y = ey; y < ey + eh && y < height; y++) {
      for (let x = ex; x < ex + ew && x < width; x++) {
        const maskIdx = (y * width + x) * 4 + 3;
        if (pixels[maskIdx] > 128) {
          const t = (y - ey) / eh;
          const s = (x - ex) / ew;

          const blendT = t < 0.5 ? topSourceY : bottomSourceY;
          const blendS = s < 0.5 ? leftSourceX : rightSourceX;

          const sampledT = stretchCtx.getImageData(x, Math.round(blendT), 1, 1).data[0];
          const sampledS = stretchCtx.getImageData(Math.round(blendS), y, 1, 1).data[0];

          this.bgCtx!.fillStyle = `rgb(${sampledT},${sampledS},${sampledT})`;
          this.bgCtx!.fillRect(x, y, 1, 1);
        }
      }
    }

    // Gaussian blur approximation on the hole region
    const holeCanvas = new OffscreenCanvas(ew, eh);
    const holeCtx = holeCanvas.getContext('2d')!;
    holeCtx.drawImage(this.bgCanvas!, ex, ey, ew, eh, 0, 0, ew, eh);

    for (let pass = 0; pass < 3; pass++) {
      holeCtx.filter = 'blur(8px)';
      holeCtx.drawImage(holeCanvas, 0, 0);
      holeCtx.filter = 'none';
    }

    // Blend blurred hole back over original background
    this.bgCtx!.drawImage(holeCanvas, ex, ey);
  }

  /**
   * Feature 1.4 Steps 7-20: Frame-by-frame parallax render loop.
   * Each frame is composited, then transferred as ImageBitmap to the video worker.
   */
  public async renderParallaxVideo(
    onProgress?: ParallaxProgressCallback,
    onFrameReady?: (bitmap: ImageBitmap, frameNumber: number) => Promise<void>,
    signal?: AbortSignal
  ): Promise<ImageBitmap[]> {
    if (!this.sourceImage) throw new Error('Source image not set');
    if (!this.maskCanvas) throw new Error('AI mask not available - run background removal first');

    this.isRendering = true;
    this.abortController = new AbortController();
    const abortSignal = signal || this.abortController.signal;

    const width = this.sourceImage.naturalWidth;
    const height = this.sourceImage.naturalHeight;

    if (!this.initializeCanvases(width, height)) {
      this.isRendering = false;
      throw new Error('Failed to initialize parallax canvases');
    }

    const totalFrames = ParallaxEngine.TOTAL_FRAMES;
    const frameBitmaps: ImageBitmap[] = [];

    try {
      for (let frame = 1; frame <= totalFrames; frame++) {
        if (abortSignal.aborted) break;

        await this.renderSingleFrame(frame, width, height);

        const bitmap = await createImageBitmap(this.compositeCanvas!);
        frameBitmaps.push(bitmap);

        if (onFrameReady) {
          await onFrameReady(bitmap, frame);
        }

        if (onProgress) {
          onProgress({
            currentFrame: frame,
            totalFrames,
            percentage: Math.round((frame / totalFrames) * 100),
          });
        }

        // Yield to main thread every 5 frames to keep UI responsive
        if (frame % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
    } finally {
      this.isRendering = false;
      this.cleanup();
    }

    return frameBitmaps;
  }

  /**
   * Renders a single parallax frame with Z-space scaling.
   */
  private async renderSingleFrame(frame: number, width: number, height: number): Promise<void> {
    if (!this.compositeCtx || !this.bgCanvas || !this.fgCanvas) return;

    const cc = this.compositeCtx;
    cc.clearRect(0, 0, width, height);

    // Z-space scaling matrices
    const bgScale = 1.0 + (frame * 0.001);
    const fgScale = 1.0 + (frame * 0.002);
    const fgTranslateY = -(frame * 0.5);

    // Draw scaled background
    const bgW = width * bgScale;
    const bgH = height * bgScale;
    const bgX = (width - bgW) / 2;
    const bgY = (height - bgH) / 2;

    cc.drawImage(this.bgCanvas, bgX, bgY, bgW, bgH);

    // Draw scaled foreground with Y translation
    const fgW = width * fgScale;
    const fgH = height * fgScale;
    const fgX = (width - fgW) / 2;
    const fgY = (height - fgH) / 2 + fgTranslateY;

    cc.drawImage(this.fgCanvas, fgX, fgY, fgW, fgH);
  }

  private cleanup(): void {
    this.bgCanvas = null;
    this.bgCtx = null;
    this.fgCanvas = null;
    this.fgCtx = null;
    this.compositeCanvas = null;
    this.compositeCtx = null;
    this.abortController = null;
  }

  public destroy(): void {
    this.stopRendering();
    this.cleanup();
    this.sourceImage = null;
    this.maskCanvas = null;
  }
}
