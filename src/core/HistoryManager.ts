// src/core/HistoryManager.ts
/**
 * HistoryManager – Phase 4 Command-Pattern undo/redo engine.
 *
 * Tracks a lightweight history stack of JSON-serializable command
 * objects rather than storing full pixel buffers.  Undo pops the
 * last command onto a redo stack; redo pushes it back.
 */

import type { HistoryEntry, TransformState, FilterUniforms } from './types';

export class HistoryManager {
  private undoStack: HistoryEntry[] = [];
  private redoStack: HistoryEntry[] = [];
  private listeners: Array<() => void> = [];

  /** Maximum entries to keep (soft limit — oldest are shifted out). */
  readonly maxEntries = 128;

  /** Push a new action and clear redo. */
  push(entry: HistoryEntry): void {
    this.undoStack.push(entry);
    this.redoStack = [];
    // Enforce soft cap
    while (this.undoStack.length > this.maxEntries) {
      this.undoStack.shift();
    }
    this.notify();
  }

  /** Pop the most recent action, returning it (or null). */
  undo(): HistoryEntry | null {
    const entry = this.undoStack.pop() ?? null;
    if (entry) {
      this.redoStack.push(entry);
      this.notify();
    }
    return entry;
  }

  /** Pop from redo stack, returning it (or null). */
  redo(): HistoryEntry | null {
    const entry = this.redoStack.pop() ?? null;
    if (entry) {
      this.undoStack.push(entry);
      this.notify();
    }
    return entry;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** The full list of actions (for replay / serialisation). */
  getAll(): HistoryEntry[] {
    return [...this.undoStack];
  }

  /** Reset both stacks (e.g. when loading a new project). */
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
  }

  /** Subscribe to stack changes (for UI button enable/disable). */
  onChange(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify(): void {
    for (const fn of this.listeners) fn();
  }

  /* ── Serialisation helpers (for IndexedDB persistence) ───── */

  toJSON(): string {
    return JSON.stringify({
      undoStack: this.undoStack,
      redoStack: this.redoStack,
    });
  }

  fromJSON(json: string): void {
    try {
      const data = JSON.parse(json);
      this.undoStack = data.undoStack ?? [];
      this.redoStack = data.redoStack ?? [];
      this.notify();
    } catch {
      // corrupted data – start fresh
      this.clear();
    }
  }

  /* ── Convenience factory helpers ─────────────────────────── */

  static ingestImage(assetRef: string, transform: TransformState): HistoryEntry {
    return { action: 'INGEST_IMAGE', assetRef, transform };
  }

  static panImage(dx: number, dy: number, transform: TransformState): HistoryEntry {
    return { action: 'PAN_IMAGE', payload: { dx, dy }, transform };
  }

  static setZoom(zoom: number, transform: TransformState): HistoryEntry {
    return { action: 'SET_ZOOM', payload: { zoom }, transform };
  }

  static setRotation(rotation: number, transform: TransformState): HistoryEntry {
    return { action: 'SET_ROTATION', payload: { rotation }, transform };
  }

  static setFlip(flipX: boolean, flipY: boolean, transform: TransformState): HistoryEntry {
    return { action: 'SET_FLIP', payload: { flipX, flipY }, transform };
  }

  static setFilter(filter: FilterUniforms, transform: TransformState): HistoryEntry {
    return { action: 'SET_FILTER', payload: { ...filter }, transform, filter };
  }

  static applyAIMask(maskRef: string, transform: TransformState): HistoryEntry {
    return { action: 'APPLY_AI_MASK', assetRef: maskRef, transform };
  }
}