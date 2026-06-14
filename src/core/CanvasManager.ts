// src/core/CanvasManager.ts
/**
 * CanvasManager – Central orchestration class for the entire editor.
 *
 * Phase 1: Image ingestion (2D canvas preview + HEIC decoding)
 * Phase 2: WebGL-accelerated filter pipeline
 * Phase 3: AI background removal & smart auto-crop
 * Phase 4: History, persistence & export
 */

import { HistoryManager } from './HistoryManager';
import { WebGLFilter } from './WebGLFilter';
import { ProjectStore } from './ProjectStore';
import { exportFullResolution, triggerDownload } from './ExportEngine';
import type { TransformState, FilterUniforms, HistoryEntry } from './types';

export type { TransformState, FilterUniforms, HistoryEntry };

export interface CanvasManagerCallbacks {
  onStateChange?: () => void;
  onHistoryChange?: () => void;
  onAITaskStart?: (task: 'mask' | 'crop') => void;
  onAITaskEnd?: (task: 'mask' | 'crop') => void;
  onExportComplete?: (url: string) => void;
  onError?: (msg: string) => void;
}

export class CanvasManager {
  /* ─── canvas elements ─────────────────────────────────────── */
  /** The 2D preview canvas (background layer, used for position/pan). */
  private canvas2D: HTMLCanvasElement;
  private ctx2D: CanvasRenderingContext2D;

  /** The WebGL overlay canvas (foreground, handles filters). */
  private canvasGL: HTMLCanvasElement;
  private webGLFilter: WebGLFilter;

  /** The currently loaded source image. */
  private img: HTMLImageElement | null = null;
  private imgUrl: string | null = null; // object URL

  /* ─── workers ─────────────────────────────────────────────── */
  private decoderWorker: Worker | null = null;
  private aiWorker: Worker | null = null;
  private autoCropWorker: Worker | null = null;

  /* ─── state ───────────────────────────────────────────────── */
  public state: TransformState = {
    zoom: 1,
    translateX: 0,
    translateY: 0,
    rotation: 0,
    flipX: false,
    flipY: false,
  };

  /** Current filter values (read by WebGLFilter every frame). */
  public filterUniforms: FilterUniforms = {
    brightness: 0,
    contrast: 1,
    saturation: 1,
  };

  /** History engine. */
  public history = new HistoryManager();

  /** AI mask ImageData (null if no mask applied). */
  private maskData: ImageData | null = null;

  /** Whether a mask has been applied (canvas compositing). */
  private maskActive = false;

  /** Callbacks. */
  private callbacks: CanvasManagerCallbacks = {};

  /** Cached object URL for the original blob (for persistence). */
  private originalBlobUrl: string | null = null;

  constructor(container: HTMLElement, callbacks?: CanvasManagerCallbacks) {
    this.callbacks = callbacks ?? {};

    // ── Create 2D canvas (background/positioning layer) ──────
    const c2d = document.createElement('canvas');
    c2d.style.position = 'absolute';
    c2d.style.top = '0';
    c2d.style.left = '0';
    c2d.style.width = '100%';
    c2d.style.height = '100%';
    container.appendChild(c2d);
    this.canvas2D = c2d;
    const ctx = c2d.getContext('2d');
    if (!ctx) throw new Error('2D context not supported');
    this.ctx2D = ctx;

    // ── Create WebGL canvas (filter/fx layer) ─────────────────
    const cgl = document.createElement('canvas');
    cgl.style.position = 'absolute';
    cgl.style.top = '0';
    cgl.style.left = '0';
    cgl.style.width = '100%';
    cgl.style.height = '100%';
    cgl.style.pointerEvents = 'none'; // let 2D canvas receive mouse events
    container.appendChild(cgl);
    this.canvasGL = cgl;
    this.webGLFilter = new WebGLFilter(cgl);

    // ── Listen to history changes ────────────────────────────
    this.history.onChange(() => {
      this.callbacks.onHistoryChange?.();
    });

    // ── Start 2D render loop ─────────────────────────────────
    requestAnimationFrame(() => this.renderLoop2D());

    // ── Mouse / touch panning ────────────────────────────────
    this.setupPanHandlers();

    // ── Attempt to restore previous session ──────────────────
    this.restoreSession();
  }

