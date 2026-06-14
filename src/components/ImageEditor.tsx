import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CanvasManager } from '../core/CanvasManager';
import { validateFile, readFileAsArrayBuffer } from '../utils/fileValidation';
import './ImageEditor.css';

const ImageEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasManagerRef = useRef<CanvasManager | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  /**
   * Initialize the CanvasManager when the canvas mounts.
   */
  useEffect(() => {
    if (canvasRef.current && !canvasManagerRef.current) {
      canvasManagerRef.current = new CanvasManager(canvasRef.current);
      canvasManagerRef.current.onImageReady = () => {
        setHasImage(true);
        setIsLoading(false);
      };
    }

    return () => {
      // Cleanup worker and canvas manager on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (canvasManagerRef.current) {
        canvasManagerRef.current.destroy();
        canvasManagerRef.current = null;
      }
    };
  }, []);

  /**
   * Handle window resize to keep canvas dimensions in sync.
   */
  useEffect(() => {
    const handleResize = () => {
      canvasManagerRef.current?.handleResize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Processes a loaded image Blob from either direct file upload or HEIC decoding.
   * Creates an Object URL and passes it to the CanvasManager.
   */
  const processImageBlob = useCallback((blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    canvasManagerRef.current?.setImageSource(imageUrl);
  }, []);

  /**
   * Handles file selection from the hidden input.
   * Validates the file, then either processes directly (PNG/JPEG) or
   * sends to the Web Worker for HEIC decoding.
   */
  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setIsLoading(true);
    setHasImage(false);

    // Validate the file
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
      // Convert file to ArrayBuffer for transfer to worker
      const arrayBuffer = await readFileAsArrayBuffer(file);

      // Create worker if not already created
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL('../workers/heicDecoder.worker.ts', import.meta.url),
          { type: 'module' }
        );

        // Set up worker message handler
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

          // Terminate worker immediately to free up CPU resources
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

      // Send the ArrayBuffer to the worker using Transferable Objects (zero-copy)
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
    const manager = canvasManagerRef.current;
    if (!manager || !canvasRef.current) return;

    // Reset state and let the canvas manager recalculate
    manager.resetState();
    manager.setZoom(1);
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

      {/* Canvas viewport */}
      <div className="viewport">
        <canvas
          ref={canvasRef}
          id="main-viewport"
          className="main-canvas"
        />

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