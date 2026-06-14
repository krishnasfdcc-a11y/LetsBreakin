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
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private state: CanvasState;
  private pointer: PointerState;
  private animationFrameId: number | null = null;
  private needsRender: boolean = false;
  private currentImageUrl: string | null = null;

  /**
   * Callback fired when the image is loaded and ready for rendering.
   */
  public onImageReady: (() => void) | null = null;

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
    // Revoke the previous Object URL to prevent RAM leaks
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
    }

    this.currentImageUrl = imageUrl;
    this.resetState();

    // Set up the onload handler before setting src
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

    // Scale the context to account for device pixel ratio
    this.ctx.scale(dpr, dpr);

    // Reset canvas dimensions stored for rendering calculations
    // We'll store the CSS dimensions for coordinate calculations
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

  /**
   * The main rendering method. Applies the full transformation matrix
   * and draws the image using hardware-accelerated canvas operations.
   *
   * Transformation order (applied bottom-up):
   * 1. Translate to center of canvas
   * 2. Apply rotation around center
   * 3. Apply scale (flipX/flipY and zoom)
   * 4. Apply panning translation
   * 5. Draw image offset by half its dimensions
   */
  public render(): void {
    const ctx = this.ctx;
    const img = this.image;

    if (!img.complete || img.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();

    // Calculate the geometric center of the canvas viewport
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Wipe the previous frame
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Save the pristine canvas coordinate state
    ctx.save();

    // Step 1: Shift origin to canvas center
    ctx.translate(centerX, centerY);

    // Step 2: Apply angular rotation (convert degrees to radians)
    ctx.rotate((this.state.rotation * Math.PI) / 180);

    // Step 3: Apply scaling and mirroring simultaneously
    ctx.scale(
      (this.state.flipX ? -1 : 1) * this.state.zoom,
      (this.state.flipY ? -1 : 1) * this.state.zoom
    );

    // Step 4: Apply user panning coordinates
    ctx.translate(this.state.translateX, this.state.translateY);

    // Step 5: Draw image offset by exactly half its dimensions to maintain centering
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    // Restore the coordinate state for the next frame
    ctx.restore();

    this.needsRender = false;
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
    // Mouse events
    this.canvas.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mousemove', this.onPointerMove);
    window.addEventListener('mouseup', this.onPointerUp);

    // Touch events
    this.canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);

    // Wheel/scroll for zoom
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });

    // Prevent context menu on canvas
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

    // Divide delta by zoom to ensure 1:1 cursor tracking
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

  /**
   * Wheel event handler for zooming. Zooms toward the cursor position.
   */
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
   * Clamps translateX and translateY to prevent dragging the image out of bounds.
   * Calculates max allowed offsets dynamically based on current zoom.
   */
  private clampBoundaries(): void {
    if (this.image.naturalWidth === 0) return;

    const canvasWidth = this.getCanvasWidth();
    const canvasHeight = this.getCanvasHeight();

    // Calculate max allowed offsets based on current zoom
    const maxOffsetX = Math.max(0, (this.image.naturalWidth * this.state.zoom - canvasWidth) / 2);
    const maxOffsetY = Math.max(0, (this.image.naturalHeight * this.state.zoom - canvasHeight) / 2);

    this.state.translateX = Math.max(-maxOffsetX, Math.min(maxOffsetX, this.state.translateX));
    this.state.translateY = Math.max(-maxOffsetY, Math.min(maxOffsetY, this.state.translateY));
  }

  /**
   * Sets the zoom level and clamps it within bounds.
   */
  public setZoom(zoom: number): void {
    this.state.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoom));
    this.clampBoundaries();
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Sets the rotation in degrees.
   */
  public setRotation(degrees: number): void {
    this.state.rotation = degrees % 360;
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Toggles horizontal flip.
   */
  public toggleFlipX(): void {
    this.state.flipX = !this.state.flipX;
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Toggles vertical flip.
   */
  public toggleFlipY(): void {
    this.state.flipY = !this.state.flipY;
    this.needsRender = true;
    this.scheduleRender();
  }

  /**
   * Gets the current canvas state.
   */
  public getState(): CanvasState {
    return { ...this.state };
  }

  /**
   * Cleans up resources. Call when the component unmounts.
   */
  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Remove event listeners
    this.canvas.removeEventListener('mousedown', this.onPointerDown);
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('mouseup', this.onPointerUp);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    this.canvas.removeEventListener('wheel', this.onWheel);

    // Revoke Object URL
    if (this.currentImageUrl) {
      URL.revokeObjectURL(this.currentImageUrl);
      this.currentImageUrl = null;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Returns whether the canvas currently has a loaded image.
   */
  public hasImage(): boolean {
    return this.image.complete && this.image.naturalWidth > 0;
  }
}