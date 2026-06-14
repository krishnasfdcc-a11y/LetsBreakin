// src/App.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { CanvasManager } from './core/CanvasManager';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<CanvasManager | null>(null);

  // UI-only state (low-frequency, for button labels/toggles)
  const [hasImage, setHasImage] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [aiBusy, setAiBusy] = useState<{ mask: boolean; crop: boolean }>({
    mask: false,
    crop: false,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Refs for slider values (writes bypass React state for 60fps perf)
  const brightnessRef = useRef(0);
  const contrastRef = useRef(1);
  const saturationRef = useRef(1);
  const zoomRef = useRef(1);

  /* ─── React state sync helpers (for UI labels) ──────────── */
  const [brightnessLabel, setBrightnessLabel] = useState('0');
  const [contrastLabel, setContrastLabel] = useState('1');
  const [saturationLabel, setSaturationLabel] = useState('1');
  const [zoomLabel, setZoomLabel] = useState('100');

  // Apply filter immediately to CanvasManager (no React round-trip)
  const applyBrightness = useCallback(
    (v: number) => {
      brightnessRef.current = v;
      setBrightnessLabel(v.toFixed(2));
      managerRef.current?.setBrightness(v);
    },
    [],
  );
  const applyContrast = useCallback(
    (v: number) => {
      contrastRef.current = v;
      setContrastLabel(v.toFixed(2));
      managerRef.current?.setContrast(v);
    },
    [],
  );
  const applySaturation = useCallback(
    (v: number) => {
      saturationRef.current = v;
      setSaturationLabel(v.toFixed(2));
      managerRef.current?.setSaturation(v);
    },
    [],
  );
  const applyZoom = useCallback(
    (v: number) => {
      zoomRef.current = v;
      setZoomLabel(Math.round(v * 100).toString());
      managerRef.current?.setZoom(v);
    },
    [],
  );

  /* ─── Init CanvasManager ───────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new CanvasManager(containerRef.current, {
      onStateChange: () => {
        setHasImage(manager.hasImage);
        zoomRef.current = manager.state.zoom;
        setZoomLabel(Math.round(manager.state.zoom * 100).toString());
      },
      onHistoryChange: () => {
        setCanUndo(manager.history.canUndo());
        setCanRedo(manager.history.canRedo());
      },
      onAITaskStart: (task) => {
        setAiBusy((prev) => ({ ...prev, [task]: true }));
      },
      onAITaskEnd: (task) => {
        setAiBusy((prev) => ({ ...prev, [task]: false }));
      },
      onError: (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(null), 5000);
      },
    });

    managerRef.current = manager;

    // Initial resize
    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      manager.resize(rect.width, rect.height);
    };
    // Delay resize so layout settles
    setTimeout(resize, 50);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      manager.dispose();
    };
  }, []);

  /* ─── User actions ─────────────────────────────────────── */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && managerRef.current) {
      managerRef.current.loadFile(file);
      // Reset sliders visually
      applyBrightness(0);
      applyContrast(1);
      applySaturation(1);
    }
  };

  const handleUndo = () => managerRef.current?.undo();
  const handleRedo = () => managerRef.current?.redo();
  const handleRotateCW = () =>
    managerRef.current?.setRotation((managerRef.current?.state.rotation ?? 0) + 90);
  const handleRotateCCW = () =>
    managerRef.current?.setRotation((managerRef.current?.state.rotation ?? 0) - 90);
  const handleFlipH = () =>
    managerRef.current?.setFlipX(!(managerRef.current?.state.flipX ?? false));
  const handleFlipV = () =>
    managerRef.current?.setFlipY(!(managerRef.current?.state.flipY ?? false));
  const handleReset = () => {
    const m = managerRef.current;
    if (!m) return;
    m.setZoom(1);
    m.setRotation(0);
    m.setFlipX(false);
    m.setFlipY(false);
    applyZoom(1);
    applyBrightness(0);
    applyContrast(1);
    applySaturation(1);
  };

  const handleRemoveBackground = () => managerRef.current?.applyAIBackgroundRemoval();
  const handleAutoCrop = () => managerRef.current?.requestAutoCrop();

  const handleExportPNG = () => managerRef.current?.export('image/png');
  const handleExportWebP = () => managerRef.current?.export('image/webp');

  // Commit filter history on slider release
  const commitFilter = () => {
    const m = managerRef.current;
    if (!m) return;
    m.setFilter({
      brightness: brightnessRef.current,
      contrast: contrastRef.current,
      saturation: saturationRef.current,
    });
  };

  /* ─── Layout ───────────────────────────────────────────── */
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
      {/* ── Toolbar ─────────────────────────────────────── */}
      <div style={toolbarStyle}>
        {/* File */}
        <label style={btnStyle}>
          📁 Open
          <input
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>

        {/* Undo / Redo */}
        <button
          onClick={handleUndo}
          disabled={!canUndo}
          style={{ ...btnStyle, opacity: canUndo ? 1 : 0.4 }}
        >
          ↩ Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={!canRedo}
          style={{ ...btnStyle, opacity: canRedo ? 1 : 0.4 }}
        >
          ↪ Redo
        </button>

        <div style={dividerStyle} />

        {/* Zoom */}
        <span style={labelStyle}>Zoom {zoomLabel}%</span>
        <input
          type="range"
          min="10"
          max="500"
          step="1"
          defaultValue={100}
          onChange={(e) => applyZoom(Number(e.target.value) / 100)}
          style={sliderStyle}
        />

        {/* Rotation */}
        <button onClick={handleRotateCW} style={btnStyle}>
          ↻ 90°
        </button>
        <button onClick={handleRotateCCW} style={btnStyle}>
          ↺ 90°
        </button>
        <button onClick={handleFlipH} style={btnStyle}>
          ⇔ Flip H
        </button>
        <button onClick={handleFlipV} style={btnStyle}>
          ⇕ Flip V
        </button>
        <button onClick={handleReset} style={{ ...btnStyle, color: '#c00' }}>
          Reset
        </button>

        <div style={dividerStyle} />

        {/* Filter sliders */}
        <span style={labelStyle}>☀ {brightnessLabel}</span>
        <input
          type="range"
          min="-100"
          max="100"
          step="1"
          defaultValue={0}
          onChange={(e) => applyBrightness(Number(e.target.value) / 100)}
          onMouseUp={commitFilter}
          onTouchEnd={commitFilter}
          style={sliderStyle}
        />
        <span style={labelStyle}>◑ {contrastLabel}</span>
        <input
          type="range"
          min="0"
          max="300"
          step="1"
          defaultValue={100}
          onChange={(e) => applyContrast(Number(e.target.value) / 100)}
          onMouseUp={commitFilter}
          onTouchEnd={commitFilter}
          style={sliderStyle}
        />
        <span style={labelStyle}>🌈 {saturationLabel}</span>
        <input
          type="range"
          min="0"
          max="300"
          step="1"
          defaultValue={100}
          onChange={(e) => applySaturation(Number(e.target.value) / 100)}
          onMouseUp={commitFilter}
          onTouchEnd={commitFilter}
          style={sliderStyle}
        />

        <div style={dividerStyle} />

        {/* AI tools */}
        <button
          onClick={handleRemoveBackground}
          disabled={!hasImage || aiBusy.mask}
          style={{
            ...btnStyle,
            opacity: hasImage && !aiBusy.mask ? 1 : 0.4,
            background: aiBusy.mask ? '#ffd700' : undefined,
          }}
        >
          {aiBusy.mask ? '⏳ AI Mask...' : '🤖 Remove BG'}
        </button>
        <button
          onClick={handleAutoCrop}
          disabled={!hasImage || aiBusy.crop}
          style={{
            ...btnStyle,
            opacity: hasImage && !aiBusy.crop ? 1 : 0.4,
            background: aiBusy.crop ? '#ffd700' : undefined,
          }}
        >
          {aiBusy.crop ? '⏳ Detecting...' : '🎯 Auto Crop'}
        </button>

        <div style={dividerStyle} />

        {/* Export */}
        <button
          onClick={handleExportPNG}
          disabled={!hasImage}
          style={{ ...btnStyle, opacity: hasImage ? 1 : 0.4 }}
        >
          ⬇ PNG
        </button>
        <button
          onClick={handleExportWebP}
          disabled={!hasImage}
          style={{ ...btnStyle, opacity: hasImage ? 1 : 0.4 }}
        >
          ⬇ WebP
        </button>
      </div>

      {/* ── Error toast ─────────────────────────────────── */}
      {errorMsg && (
        <div style={errorToastStyle}>
          {errorMsg}
        </div>
      )}

      {/* ── Canvas container ────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#1a1a2e',
        }}
      />
    </div>
  );
}

/* ── Inline styles ────────────────────────────────────────── */

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 12px',
  background: '#2d2d44',
  borderBottom: '2px solid #444',
  color: '#eee',
  fontSize: '13px',
  userSelect: 'none',
};

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #555',
  background: '#3a3a5c',
  color: '#eee',
  cursor: 'pointer',
  fontSize: '13px',
  whiteSpace: 'nowrap',
};

const sliderStyle: React.CSSProperties = {
  width: '70px',
  accentColor: '#7c7cff',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#ccc',
  minWidth: '50px',
  textAlign: 'center',
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '24px',
  background: '#555',
  margin: '0 4px',
};

const errorToastStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: '#c0392b',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '6px',
  zIndex: 9999,
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
};