  /* ================================================================
   *  PUBLIC API — INGESTION
   * ================================================================ */

  /** Load an image file.  HEIC is decoded via worker. */
  async loadFile(file: File): Promise<void> {
    // Revoke previous URLs
    this.revokeUrls();

    const isHeic = /\.heic$/i.test(file.name) || file.type === 'image/heic';

    if (isHeic) {
      if (!this.decoderWorker) {
        this.decoderWorker = new Worker(
          new URL('./DecoderWorker.ts', import.meta.url),
          { type: 'module' },
        );
        this.decoderWorker.onmessage = (e) => this.handleDecoderMessage(e);
      }

      const buffer = await file.arrayBuffer();
      // Transfer the buffer (zero-copy)
      this.decoderWorker.postMessage({ buffer }, [buffer]);
    } else {
      this.imgUrl = URL.createObjectURL(file);
      this.originalBlobUrl = this.imgUrl;
      await this.loadImageFromUrl(this.imgUrl);

      // Push history entry
      this.history.push(HistoryManager.ingestImage(this.imgUrl, { ...this.state }));

      // Persist
      this.saveSession();
    }
  }

  /* ================================================================
   *  PUBLIC API — TRANSFORMS
   * ================================================================ */

  setZoom(zoom: number): void {
    this.state.zoom = Math.max(0.1, Math.min(10, zoom));
    this.history.push(HistoryManager.setZoom(zoom, { ...this.state }));
    this.clampPan();
  }

  setRotation(deg: number): void {
    this.state.rotation = ((deg % 360) + 360) % 360;
    this.history.push(HistoryManager.setRotation(deg, { ...this.state }));
    this.clampPan();
  }

  setFlipX(flag: boolean): void {
    this.state.flipX = flag;
    this.history.push(HistoryManager.setFlip(this.state.flipX, this.state.flipY, { ...this.state }));
  }

  setFlipY(flag: boolean): void {
    this.state.flipY = flag;
    this.history.push(HistoryManager.setFlip(this.state.flipX, this.state.flipY, { ...this.state }));
  }

  pan(dx: number, dy: number): void {
    this.state.translateX += dx;
    this.state.translateY += dy;
    this.clampPan();
  }

  /* ================================================================
   *  PUBLIC API — FILTERS  (writes directly to WebGL uniform object)
   * ================================================================ */

  setBrightness(v: number): void {
    this.filterUniforms.brightness = Math.max(-1, Math.min(1, v));
  }
  setContrast(v: number): void {
    this.filterUniforms.contrast = Math.max(0, Math.min(3, v));
  }
  setSaturation(v: number): void {
    this.filterUniforms.saturation = Math.max(0, Math.min(3, v));
  }
  setFilter(uniforms: Partial<FilterUniforms>): void {
    if (uniforms.brightness !== undefined) this.setBrightness(uniforms.brightness);
    if (uniforms.contrast !== undefined) this.setContrast(uniforms.contrast);
    if (uniforms.saturation !== undefined) this.setSaturation(uniforms.saturation);
    // Push history snapshot
    this.history.push(
      HistoryManager.setFilter({ ...this.filterUniforms }, { ...this.state }),
    );
  }

  /* ================================================================
   *  PUBLIC API — AI FEATURES
   * ================================================================ */

  /** Request AI background removal. */
  async applyAIBackgroundRemoval(): Promise<void> {
    if (!this.img) return;
    this.callbacks.onAITaskStart?.('mask');

    try {
      if (!this.aiWorker) {
        this.aiWorker = new Worker(new URL('./AIWorker.ts', import.meta.url), {
          type: 'module',
        });
        this.aiWorker.onmessage = (e) => this.handleAIWorkerMessage(e);
      }

      // Get current pixel data from 2D canvas
      const w = this.canvas2D.width;
      const h = this.canvas2D.height;
      const imageData = this.ctx2D.getImageData(0, 0, w, h);

      this.aiWorker.postMessage({ type: 'AI_MASK_REQUEST', imageData });
    } catch (err) {
      this.callbacks.onAITaskEnd?.('mask');
      this.callbacks.onError?.(
        err instanceof Error ? err.message : 'AI masking failed',
      );
    }
  }

