/**
 * CanvasManager - Hardware-accelerated 2D rendering engine for image manipulation.
 *
 * Fixes applied:
 * - Issue 1: Rendering Origin — ctx.translate(centerX, centerY) + drawImage at -w/2, -h/2
 * - Issue 2: Initial Fit — zoom calculated to fit image in viewport on load
 * - Issue 3: Pan Clamping — clampBoundaries prevents dragging into void
 * - Issue 4: DPR compounding — handleResize uses setTransform instead of ctx.scale
 */

export interface CanvasState {
  zoom: number;
  translateX: number;
  translateY: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
}

export interface PointerState {
  isDragging: boolean;
  startX: number;
  startY: number;
  lastTranslateX: number;
  lastTranslateY: number;
}

export const DEFAULT_STATE: CanvasState = {
  zoom: 1,
  translateX: 0,
  translateY: 0,
  rotation: 0,
  flipX: false,
  flipY: false,
};

export const ZOOM_MIN = 0.1;
export const ZOOM_MAX = 10.0;

export class CanvasManager {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private state: CanvasState;
  private pointer: PointerState;
  private animationFrameId: number | null = null;
  private needsRender: boolean = false;
  private currentImageUrl: string | null = null;

  // AI mask compositing
  private maskCanvas: HTMLCanvasElement | null = null;
  private maskCtx: CanvasRenderingContext2D | null = null;
  private hasActiveMask: boolean = false;

  // Lerp animation
  private lerpAnimationFrameId: number | null = null;
  private lerpTarget: { translateX: number; translateY: number; zoom: number } | null = null;
  private lerpStart: { translateX: number; translateY: number; zoom: number } | null = null;
  private lerpProgress: number = 0;
  private readonly LERP_DURATION_MS: number = 400;

  // CSS dimensions (logical pixels, not physical)
  private cssWidth: number = 0;
  private cssHeight: number = 0;

  public onImageReady: (() => void) | null = null;
  public onPostRender: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.image = new Image();
    this.state = { ...DEFAULT_STATE };
    this.pointer = {
      isDragging: false,
      startX: 0,
      startY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
    };

