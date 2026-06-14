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
  const aiWorkerRef = useRef<Worker | null>(null);
  const heicWorkerRef = useRef<Worker | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  // AI model loading state
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiModelName, setAiModelName] = useState('');

  // Filter display values
  const [displayBrightness, setDisplayBrightness] = useState(0);
  const [displayContrast, setDisplayContrast] = useState(1);
  const [displaySaturation, setDisplaySaturation] = useState(1);

  // Refs
  const webglRef = useRef<WebGLManager | null>(null);

  /**
   * Initialize CanvasManager and WebGLManager when canvases mount.
   */
  useEffect(() => {
    if (phase1CanvasRef.current && webglCanvasRef.current && !canvasManagerRef.current) {
      const cm = new CanvasManager(phase1CanvasRef.current);
      canvasManagerRef.current = cm;

      const wm = new WebGLManager(phase1CanvasRef.current, webglCanvasRef.current);
      webglManagerRef.current = wm;
      webglRef.current = wm;

      cm.onPostRender = () => {
        wm.updateTexture();
      };

      cm.onImageReady = () => {
        setHasImage(true);
        setIsLoading(false);
        wm.updateTexture();
      };
    }

    return () => {
      if (heicWorkerRef.current) {
        heicWorkerRef.current.terminate();
        heicWorkerRef.current = null;
      }
      if (aiWorkerRef.current) {
        aiWorkerRef.current.terminate();
        aiWorkerRef.current = null;
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
   * ResizeObserver to keep both canvases in sync.
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

  // ===================== AI Worker Management =====================

  /**
   * Lazily initializes the AI worker.
   */
  const getAIWorker = useCallback((): Worker => {
    if (!aiWorkerRef.current) {
      aiWorkerRef.current = new Worker(
        new URL('../workers/ai.worker.ts', import.meta.url),
        { type: 'module' }
      );

      aiWorkerRef.current.onmessage = (e: MessageEvent) => {
        const { type, payload, requestId } = e.data;

        switch (type) {
          case 'PROGRESS':
            setAiProgress(payload.percentage || 0);
            setAiModelName(payload.model || '');
            if (payload.status === 'loading') {
              setIsAILoading(true);
            } else if (payload.status === 'ready') {
              setIsAILoading(false);
              setAiProgress(100);
            }
            break;

          case 'MASK_GENERATED': {
            // Apply the AI mask to the CanvasManager
            const cm = canvasManagerRef.current;
            if (cm && payload) {
              cm.applyMask(payload);
            }
            setIsAILoading(false);
            break;
          }

          case 'FOCAL_POINT': {
            // Animate to the detected focal point
            const cm = canvasManagerRef.current;
            if (cm && payload) {
              cm.animateToFocalPoint(payload.focalX, payload.focalY);
            }
            setIsAILoading(false);
            break;
          }

          case 'ERROR':
            setError(`AI error: ${payload}`);
            setIsAILoading(false);
            break;
        }
      };

      aiWorkerRef.current.onerror = (e: ErrorEvent) => {
        setError(`AI worker error: ${e.message}`);
        setIsAILoading(false);
      };
    }
    return aiWorkerRef.current;
  }, []);

  /**
   * Removes the background using the AI worker.
   */
  const handleRemoveBackground = useCallback(() => {
    const cm = canvasManagerRef.current;
    if (!cm) return;

    setIsAILoading(true);
    setAiProgress(0);

    const worker = getAIWorker();

    // Extract raw ImageData (without transformations)
    const imageData = cm.extractImageData();
    if (!imageData) {
      setError('Failed to extract image data for AI processing');
      setIsAILoading(false);
      return;
    }

    // Post to the AI worker with transferable buffer
    worker.postMessage(
      { type: 'REMOVE_BACKGROUND', imageData },
      [imageData.data.buffer]
    );
  }, [getAIWorker]);

  /**
   * Runs smart crop (object detection) via the AI worker.
   */
  const handleSmartCrop = useCallback(() => {
    const cm = canvasManagerRef.current;
    if (!cm) return;

    setIsAILoading(true);
    setAiProgress(0);

    const worker = getAIWorker();

    const imageData = cm.extractImageData();
    if (!imageData) {
      setError('Failed to extract image data for AI processing');
      setIsAILoading(false);
      return;
    }

    worker.postMessage(
      { type: 'SMART_CROP', imageData },
      [imageData.data.buffer]
    );
  }, [getAIWorker]);

  // ===== End AI Worker Management =====

  /**
   * Processes a loaded image Blob.
   */
  const processImageBlob = useCallback((blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    canvasManagerRef.current?.setImageSource(imageUrl);
  }, []);

  /**
   * Handles file selection.
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

    if (extension !== 'heic' && extension !== 'heif') {
      processImageBlob(file);
      return;
    }

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);

      if (!heicWorkerRef.current) {
        heicWorkerRef.current = new Worker(
          new URL('../workers/heicDecoder.worker.ts', import.meta.url),
          { type: 'module' }
        );

        heicWorkerRef.current.onmessage = (e: MessageEvent) => {
          const { blob, error: workerError } = e.data;
          if (workerError) {
            setError(workerError);
            setIsLoading(false);
            return;
          }
          if (blob) processImageBlob(blob);
          if (heicWorkerRef.current) {
            heicWorkerRef.current.terminate();
            heicWorkerRef.current = null;
          }
        };

        heicWorkerRef.current.onerror = (e: ErrorEvent) => {
          setError(`Worker error: ${e.message}`);
          setIsLoading(false);
          if (heicWorkerRef.current) {
            heicWorkerRef.current.terminate();
            heicWorkerRef.current = null;
          }
        };
      }

      heicWorkerRef.current.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
    } catch (err) {
      setError(`Failed to process HEIC file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [processImageBlob]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFitToScreen = useCallback(() => {
    canvasManagerRef.current?.resetState();
    canvasManagerRef.current?.setZoom(1);
  }, []);

  // ===== Filter Slider Handlers =====

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
          Upload
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

            <div className="toolbar-separator" />

            {/* AI Action Buttons */}
            <button
              className="toolbar-button ai-button"
              onClick={handleRemoveBackground}
              disabled={isAILoading}
              title="Remove background using AI"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Remove BG
            </button>

            <button
              className="toolbar-button ai-button"
              onClick={handleSmartCrop}
              disabled={isAILoading}
              title="Detect and center on subject"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Smart Crop
            </button>
          </>
        )}

        {/* AI Progress / Loading */}
        {isAILoading && (
          <div className="loading-indicator ai-loading">
            <div className="spinner" />
            <div className="ai-progress-bar">
              <div className="ai-progress-fill" style={{ width: `${aiProgress}%` }} />
            </div>
            <span className="ai-progress-text">
              {aiModelName} {Math.round(aiProgress)}%
            </span>
          </div>
        )}

        {isLoading && !isAILoading && (
          <div className="loading-indicator">
            <div className="spinner" />
            <span>Loading...</span>
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
        <canvas ref={phase1CanvasRef} id="main-viewport" className="main-canvas" />
        <canvas ref={webglCanvasRef} id="webgl-viewport" />

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

      {/* Filter controls bar */}
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