  /** Request smart auto-crop based on subject detection. */
  async requestAutoCrop(): Promise<void> {
    if (!this.img || !this.imgUrl) return;
    this.callbacks.onAITaskStart?.('crop');

    try {
      if (!this.autoCropWorker) {
        this.autoCropWorker = new Worker(
          new URL('./AutoCropWorker.ts', import.meta.url),
          { type: 'module' },
        );
        this.autoCropWorker.onmessage = (e) => this.handleAutoCropMessage(e);
      }

      this.autoCropWorker.postMessage({
        type: 'AUTO_CROP_REQUEST',
        imageUrl: this.imgUrl,
      });
    } catch (err) {
      this.callbacks.onAITaskEnd?.('crop');
      this.callbacks.onError?.(
        err instanceof Error ? err.message : 'Auto-crop failed',
      );
    }
  }

  /* ================================================================
   *  PUBLIC API — HISTORY
   * ================================================================ */

  undo(): void {
    if (!this.history.canUndo()) return;
    this.history.undo();
    this.replayHistory();
  }

  redo(): void {
    if (!this.history.canRedo()) return;
    this.history.redo();
    this.replayHistory();
  }

  /* ================================================================
   *  PUBLIC API — EXPORT
   * ================================================================ */

  async export(format: 'image/png' | 'image/webp' = 'image/png'): Promise<void> {
    if (!this.img) return;

    try {
      const url = await exportFullResolution(
        this.img,
        this.history.getAll(),
        this.canvas2D.width,
        this.canvas2D.height,
        { format },
      );

      triggerDownload(url, `edited-masterpiece.${format === 'image/png' ? 'png' : 'webp'}`);
      // Revoke after a short delay to allow download
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      this.callbacks.onExportComplete?.(url);
    } catch (err) {
      this.callbacks.onError?.(
        err instanceof Error ? err.message : 'Export failed',
      );
    }
  }

  /* ================================================================
   *  PUBLIC API — PERSISTENCE
   * ================================================================ */

  async saveSession(): Promise<void> {
    if (!this.imgUrl) return;
    try {
      // Fetch the current blob from the object URL
      const res = await fetch(this.imgUrl);
      const blob = await res.blob();

      await ProjectStore.save({
        assetBlob: blob,
        assetType: blob.type || 'image/png',
        historyJSON: this.history.toJSON(),
        transformState: { ...this.state },
        filterState: { ...this.filterUniforms },
      });
    } catch {
      // Persistence is best-effort (e.g. cross-origin blob may fail fetch)
    }
  }

  async restoreSession(): Promise<void> {
    try {
      const snapshot = await ProjectStore.load();
      if (!snapshot || !snapshot.assetBlob) return;

      this.revokeUrls();
      this.imgUrl = URL.createObjectURL(snapshot.assetBlob);
      await this.loadImageFromUrl(this.imgUrl);

      if (snapshot.transformState) this.state = snapshot.transformState;
      if (snapshot.filterState) {
        this.filterUniforms = snapshot.filterState;
        // Sync to WebGL uniform object
        this.webGLFilter.uniforms.brightness = snapshot.filterState.brightness;
        this.webGLFilter.uniforms.contrast = snapshot.filterState.contrast;
        this.webGLFilter.uniforms.saturation = snapshot.filterState.saturation;
      }
      if (snapshot.historyJSON) this.history.fromJSON(snapshot.historyJSON);

      this.callbacks.onStateChange?.();
      this.callbacks.onHistoryChange?.();
    } catch {
      // Session restore is best-effort
    }
  }

  /* ================================================================
   *  CLEANUP
   * ================================================================ */

  dispose(): void {
    this.webGLFilter.dispose();
    this.decoderWorker?.terminate();
    this.aiWorker?.terminate();
    this.autoCropWorker?.terminate();
    this.revokeUrls();
  }