    this.setupEventListeners();
    this.handleResize();
  }

  /**
   * Sets the image source. On load, calculates the initial zoom
   * to fit the image perfectly inside the viewport (Issue 2 fix).
   */
  public setImageSource(imageUrl: string): void {
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
    }

    this.currentImageUrl = imageUrl;
    this.state = { ...DEFAULT_STATE };
    this.clearMask();

    this.image.onload = () => {
      // Calculate initial zoom to fit image in viewport (Issue 2)
      const imgW = this.image.naturalWidth;
      const imgH = this.image.naturalHeight;

      if (this.cssWidth > 0 && this.cssHeight > 0 && imgW > 0 && imgH > 0) {
        const fitZoom = Math.min(this.cssWidth / imgW, this.cssHeight / imgH);
        this.state.zoom = Math.min(fitZoom, 1); // Don't upscale, only downscale to fit
      }

      this.handleResize();
      this.needsRender = true;
      this.render(); // Render immediately, don't wait for rAF
      this.onImageReady?.();
    };

    this.image.onerror = () => {
      console.error('Failed to load image from the provided URL');
    };

    this.image.src = imageUrl;
  }

  public resetState(): void {
    this.state = { ...DEFAULT_STATE };
    this.pointer = {
      isDragging: false,
      startX: 0,
      startY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
    };
  }

  /**
   * Handles canvas resize. Uses setTransform to avoid DPR compounding (Issue 4 fix).
   */
  public handleResize(): void {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.cssWidth = rect.width;
    this.cssHeight = rect.height;

    // Set physical pixel dimensions
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Set CSS layout dimensions
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    // Use setTransform directly — avoids compounding ctx.scale(dpr) calls (Issue 4)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.needsRender = true;
    this.scheduleRender();
  }

  private getCanvasWidth(): number {
    return this.cssWidth || this.canvas.width;
  }

  private getCanvasHeight(): number {
    return this.cssHeight || this.canvas.height;
  }

  // ===== Image Data Extraction =====

  public extractImageData(): ImageData | null {
    if (!this.image.complete || this.image.naturalWidth === 0) return null;

    const width = this.image.naturalWidth;
    const height = this.image.naturalHeight;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return null;

    tempCtx.drawImage(this.image, 0, 0, width, height);
    return tempCtx.getImageData(0, 0, width, height);
  }

  // ===== AI Mask =====

  public applyMask(maskImageData: ImageData): void {
    if (!this.image.complete || this.image.naturalWidth === 0) return;

    const width = this.image.naturalWidth;
    const height = this.image.naturalHeight;

    if (!this.maskCanvas || this.maskCanvas.width !== width || this.maskCanvas.height !== height) {
      this.maskCanvas = document.createElement('canvas');
      this.maskCanvas.width = width;
      this.maskCanvas.height = height;
      this.maskCanvas.id = 'mask-buffer';
      this.maskCtx = this.maskCanvas.getContext('2d')!;
    }

    if (!this.maskCtx) return;

    this.maskCtx.putImageData(maskImageData, 0, 0);
    this.hasActiveMask = true;

    this.needsRender = true;
    this.scheduleRender();
  }

  public clearMask(): void {
    this.hasActiveMask = false;
    this.maskCanvas = null;
    this.maskCtx = null;
    this.needsRender = true;
    this.scheduleRender();
  }

  public isMaskActive(): boolean {
    return this.hasActiveMask;
  }

  // ===== Main Rendering Loop (Issue 1 fix: center origin + offset draw) =====

  public render(): void {
    const ctx = this.ctx;
    const img = this.image;

    if (!img.complete || img.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();

    // Wipe the previous frame
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Save pristine state
    ctx.save();

    // Step 1: Translate to CENTER of viewport (Issue 1 fix)
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    ctx.translate(centerX, centerY);

    // Step 2: Rotation
    ctx.rotate((this.state.rotation * Math.PI) / 180);

    // Step 3: Scale (mirror + zoom)
    ctx.scale(
      (this.state.flipX ? -1 : 1) * this.state.zoom,
      (this.state.flipY ? -1 : 1) * this.state.zoom
    );

    // Step 4: Pan
    ctx.translate(this.state.translateX, this.state.translateY);

    // Step 5: Draw image offset by NEGATIVE half its dimensions (Issue 1 fix)
    // This anchors the center of the image to the center of the viewport
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    ctx.restore();
    ctx.save();

    // Step 6: If mask active, apply destination-in compositing
    if (this.hasActiveMask && this.maskCanvas) {
      // Redraw the image first (needed for destination-in)
      ctx.translate(centerX, centerY);
      ctx.rotate((this.state.rotation * Math.PI) / 180);
      ctx.scale(
        (this.state.flipX ? -1 : 1) * this.state.zoom,
        (this.state.flipY ? -1 : 1) * this.state.zoom
      );
      ctx.translate(this.state.translateX, this.state.translateY);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      // destination-in: keep only pixels where mask alpha > 0
      ctx.globalCompositeOperation = 'destination-in';

      // Draw mask at same transform
      ctx.drawImage(this.maskCanvas, -img.naturalWidth / 2, -img.naturalHeight / 2);

      // Reset composite mode
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.restore();

    this.needsRender = false;

    // Notify WebGL pipeline
    this.onPostRender?.();
  }

  private scheduleRender(): void {
    if (this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      if (this.needsRender) {
        this.render();
      }
    });
  }

  // ===== Mouse/Touch =====

  private setupEventListeners(): void {
    this.canvas.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mousemove', this.onPointerMove);
    window.addEventListener('mouseup', this.onPointerUp);

    this.canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);

    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private onPointerDown = (e: MouseEvent): void => {
    this.pointer.isDragging = true;
    this.pointer.startX = e.clientX;
    this.pointer.startY = e.clientY;
    this.pointer.lastTranslateX = this.state.translateX;
    this.pointer.lastTranslateY = this.state.translateY;
    this.canvas.style.cursor = 'grabbing';
  };

  private onPointerMove = (e: MouseEvent): void => {
    if (!this.pointer.isDragging) return;

    const deltaX = e.clientX - this.pointer.startX;
    const deltaY = e.clientY - this.pointer.startY;

    this.state.translateX = this.pointer.lastTranslateX + deltaX / this.state.zoom;
    this.state.translateY = this.pointer.lastTranslateY + deltaY / this.state.zoom;

    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();
  };

  private onPointerUp = (): void => {
    this.pointer.isDragging = false;
    this.canvas.style.cursor = 'grab';
  };

  private onTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      this.pointer.isDragging = true;
      this.pointer.startX = touch.clientX;
      this.pointer.startY = touch.clientY;
      this.pointer.lastTranslateX = this.state.translateX;
      this.pointer.lastTranslateY = this.state.translateY;
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    if (!this.pointer.isDragging || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - this.pointer.startX;
    const deltaY = touch.clientY - this.pointer.startY;

    this.state.translateX = this.pointer.lastTranslateX + deltaX / this.state.zoom;
    this.state.translateY = this.pointer.lastTranslateY + deltaY / this.state.zoom;

    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();
  };

  private onTouchEnd = (): void => {
    this.pointer.isDragging = false;
  };

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();

    const delta = -e.deltaY;
    const zoomFactor = delta > 0 ? 1.1 : 1 / 1.1;

    const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.state.zoom * zoomFactor));
    this.state.zoom = newZoom;

    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();
  };

  /**
   * Issue 3 fix: Clamp boundaries to prevent dragging image out of view.
   * Calculates maxOffsetX/Y dynamically based on current zoom.
   */
  private clampBoundaries(): void {
    if (this.image.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();

    // Max allowed offsets — prevents the edge of the image from going past the viewport edge
    const maxOffsetX = Math.max(0, (this.image.naturalWidth * this.state.zoom - canvasWidth) / 2);
    const maxOffsetY = Math.max(0, (this.image.naturalHeight * this.state.zoom - canvasHeight) / 2);

    this.state.translateX = Math.max(-maxOffsetX, Math.min(maxOffsetX, this.state.translateX));
    this.state.translateY = Math.max(-maxOffsetY, Math.min(maxOffsetY, this.state.translateY));
  }

  // ===== Public Transform Methods =====

  public setZoom(zoom: number): void {
    this.state.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom));
    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();
  }

  public setRotation(degrees: number): void {
    this.state.rotation = degrees % 360;
    this.needsRender = true;
    this.scheduleRender();
  }

  public toggleFlipX(): void {
    this.state.flipX = !this.state.flipX;
    this.needsRender = true;
    this.scheduleRender();
  }

  public toggleFlipY(): void {
    this.state.flipY = !this.state.flipY;
    this.needsRender = true;
    this.scheduleRender();
  }

  public getState(): CanvasState {
    return { ...this.state };
  }

  public getImageWidth(): number {
    return this.image.naturalWidth;
  }

  public getImageHeight(): number {
    return this.image.naturalHeight;
  }

  public getImageElement(): HTMLImageElement {
    return this.image;
  }

  // ===== Lerp Animation =====

  public animateToFocalPoint(focalX: number, focalY: number): void {
    this.stopLerpAnimation();

    const imgW = this.image.naturalWidth;
    const imgH = this.image.naturalHeight;

    const targetTranslateX = -(focalX - imgW / 2);
    const targetTranslateY = -(focalY - imgH / 2);

    this.lerpStart = {
      translateX: this.state.translateX,
      translateY: this.state.translateY,
      zoom: this.state.zoom,
    };

    this.lerpTarget = {
      translateX: targetTranslateX,
      translateY: targetTranslateY,
      zoom: this.state.zoom,
    };

    this.lerpProgress = 0;
    this.runLerpAnimation(performance.now());
  }

  private runLerpAnimation(startTime: number): void {
    if (!this.lerpStart || !this.lerpTarget) return;

    const elapsed = performance.now() - startTime;
    this.lerpProgress = Math.min(elapsed / this.LERP_DURATION_MS, 1);

    const t = 1 - Math.pow(1 - this.lerpProgress, 3);

    this.state.translateX = this.lerpStart.translateX + (this.lerpTarget.translateX - this.lerpStart.translateX) * t;
    this.state.translateY = this.lerpStart.translateY + (this.lerpTarget.translateY - this.lerpStart.translateY) * t;
    this.state.zoom = this.lerpStart.zoom + (this.lerpTarget.zoom - this.lerpStart.zoom) * t;

    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();

    const dx = Math.abs(this.state.translateX - this.lerpTarget.translateX);
    const dy = Math.abs(this.state.translateY - this.lerpTarget.translateY);

    if (this.lerpProgress >= 1 || (dx < 0.5 && dy < 0.5)) {
      this.state.translateX = this.lerpTarget.translateX;
      this.state.translateY = this.lerpTarget.translateY;
      this.state.zoom = this.lerpTarget.zoom;
      this.clampBoundaries();
      this.needsRender = true;
      this.scheduleRender();
      this.lerpTarget = null;
      this.lerpStart = null;
      return;
    }

    this.lerpAnimationFrameId = requestAnimationFrame(() => this.runLerpAnimation(startTime));
  }

  private stopLerpAnimation(): void {
    if (this.lerpAnimationFrameId !== null) {
      cancelAnimationFrame(this.lerpAnimationFrameId);
      this.lerpAnimationFrameId = null;
    }
    this.lerpTarget = null;
    this.lerpStart = null;
  }

  // ===== Cleanup =====

  public destroy(): void {
    this.stopLerpAnimation();

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.canvas.removeEventListener('mousedown', this.onPointerDown);
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('mouseup', this.onPointerUp);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    this.canvas.removeEventListener('wheel', this.onWheel);

    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
      this.currentImageUrl = null;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maskCanvas = null;
    this.maskCtx = null;
  }

  public hasImage(): boolean {
    return this.image.complete && this.image.naturalWidth > 0;
  }
}