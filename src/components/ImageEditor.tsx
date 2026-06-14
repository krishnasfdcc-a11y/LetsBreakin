import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { CanvasManager, CanvasState } from '../core/CanvasManager';
import { WebGLManager, FilterState } from '../core/WebGLManager';
import { ExportEngine } from '../core/ExportEngine';
import { validateFile, readFileAsArrayBuffer } from '../utils/fileValidation';
import { HistoryManager, HistorySnapshot, SnapshotCommand, HistoryActionType } from '../history/HistoryManager';
import { saveProject, loadProject, saveMask, generateProjectId } from '../utils/indexedDB';
import './ImageEditor.css';

const rgbToHex = (rgb: number[]) => {
  const r = Math.round(rgb[0] * 255);
  const g = Math.round(rgb[1] * 255);
  const b = Math.round(rgb[2] * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

const ImageEditor: React.FC = () => {
  // Canvas refs
  const phase1CanvasRef = useRef<HTMLCanvasElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manager refs
  const canvasManagerRef = useRef<CanvasManager | null>(null);
  const webglManagerRef = useRef<WebGLManager | null>(null);
  const historyManagerRef = useRef<HistoryManager | null>(null);
  const exportEngineRef = useRef<ExportEngine | null>(null);
  const aiWorkerRef = useRef<Worker | null>(null);
  const heicWorkerRef = useRef<Worker | null>(null);
  const webglRef = useRef<WebGLManager | null>(null);

  // Project state
  const [projectId, setProjectId] = useState<string>('');
  const currentBlobRef = useRef<Blob | null>(null);

  // Loading / error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  // AI state
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiModelName, setAiModelName] = useState('');

  // History state (for UI rendering)
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Export state
  const [isExporting, setIsExporting] = useState(false);

  // Filter display values
  const [displayBrightness, setDisplayBrightness] = useState(0);
  const [displayContrast, setDisplayContrast] = useState(1);
  const [displaySaturation, setDisplaySaturation] = useState(1);
  const [displayLightAngle, setDisplayLightAngle] = useState(0);
  const [displayLightIntensity, setDisplayLightIntensity] = useState(0);

  // Saved indicator
  const [lastSaved, setLastSaved] = useState<string>('');
  const [isSemanticBgEnabled, setIsSemanticBgEnabled] = useState(false);

  // ===== State Reader/Writer for HistoryManager =====
  // Reads the current state from all managers into a HistorySnapshot
  const stateReader = useCallback((): HistorySnapshot => {
    const cm = canvasManagerRef.current;
    const wm = webglManagerRef.current;
    const state = cm?.getState() || { zoom: 1, translateX: 0, translateY: 0, rotation: 0, flipX: false, flipY: false };
    return {
      zoom: state.zoom,
      translateX: state.translateX,
      translateY: state.translateY,
      rotation: state.rotation,
      flipX: state.flipX,
      flipY: state.flipY,
      brightness: wm?.filterState.brightness ?? 0,
      contrast: wm?.filterState.contrast ?? 1,
      saturation: wm?.filterState.saturation ?? 1,
      lightAngle: wm?.filterState.lightAngle ?? 0,
      lightIntensity: wm?.filterState.lightIntensity ?? 0,
      hasMask: cm?.isMaskActive() ?? false,
      maskId: null,
      semanticBackgroundEnabled: wm?.semanticBackgroundEnabled ?? false,
      semanticColorA: wm?.semanticColors?.[0] ? rgbToHex(wm.semanticColors[0]) : null,
      semanticColorB: wm?.semanticColors?.[1] ? rgbToHex(wm.semanticColors[1]) : null,
    };
  }, []);

  // Writes a HistorySnapshot back to all managers (used by undo/restore)
  const stateWriter = useCallback((snapshot: HistorySnapshot) => {
    const cm = canvasManagerRef.current;
    const wm = webglManagerRef.current;
    if (!cm || !wm) return;

    cm.setZoom(snapshot.zoom);
    // Directly set state to avoid animation frames stacking
    const state = cm.getState();
    state.translateX = snapshot.translateX;
    state.translateY = snapshot.translateY;
    state.rotation = snapshot.rotation;
    state.flipX = snapshot.flipX;
    state.flipY = snapshot.flipY;

    wm.filterState.brightness = snapshot.brightness;
    wm.filterState.contrast = snapshot.contrast;
    wm.filterState.saturation = snapshot.saturation;
    wm.filterState.lightAngle = snapshot.lightAngle;
    wm.filterState.lightIntensity = snapshot.lightIntensity;

    cm.resetState();
    // Apply the restored state
    cm.setZoom(snapshot.zoom);
    
    if (snapshot.semanticBackgroundEnabled && snapshot.semanticColorA && snapshot.semanticColorB) {
      wm.enableSemanticBackground(snapshot.semanticColorA, snapshot.semanticColorB);
      setIsSemanticBgEnabled(true);
    } else {
      wm.disableSemanticBackground();
      setIsSemanticBgEnabled(false);
    }

    // We need to manually set translate/rotation/flip since setZoom only handles zoom
    // Use a workaround: directly assign to internal state
    (cm as any).state.translateX = snapshot.translateX;
    (cm as any).state.translateY = snapshot.translateY;
    (cm as any).state.rotation = snapshot.rotation;
    (cm as any).state.flipX = snapshot.flipX;
    (cm as any).state.flipY = snapshot.flipY;

    cm.getState(); // trigger re-render
    wm.requestRender();

    setDisplayBrightness(snapshot.brightness);
    setDisplayContrast(snapshot.contrast);
    setDisplaySaturation(snapshot.saturation);
    setDisplayLightAngle(snapshot.lightAngle);
    setDisplayLightIntensity(snapshot.lightIntensity);
  }, []);

  // ===== Initialize Managers =====
  useEffect(() => {
    if (phase1CanvasRef.current && webglCanvasRef.current && !canvasManagerRef.current) {
      const cm = new CanvasManager(phase1CanvasRef.current);
      canvasManagerRef.current = cm;

      const wm = new WebGLManager(phase1CanvasRef.current, webglCanvasRef.current);
      webglManagerRef.current = wm;
      webglRef.current = wm;

      // History manager (init after canvas is ready)
      const hm = new HistoryManager(stateReader, stateWriter);
      hm.onHistoryChange = () => {
        setCanUndo(hm.canUndo());
        setCanRedo(hm.canRedo());
        triggerAutoSave();
      };
      historyManagerRef.current = hm;

      // Export engine
      const ee = new ExportEngine();
      exportEngineRef.current = ee;

      cm.onPostRender = () => {
        wm.updateTexture();
      };

      cm.onImageReady = () => {
        setHasImage(true);
        setIsLoading(false);
        wm.updateTexture();
        // Set source image for export
        ee.setSourceImage(cm.getImageElement());
        // Record initial state as a history command
        recordHistoryState('INGEST_IMAGE');
      };

      // Generate a project ID
      setProjectId(generateProjectId());
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
  }, [stateReader, stateWriter]);

  // ===== ResizeObserver =====
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

  // ===== Keyboard Shortcuts =====
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z for Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl+Shift+Z or Ctrl+Y for Redo
      if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
          ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ===== Auto-Save =====
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      performSave();
    }, 2000);
  }, []);

  const performSave = useCallback(async () => {
    const cm = canvasManagerRef.current;
    const hm = historyManagerRef.current;
    const blob = currentBlobRef.current;
    const pid = projectId;
    if (!cm || !hm || !blob || !pid) return;

    try {
      const serialized = hm.serializeStack();
      await saveProject(pid, blob, serialized);
      setLastSaved(new Date().toLocaleTimeString());
    } catch (e) {
      // Auto-save failures are non-critical
      console.warn('Auto-save failed:', e);
    }
  }, [projectId]);

  // ===== History Recording =====
  const recordHistoryState = useCallback((type: HistoryActionType) => {
    const hm = historyManagerRef.current;
    if (!hm) return;
    const before = hm.captureSnapshot();
    // Schedule after-state capture on next tick
    requestAnimationFrame(() => {
      const after = hm.captureSnapshot();
      // Only record if something actually changed
      if (JSON.stringify(before) !== JSON.stringify(after)) {
        const cmd = new SnapshotCommand(type, before, after, stateWriter);
        hm.executeCommand(cmd);
      }
    });
  }, [stateWriter]);

  // ===== Undo/Redo =====
  const handleUndo = useCallback(() => {
    historyManagerRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    historyManagerRef.current?.redo();
  }, []);

  // ===== AI Worker =====
  const getAIWorker = useCallback((): Worker => {
    if (!aiWorkerRef.current) {
      aiWorkerRef.current = new Worker(
        new URL('../workers/ai.worker.ts', import.meta.url),
        { type: 'module' }
      );
      aiWorkerRef.current.onmessage = (e: MessageEvent) => {
        const { type, payload } = e.data;
        switch (type) {
          case 'PROGRESS':
            setAiProgress(payload.percentage || 0);
            setAiModelName(payload.model || '');
            if (payload.status === 'loading') setIsAILoading(true);
            else if (payload.status === 'ready') {
              setIsAILoading(false);
              setAiProgress(100);
            }
            break;
          case 'MASK_GENERATED':
            if (canvasManagerRef.current && payload) {
              canvasManagerRef.current.applyMask(payload);
          // Sync the new mask immediately with the Relighting GPU pipeline
          const maskCanvas = (canvasManagerRef.current as any).maskCanvas;
          webglManagerRef.current?.updateMaskTexture(maskCanvas);
              recordHistoryState('APPLY_AI_MASK');
            }
            setIsAILoading(false);
            break;
          case 'FOCAL_POINT':
            if (canvasManagerRef.current && payload) {
              canvasManagerRef.current.animateToFocalPoint(payload.focalX, payload.focalY);
            }
            setIsAILoading(false);
            break;
          case 'COLORS_EXTRACTED':
            if (payload.colors && payload.colors.length >= 2 && webglManagerRef.current) {
              webglManagerRef.current.enableSemanticBackground(payload.colors[0], payload.colors[1]);
              setIsSemanticBgEnabled(true);
              recordHistoryState('UPDATE_FILTER');
            }
            setIsAILoading(false);
            break;
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
  }, [recordHistoryState]);

  const handleRemoveBackground = useCallback(() => {
    const cm = canvasManagerRef.current;
    if (!cm) return;
    setIsAILoading(true);
    setAiProgress(0);
    const imageData = cm.extractImageData();
    if (!imageData) {
      setError('Failed to extract image data for AI processing');
      setIsAILoading(false);
      return;
    }
    getAIWorker().postMessage({ type: 'REMOVE_BACKGROUND', imageData }, [imageData.data.buffer]);
  }, [getAIWorker]);

  const handleSmartCrop = useCallback(() => {
    const cm = canvasManagerRef.current;
    if (!cm) return;
    setIsAILoading(true);
    setAiProgress(0);
    const imageData = cm.extractImageData();
    if (!imageData) {
      setError('Failed to extract image data for AI processing');
      setIsAILoading(false);
      return;
    }
    
    // Feature 1.2: Pass existing mask to Web Worker for coordinate extraction
    let maskData: ImageData | undefined;
    if (cm.isMaskActive()) {
      const maskCanvas = (cm as any).maskCanvas as HTMLCanvasElement;
      if (maskCanvas) {
        const ctx = maskCanvas.getContext('2d');
        if (ctx) maskData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
      }
    }

    const transferables = maskData ? [imageData.data.buffer, maskData.data.buffer] : [imageData.data.buffer];
    getAIWorker().postMessage({ type: 'SMART_CROP', imageData, maskData }, transferables);
  }, [getAIWorker]);

  const handleSemanticBackground = useCallback(() => {
    const cm = canvasManagerRef.current;
    if (!cm) return;

    if (isSemanticBgEnabled && webglManagerRef.current) {
      webglManagerRef.current.disableSemanticBackground();
      setIsSemanticBgEnabled(false);
      recordHistoryState('UPDATE_FILTER');
      return;
    }

    if (!cm.isMaskActive()) {
      setError('Please remove the background first before applying a semantic background.');
      return;
    }

    setIsAILoading(true);
    setAiProgress(0);
    setAiModelName('K-Means');

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 100;
    tempCanvas.height = 100;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) { setIsAILoading(false); return; }

    tempCtx.drawImage(cm.getImageElement(), 0, 0, 100, 100);
    const downscaledImage = tempCtx.getImageData(0, 0, 100, 100);

    const maskCanvas = (cm as any).maskCanvas as HTMLCanvasElement;
    tempCtx.clearRect(0, 0, 100, 100);
    if (maskCanvas) tempCtx.drawImage(maskCanvas, 0, 0, 100, 100);
    const downscaledMask = tempCtx.getImageData(0, 0, 100, 100);

    getAIWorker().postMessage({ type: 'EXTRACT_COLORS', imageData: downscaledImage, maskData: downscaledMask }, [downscaledImage.data.buffer, downscaledMask.data.buffer]);
  }, [isSemanticBgEnabled, getAIWorker, recordHistoryState]);

  // ===== File Handling =====
  const processImageBlob = useCallback((blob: Blob) => {
    currentBlobRef.current = blob;
    const imageUrl = URL.createObjectURL(blob);
    canvasManagerRef.current?.setImageSource(imageUrl);
    // Setup export engine with the image once it loads
    const cm = canvasManagerRef.current;
    if (cm) {
      const checkLoaded = setInterval(() => {
        if (cm.hasImage()) {
          exportEngineRef.current?.setSourceImage(cm.getImageElement());
          clearInterval(checkLoaded);
        }
      }, 100);
    }
    // Reset history for new image
    historyManagerRef.current?.clear();
    setIsSemanticBgEnabled(false);
    if (webglManagerRef.current) webglManagerRef.current.disableSemanticBackground();
  }, []);

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
          if (workerError) { setError(workerError); setIsLoading(false); return; }
          if (blob) processImageBlob(blob);
          if (heicWorkerRef.current) { heicWorkerRef.current.terminate(); heicWorkerRef.current = null; }
        };
        heicWorkerRef.current.onerror = (e: ErrorEvent) => {
          setError(`Worker error: ${e.message}`);
          setIsLoading(false);
          if (heicWorkerRef.current) { heicWorkerRef.current.terminate(); heicWorkerRef.current = null; }
        };
      }
      heicWorkerRef.current.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
    } catch (err) {
      setError(`Failed to process HEIC file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [processImageBlob]);

  const handleUploadClick = useCallback(() => fileInputRef.current?.click(), []);
  const handleFitToScreen = useCallback(() => {
    canvasManagerRef.current?.resetState();
    canvasManagerRef.current?.setZoom(1);
  }, []);

  // ===== Export =====
  const handleExport = useCallback(async () => {
    const cm = canvasManagerRef.current;
    const wm = webglManagerRef.current;
    const ee = exportEngineRef.current;
    if (!cm || !wm || !ee) return;

    setIsExporting(true);
    setError(null);

    try {
      const canvasState = cm.getState();
      const filterState = wm.filterState;

      // Update mask in export engine
      const maskCanvas = (cm as any).maskCanvas as HTMLCanvasElement | null;
      ee.setMaskCanvas(maskCanvas);

      const blob = await ee.exportHighRes(canvasState, filterState);
      ExportEngine.downloadBlob(blob, 'edited-masterpiece.png');
    } catch (e: any) {
      setError(`Export failed: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  }, []);

  // ===== Parallax Video =====
  const handleExportVideo = useCallback(async () => {
    const cm = canvasManagerRef.current;
    if (!cm || !cm.isMaskActive()) {
      setError('Please remove the background first before exporting a 3D parallax video.');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const { ParallaxEngine } = await import('../core/ParallaxEngine');
      const engine = new ParallaxEngine();
      engine.setSourceImage(cm.getImageElement());
      engine.setMaskCanvas((cm as any).maskCanvas);

      const worker = new Worker(new URL('../workers/videoEncoder.worker.ts', import.meta.url), { type: 'module' });
      
      worker.onmessage = (e: MessageEvent) => {
        const { type, payload } = e.data;
        if (type === 'COMPLETE') {
          if (payload.blob) ExportEngine.downloadBlob(payload.blob, payload.filename);
          worker.terminate();
          setIsExporting(false);
          engine.destroy();
        } else if (type === 'ERROR') {
          setError(payload.error);
          worker.terminate();
          setIsExporting(false);
          engine.destroy();
        }
      };

      worker.postMessage({ type: 'INIT_ENCODE', width: cm.getImageWidth(), height: cm.getImageHeight(), fps: 30, totalFrames: 90 });

      await engine.renderParallaxVideo(undefined, async (bitmap, frameNumber) => {
        worker.postMessage({ type: 'ENCODE_FRAME', frameNumber, bitmap }, [bitmap]);
      });

      worker.postMessage({ type: 'FLUSH' });
    } catch (e: any) {
      setError(`Video export failed: ${e?.message || 'Unknown error'}`);
      setIsExporting(false);
    }
  }, []);

  // ===== Filter Handlers =====
  const handleBrightnessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.brightness = value;
      webglRef.current.requestRender();
    }
    setDisplayBrightness(value);
  }, []);

  // Debounced history record for filter changes (commits on pointer up)
  const handleBrightnessCommit = useCallback(() => {
    recordHistoryState('UPDATE_FILTER');
  }, [recordHistoryState]);

  const handleContrastChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.contrast = value;
      webglRef.current.requestRender();
    }
    setDisplayContrast(value);
  }, []);

  const handleContrastCommit = useCallback(() => {
    recordHistoryState('UPDATE_FILTER');
  }, [recordHistoryState]);

  const handleSaturationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.saturation = value;
      webglRef.current.requestRender();
    }
    setDisplaySaturation(value);
  }, []);

  const handleSaturationCommit = useCallback(() => {
    recordHistoryState('UPDATE_FILTER');
  }, [recordHistoryState]);

  const handleLightAngleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.lightAngle = value;
      webglRef.current.requestRender();
    }
    setDisplayLightAngle(value);
  }, []);

  const handleLightIntensityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (webglRef.current) {
      webglRef.current.filterState.lightIntensity = value;
      webglRef.current.requestRender();
    }
    setDisplayLightIntensity(value);
  }, []);

  const handleLightCommit = useCallback(() => {
    recordHistoryState('UPDATE_FILTER');
  }, [recordHistoryState]);

  const handleResetFilters = useCallback(() => {
    if (webglRef.current) {
      webglRef.current.filterState.brightness = 0;
      webglRef.current.filterState.contrast = 1;
      webglRef.current.filterState.saturation = 1;
      webglRef.current.filterState.lightAngle = 0;
      webglRef.current.filterState.lightIntensity = 0;
      webglRef.current.requestRender();
    }
    setDisplayBrightness(0);
    setDisplayContrast(1);
    setDisplaySaturation(1);
    setDisplayLightAngle(0);
    setDisplayLightIntensity(0);
    recordHistoryState('UPDATE_FILTER');
  }, [recordHistoryState]);

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
        </button>

        {hasImage && (
          <>
            <div className="toolbar-separator" />

            {/* Undo/Redo */}
            <button className="toolbar-button" onClick={handleUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            <button className="toolbar-button" onClick={handleRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <div className="toolbar-separator" />

            <button className="toolbar-button" onClick={handleFitToScreen} title="Fit to screen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            <div className="toolbar-separator" />

            {/* AI Buttons */}
            <button className="toolbar-button ai-button" onClick={handleRemoveBackground} disabled={isAILoading} title="Remove background using AI">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="10" />
              </svg>
              Remove BG
            </button>

            <button className="toolbar-button ai-button" onClick={handleSmartCrop} disabled={isAILoading} title="Detect and center on subject">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Smart Crop
            </button>

            <button className={`toolbar-button ai-button ${isSemanticBgEnabled ? 'active' : ''}`} onClick={handleSemanticBackground} disabled={isAILoading} title="Smart Semantic Background" style={{ color: isSemanticBgEnabled ? '#4ade80' : '' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Semantic BG
            </button>

            <div className="toolbar-separator" />

            {/* Export Button */}
            <button className="toolbar-button export-button" onClick={handleExport} disabled={isExporting} title="Export high-resolution image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>

            <button className="toolbar-button export-button" onClick={handleExportVideo} disabled={isExporting} title="Export 3D Parallax Video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              3D Video
            </button>
          </>
        )}

        {/* Status indicators */}
        {lastSaved && hasImage && (
          <span className="save-indicator" title="Project saved locally">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Saved {lastSaved}
          </span>
        )}

        {isAILoading && (
          <div className="loading-indicator ai-loading">
            <div className="spinner" />
            <div className="ai-progress-bar">
              <div className="ai-progress-fill" style={{ width: `${aiProgress}%` }} />
            </div>
            <span className="ai-progress-text">{aiModelName} {Math.round(aiProgress)}%</span>
          </div>
        )}

        {isLoading && !isAILoading && (
          <div className="loading-indicator">
            <div className="spinner" />
            <span>Loading...</span>
          </div>
        )}

        {isExporting && (
          <div className="loading-indicator">
            <div className="spinner" />
            <span>Exporting...</span>
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
            <input type="range" className="filter-slider" min="-1" max="1" step="0.01"
              value={displayBrightness} onChange={handleBrightnessChange}
              onMouseUp={handleBrightnessCommit} onTouchEnd={handleBrightnessCommit} />
            <span className="filter-value">{displayBrightness.toFixed(2)}</span>
          </div>
          <div className="filter-group">
            <span className="filter-label">Contrast</span>
            <input type="range" className="filter-slider" min="0" max="3" step="0.01"
              value={displayContrast} onChange={handleContrastChange}
              onMouseUp={handleContrastCommit} onTouchEnd={handleContrastCommit} />
            <span className="filter-value">{displayContrast.toFixed(2)}</span>
          </div>
          <div className="filter-group">
            <span className="filter-label">Saturation</span>
            <input type="range" className="filter-slider" min="0" max="3" step="0.01"
              value={displaySaturation} onChange={handleSaturationChange}
              onMouseUp={handleSaturationCommit} onTouchEnd={handleSaturationCommit} />
            <span className="filter-value">{displaySaturation.toFixed(2)}</span>
          </div>
        <div className="filter-group">
          <span className="filter-label">Light Angle</span>
          <input type="range" className="filter-slider" min="0" max="360" step="1"
            value={displayLightAngle} onChange={handleLightAngleChange}
            onMouseUp={handleLightCommit} onTouchEnd={handleLightCommit} />
          <span className="filter-value">{displayLightAngle}°</span>
        </div>
        <div className="filter-group">
          <span className="filter-label">Light Intensity</span>
          <input type="range" className="filter-slider" min="0" max="100" step="1"
            value={displayLightIntensity} onChange={handleLightIntensityChange}
            onMouseUp={handleLightCommit} onTouchEnd={handleLightCommit} />
          <span className="filter-value">{displayLightIntensity}</span>
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

      <input ref={fileInputRef} type="file" id="file-upload"
        accept="image/png, image/jpeg, image/heic, image/heif"
        onChange={handleFileSelect} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageEditor;