import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CanvasManager } from '../core/CanvasManager';
import { WebGLManager } from '../core/WebGLManager';
import { validateFile, readFileAsArrayBuffer } from '../utils/fileValidation';
import './ImageEditor.css';

const ImageEditor: React.FC = () => {
  const phase1CanvasRef = useRef<HTMLCanvasElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canvasManagerRef = useRef<CanvasManager | null>(null);
  const webglManagerRef = useRef<WebGLManager | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  // Local display values for the sliders (read-only display, not used for rendering)
  const [displayBrightness, setDisplayBrightness] = useState(0);
  const [displayContrast, setDisplayContrast] = useState(1);
  const [displaySaturation, setDisplaySaturation] = useState(1);

  // Refs to store the WebGL manager ref for slider callbacks
  const webglRef = useRef<WebGLManager | null>(null);

  /**
   * Initialize the CanvasManager and WebGLManager when canvases mount.
   */
  useEffect(() => {
    if (phase1CanvasRef.current && webglCanvasRef.current && !canvasManagerRef.current) {
      // Phase 1: CanvasManager for CPU transformations (offscreen buffer)
      const cm = new CanvasManager(phase1CanvasRef.current);
      canvasManagerRef.current = cm;

      // Phase 2: WebGLManager for GPU filter pipeline
      const wm = new WebGLManager(phase1CanvasRef.current, webglCanvasRef.current);
      webglManagerRef.current = wm;
      webglRef.current = wm;

      // Bridge Phase 1 -> Phase 2: After every Phase 1 render, refresh the WebGL texture
      cm.onPostRender = () => {
        wm.updateTexture();
      };

      cm.onImageReady = () => {
        setHasImage(true);
        setIsLoading(false);
        // Initial texture upload to WebGL
        wm.updateTexture();
      };
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (webglManagerRef.current) {
        webglManagerRef.current.destroy();
        webglManagerRef.current = null;
      }
      if (canvasManagerRef.current) {
        canvasManagerRef.current.destroy();
        canvasManagerRef.current = null;
      }
    };
  }, []);

  /**
   * ResizeObserver to keep both canvases in sync with the container.
   */
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      canvasManagerRef.current?.handleResize();
      webglManagerRef.current?.handleResize();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  /**
   * Processes a loaded image Blob from either direct file upload or HEIC decoding.
   */
  const processImageBlob = useCallback((blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    canvasManagerRef.current?.setImageSource(imageUrl);
  }, []);

  /**
   * Handles file selection from the hidden input.
   */
  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);
    setHasImage(false);

    const validation = await validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setIsLoading(false);
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();

    // For non-HEIC images, process directly
    if (extension !== 'heic' && extension !== 'heif') {
      processImageBlob(file);
      return;
    }

    // For HEIC/HEIF files, use the Web Worker for decoding
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);

      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL('../workers/heicDecoder.worker.ts', import.meta.url),
          { type: 'module' }
        );

        workerRef.current.onmessage = (e: MessageEvent) => {
          const { blob, error: workerError } = e.data;

          if (workerError) {
            setError(workerError);
            setIsLoading(false);
            return;
          }

          if (blob) {
            processImageBlob(blob);
          }

          if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
          }
        };

        workerRef.current.onerror = (e: ErrorEvent) => {
          setError(`Worker error: ${e.message}`);
          setIsLoading(false);
          if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
          }
        };
      }

      workerRef.current.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
    } catch (err) {
      setError(`Failed to process HEIC file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [processImageBlob]);

  /**
   * Programmatically trigger the hidden file input.
   */
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Fit the image to the canvas viewport.
   */
  const handleFitToScreen = useCallback(() => {
    canvasManagerRef.current?.resetState();
    canvasManagerRef.current?.setZoom(1);
  }, []);

  // ===== Filter Slider Handlers (Direct GPU State Bypass) =====
  //
  // These handlers bypass React's setState for the rendering path.
  // They update the WebGLManager's plain JS object directly,
  // avoiding component re-renders on every slider movement.
  // Local display values are only used for the readout display.

  const handleBrightnessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.brightness = value;
      webglRef.current.requestRender();
    }
    setDisplayBrightness(value);
  }, []);

  const handleContrastChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.contrast = value;
      webglRef.current.requestRender();
    }
    setDisplayContrast(value);
  }, []);

  const handleSaturationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.saturation = value;
      webglRef.current.requestRender();
    }
    setDisplaySaturation(value);
  }, []);

  /**
   * Reset all filters to their default values.
   */
  const handleResetFilters = useCallback(() => {
    if (webglRef.current) {
      webglRef.current.filterState.brightness = 0;
      webglRef.current.filterState.contrast = 1;
      webglRef.current.filterState.saturation = 1;
      webglRef.current.requestRender();
    }
    setDisplayBrightness(0);
    setDisplayContrast(1);
    setDisplaySaturation(1);
  }, []);

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <button className="toolbar-button upload-button" onClick={handleUploadClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Image
        </button>

        {hasImage && (
          <>
            <div className="toolbar-separator" />
            <button className="toolbar-button" onClick={handleFitToScreen} title="Fit to screen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              Fit
            </button>
          </>
        )}

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner" />
            <span>Processing image...</span>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="error-bar">
          <span>{error}</span>
          <button className="error-close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Dual-canvas viewport */}
      <div className="canvas-container" ref={canvasContainerRef}>
        {/* Phase 1 canvas - offscreen, opacity: 0, handles user interactions */}
        <canvas
          ref={phase1CanvasRef}
          id="main-viewport"
          className="main-canvas"
        />

        {/* WebGL canvas - visible output, receives GPU-filtered result */}
        <canvas
          ref={webglCanvasRef}
          id="webgl-viewport"
        />

        {/* Empty state (shown when no image is loaded) */}
        {!hasImage && !isLoading && !error && (
          <div className="empty-state" onClick={handleUploadClick}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <h2>Drop an image here or click to upload</h2>
            <p>Supports PNG, JPEG, HEIC, HEIF</p>
          </div>
        )}
      </div>

      {/* Filter controls bar (only when image is loaded) */}
      {hasImage && (
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">Brightness</span>
            <input
              type="range"
              className="filter-slider"
              min="-1"
              max="1"
              step="0.01"
              value={displayBrightness}
              onChange={handleBrightnessChange}
            />
            <span className="filter-value">{displayBrightness.toFixed(2)}</span>
          </div>

          <div className="filter-group">
            <span className="filter-label">Contrast</span>
            <input
              type="range"
              className="filter-slider"
              min="0"
              max="3"
              step="0.01"
              value={displayContrast}
              onChange={handleContrastChange}
            />
            <span className="filter-value">{displayContrast.toFixed(2)}</span>
          </div>

          <div className="filter-group">
            <span className="filter-label">Saturation</span>
            <input
              type="range"
              className="filter-slider"
              min="0"
              max="3"
              step="0.01"
              value={displaySaturation}
              onChange={handleSaturationChange}
            />
            <span className="filter-value">{displaySaturation.toFixed(2)}</span>
          </div>

          <button className="filter-reset" onClick={handleResetFilters} title="Reset filters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        id="file-upload"
        accept="image/png, image/jpeg, image/heic, image/heif"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageEditor;