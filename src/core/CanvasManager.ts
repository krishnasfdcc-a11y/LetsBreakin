/**
 * CanvasManager - Hardware-accelerated 2D rendering engine for image manipulation.
 *
 * Manages canvas state, transformation matrices, and rendering loops.
 * All transformations are applied through the 2D context matrix stack for
 * optimal GPU-accelerated performance.
 *
 * State matrix properties:
 * - zoom: Scale factor (0.1 - 10.0)
 * - translateX/Y: Panning offsets in canvas coordinates
 * - rotation: Angular rotation in degrees
 * - flipX/Y: Mirror transformations
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

  // Lerp animation for smart crop
  private lerpAnimationFrameId: number | null = null;
  private lerpTarget: { translateX: number; translateY: number; zoom: number } | null = null;
  private lerpStart: { translateX: number; translateY: number; zoom: number } | null = null;
  private lerpProgress: number = 0;
  private readonly LERP_DURATION_MS: number = 400;

  /**
   * Callback fired when the image is loaded and ready for rendering.
   */
  public onImageReady: (() => void) | null = null;

  /**
   * Callback fired after every render pass to notify the WebGL pipeline
   * that the texture needs to be refreshed from the Phase 1 canvas.
   */
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
   * Sets the image source from an Object URL and triggers loading.
   * Revokes the previous Object URL to prevent memory leaks.
   */
  public setImageSource(imageUrl: string): void {
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
    }

    this.currentImageUrl = imageUrl;
    this.resetState();
    this.clearMask();

    this.image.onload = () => {
      this.handleResize();
      this.needsRender = true;
      this.scheduleRender();
      this.onImageReady?.();
    };

    this.image.onerror = () => {
      console.error('Failed to load image from the provided URL');
    };

    this.image.src = imageUrl;
  }

  /**
   * Resets the canvas state to default values.
   */
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
   * Handles canvas resize to fill its container while maintaining aspect ratio.
   */
  public handleResize(): void {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    (this.canvas as any)._cssWidth = rect.width;
    (this.canvas as any)._cssHeight = rect.height;

    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Gets the CSS (logical) dimensions of the canvas.
   */
  private getCanvasWidth(): number {
    return (this.canvas as any)._cssWidth || this.canvas.width;
  }

  private getCanvasHeight(): number {
    return (this.canvas as any)._cssHeight || this.canvas.height;
  }

  // ===================== Part 1: Image Data Extraction =====================

  /**
   * Extracts raw ImageData from the source image without any transformations.
   * Uses a temporary offscreen canvas for rendering, then calls getImageData.
   */
  public extractImageData(): ImageData | null {
    if (!this.image.complete || this.image.naturalWidth === 0) return null;

    const width = this.image.naturalWidth;
    const height = this.image.naturalHeight;

    // Create a temporary offscreen canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return null;

    // Draw the current image without transformations
    tempCtx.drawImage(this.image, 0, 0, width, height);

    // Extract the raw pixel data
    return tempCtx.getImageData(0, 0, width, height);
  }

  // ===================== Part 4: AI Mask Compositing =====================

  /**
   * Applies an AI-generated mask to the image.
   * The mask is an ImageData where the alpha channel determines visibility
   * (0 = transparent background, 255 = solid foreground).
   */
  public applyMask(maskImageData: ImageData): void {
    if (!this.image.complete || this.image.naturalWidth === 0) return;

    const width = this.image.naturalWidth;
    const height = this.image.naturalHeight;

    // Create an invisible offscreen mask buffer matching the original image size
    if (!this.maskCanvas || this.maskCanvas.width !== width || this.maskCanvas.height !== height) {
      this.maskCanvas = document.createElement('canvas');
      this.maskCanvas.width = width;
      this.maskCanvas.height = height;
      this.maskCanvas.id = 'mask-buffer';
      this.maskCtx = this.maskCanvas.getContext('2d')!;
    }

    if (!this.maskCtx) return;

    // Write the AI mask data to the offscreen mask buffer
    this.maskCtx.putImageData(maskImageData, 0, 0);
    this.hasActiveMask = true;

    // Trigger a re-render
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Clears the active AI mask.
   */
  public clearMask(): void {
    this.hasActiveMask = false;
    this.maskCanvas = null;
    this.maskCtx = null;
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Returns whether an AI mask is currently active.
   */
  public isMaskActive(): boolean {
    return this.hasActiveMask;
  }

  // ===================== Main Rendering Loop =====================

  /**
   * The main rendering method with mask compositing support.
   * If a mask is active, it applies it using destination-in compositing.
   */
  public render(): void {
    const ctx = this.ctx;
    const img = this.image;

    if (!img.complete || img.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Wipe the previous frame
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();

    // Step 1-4: Apply transformation matrix
    ctx.translate(centerX, centerY);
    ctx.rotate((this.state.rotation * Math.PI) / 180);
    ctx.scale(
      (this.state.flipX ? -1 : 1) * this.state.zoom,
      (this.state.flipY ? -1 : 1) * this.state.zoom
    );
    ctx.translate(this.state.translateX, this.state.translateY);

    // Step 5: Draw the original image
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    // Step 6: If a mask is active, apply it using destination-in compositing
    if (this.hasActiveMask && this.maskCanvas) {
      // destination-in: only keep pixels where the mask is opaque
      ctx.globalCompositeOperation = 'destination-in';

      // Reset transform to draw mask at canvas coordinates
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      ctx.scale(dpr, dpr);

      // Draw the mask buffer over the canvas
      // We need to draw it scaled to the viewport, respecting the transform
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((this.state.rotation * Math.PI) / 180);
      ctx.scale(
        (this.state.flipX ? -1 : 1) * this.state.zoom,
        (this.state.flipY ? -1 : 1) * this.state.zoom
      );
      ctx.translate(this.state.translateX, this.state.translateY);
      ctx.drawImage(this.maskCanvas, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();

      // Reset composite operation back to normal
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.restore();

    this.needsRender = false;

    // Notify the WebGL pipeline to refresh its texture from this canvas
    this.onPostRender?.();
  }

  /**
   * Schedules a render using requestAnimationFrame to sync with the monitor's refresh rate.
   */
  private scheduleRender(): void {
    if (this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      if (this.needsRender) {
        this.render();
      }
    });
  }

  // ===== Mouse/Touch Interaction Handlers =====

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

  private clampBoundaries(): void {
    if (this.image.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();

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

  // ===================== Part 6: Lerp Animation for Auto-Crop =====================

  /**
   * Smoothly animates the viewport to center on a focal point (from AI smart crop).
   * Uses Linear Interpolation (Lerp) over ~400ms.
   *
   * @param focalX - X coordinate of the focal point (in image pixels)
   * @param focalY - Y coordinate of the focal point (in image pixels)
   */
  public animateToFocalPoint(focalX: number, focalY: number): void {
    // Stop any existing lerp animation
    this.stopLerpAnimation();

    const imgW = this.image.naturalWidth;
    const imgH = this.image.naturalHeight;

    // Calculate target translate to center the focal point
    // In the current transform, translate is applied after center translation
    // So we need to offset: focal point in image coords -> screen coords
    const targetTranslateX = -(focalX - imgW / 2);
    const targetTranslateY = -(focalY - imgH / 2);

    // Store start and target values
    this.lerpStart = {
      translateX: this.state.translateX,
      translateY: this.state.translateY,
      zoom: this.state.zoom,
    };

    this.lerpTarget = {
      translateX: targetTranslateX,
      translateY: targetTranslateY,
      zoom: this.state.zoom, // Keep zoom constant during focal animation
    };

    this.lerpProgress = 0;
    this.runLerpAnimation(performance.now());
  }

  private runLerpAnimation(startTime: number): void {
    if (!this.lerpStart || !this.lerpTarget) return;

    const elapsed = performance.now() - startTime;
    this.lerpProgress = Math.min(elapsed / this.LERP_DURATION_MS, 1);

    // Ease-out cubic for smooth deceleration
    const t = 1 - Math.pow(1 - this.lerpProgress, 3);

    // Apply Lerp formula: current = start + (target - start) * t
    this.state.translateX = this.lerpStart.translateX + (this.lerpTarget.translateX - this.lerpStart.translateX) * t;
    this.state.translateY = this.lerpStart.translateY + (this.lerpTarget.translateY - this.lerpStart.translateY) * t;
    this.state.zoom = this.lerpStart.zoom + (this.lerpTarget.zoom - this.lerpStart.zoom) * t;

    this.clampBoundaries();

    // Trigger Phase 1 render
    this.needsRender = true;
    this.scheduleRender();

    // Halt when difference is less than 0.5 pixels
    const dx = Math.abs(this.state.translateX - this.lerpTarget.translateX);
    const dy = Math.abs(this.state.translateY - this.lerpTarget.translateY);

    if (this.lerpProgress >= 1 || (dx < 0.5 && dy < 0.5)) {
      // Snap to final position
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

    // Continue the animation loop
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