  resize(width: number, height: number): void {
    this.canvas2D.width = width;
    this.canvas2D.height = height;
    this.webGLFilter.resize(width, height);
    this.clampPan();
  }

  getElement(): HTMLCanvasElement {
    return this.canvas2D;
  }

  /** Whether an image is currently loaded. */
  get hasImage(): boolean {
    return this.img !== null;
  }

  /* ================================================================
   *  INTERNAL — Render Loops
   * ================================================================ */

  private renderLoop2D(): void {
    this.clearCanvas2D();
    if (this.img) {
      this.drawTransformedImage();
    }
    requestAnimationFrame(() => this.renderLoop2D());
  }

  private clearCanvas2D(): void {
    this.ctx2D.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);
  }

  private drawTransformedImage(): void {
    if (!this.img) return;
    const { zoom, translateX, translateY, rotation, flipX, flipY } = this.state;
    const w = this.img.width;
    const h = this.img.height;
    const ctx = this.ctx2D;
    const vw = this.canvas2D.width;
    const vh = this.canvas2D.height;

    ctx.save();
    ctx.translate(vw / 2, vh / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.scale(zoom, zoom);
    ctx.translate(translateX, translateY);

    if (this.maskActive && this.maskData) {
      // Apply AI mask via compositing
      ctx.drawImage(this.img, -w / 2, -h / 2);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.putImageData(this.maskData, -w / 2, -h / 2);
    } else {
      ctx.drawImage(this.img, -w / 2, -h / 2);
    }

    ctx.restore();
  }

  /* ================================================================
   *  INTERNAL — Helpers
   * ================================================================ */

  private async loadImageFromUrl(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.img = img;
        // Reset state
        this.state = { zoom: 1, translateX: 0, translateY: 0, rotation: 0, flipX: false, flipY: false };
        this.maskActive = false;
        this.maskData = null;

        // Update WebGL texture
        this.webGLFilter.updateTexture(img);

        // Auto-scale to fit viewport
        this.fitToViewport();

        this.callbacks.onStateChange?.();
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  private revokeUrls(): void {
    if (this.imgUrl) {
      URL.revokeObjectURL(this.imgUrl);
      this.imgUrl = null;
    }
    if (this.originalBlobUrl) {
      URL.revokeObjectURL(this.originalBlobUrl);
      this.originalBlobUrl = null;
    }
  }

  private clampPan(): void {
    if (!this.img) return;
    const { zoom } = this.state;
    const imgW = this.img.width * zoom;
    const imgH = this.img.height * zoom;
    const maxX = Math.max(0, (imgW - this.canvas2D.width) / 2);
    const maxY = Math.max(0, (imgH - this.canvas2D.height) / 2);
    this.state.translateX = Math.max(-maxX, Math.min(maxX, this.state.translateX));
    this.state.translateY = Math.max(-maxY, Math.min(maxY, this.state.translateY));
  }

  private fitToViewport(): void {
    if (!this.img) return;
    const vw = this.canvas2D.width;
    const vh = this.canvas2D.height;
    const iw = this.img.width;
    const ih = this.img.height;
    const fit = Math.min(vw / iw, vh / ih);
    this.state.zoom = fit;
    this.state.translateX = 0;
    this.state.translateY = 0;
    this.clampPan();
  }

  /* ================================================================
   *  INTERNAL — History Replay
   * ================================================================ */

  private replayHistory(): void {
    // Reset to defaults, then walk through remaining undo stack
    this.state = { zoom: 1, translateX: 0, translateY: 0, rotation: 0, flipX: false, flipY: false };
    this.filterUniforms = { brightness: 0, contrast: 1, saturation: 1 };
    this.maskActive = false;
    this.maskData = null;

    for (const entry of this.history.getAll()) {
      // Apply transform
      if (entry.transform) this.state = { ...entry.transform };
      if (entry.filter) {
        this.filterUniforms = { ...entry.filter };
        this.webGLFilter.uniforms.brightness = entry.filter.brightness;
        this.webGLFilter.uniforms.contrast = entry.filter.contrast;
        this.webGLFilter.uniforms.saturation = entry.filter.saturation;
      }
      // Re-ingest / other actions are implicit
    }

    this.clampPan();
    this.callbacks.onStateChange?.();
    this.callbacks.onHistoryChange?.();
  }

  /* ================================================================
   *  INTERNAL — Worker message handlers
   * ================================================================ */

  private handleDecoderMessage(e: MessageEvent): void {
    const { blob, error } = e.data;
    if (error) {
      this.callbacks.onError?.(`HEIC decode: ${error}`);
      return;
    }
    if (blob) {
      this.imgUrl = URL.createObjectURL(blob);
      this.originalBlobUrl = this.imgUrl;
      this.loadImageFromUrl(this.imgUrl).then(() => {
        this.history.push(HistoryManager.ingestImage(this.imgUrl!, { ...this.state }));
        this.saveSession();
      });
    }
  }

  private handleAIWorkerMessage(e: MessageEvent): void {
    if (e.data.type === 'AI_MASK_READY') {
      this.maskData = e.data.mask as ImageData;
      this.maskActive = true;
      // Scale the mask to match the image dimensions
      // (The mask may be at a different resolution; we store as-is
      //  and the drawTransformedImage uses putImageData directly.)
      this.history.push(
        HistoryManager.applyAIMask('indexeddb://ai-mask', { ...this.state }),
      );
      this.callbacks.onStateChange?.();
    }
    this.callbacks.onAITaskEnd?.('mask');
  }

  private handleAutoCropMessage(e: MessageEvent): void {
    if (e.data.type === 'AUTO_CROP_READY' && e.data.bbox) {
      const bbox = e.data.bbox as { x: number; y: number; width: number; height: number };
      if (!this.img) return;

      // Calculate focal point of detected subject
      const focalX = bbox.x + bbox.width / 2;
      const focalY = bbox.y + bbox.height / 2;

      // Calculate translation to centre the focal point in the viewport
      const vw = this.canvas2D.width;
      const vh = this.canvas2D.height;
      const imgCenterX = this.img.width / 2;
      const imgCenterY = this.img.height / 2;

      this.state.translateX = (imgCenterX - focalX) / this.state.zoom;
      this.state.translateY = (imgCenterY - focalY) / this.state.zoom;
      this.clampPan();

      // Push history entry as a pan event
      this.history.push(
        HistoryManager.panImage(this.state.translateX, this.state.translateY, { ...this.state }),
      );

      this.callbacks.onStateChange?.();
    }
    this.callbacks.onAITaskEnd?.('crop');
  }

  /* ================================================================
   *  INTERNAL — Pan Handlers
   * ================================================================ */

  private setupPanHandlers(): void {
    let isDown = false;
    let lastX = 0;
    let lastY = 0;

    this.canvas2D.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const dx = (e.clientX - lastX) / this.state.zoom;
      const dy = (e.clientY - lastY) / this.state.zoom;
      this.pan(dx, dy);
      lastX = e.clientX;
      lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        // Push history for the pan gesture
        this.history.push(
          HistoryManager.panImage(this.state.translateX, this.state.translateY, { ...this.state }),
        );
      }
    });

    // Touch support
    this.canvas2D.addEventListener('touchstart', (e) => {
      isDown = true;
      const touch = e.touches[0];
      lastX = touch.clientX;
      lastY = touch.clientY;
    });
    this.canvas2D.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const touch = e.touches[0];
      const dx = (touch.clientX - lastX) / this.state.zoom;
      const dy = (touch.clientY - lastY) / this.state.zoom;
      this.pan(dx, dy);
      lastX = touch.clientX;
      lastY = touch.clientY;
    });
    this.canvas2D.addEventListener('touchend', () => {
      if (isDown) {
        isDown = false;
        this.history.push(
          HistoryManager.panImage(this.state.translateX, this.state.translateY, { ...this.state }),
        );
      }
    });

    // Mouse wheel zoom
    this.canvas2D.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.max(0.1, Math.min(10, this.state.zoom + delta));
        this.setZoom(newZoom);
      },
      { passive: false },
    );
  }
}