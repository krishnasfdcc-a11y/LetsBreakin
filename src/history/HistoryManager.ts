/**
 * Phase 4 - Part 1 & 2: Command Pattern Design & Serialization
 *
 * Manages undo/redo stacks using the Command pattern.
 * Each user action (pan, zoom, filter, AI mask) is wrapped as a Command
 * with execute() and undo() methods. Stacks are limited to MAX_STACK_SIZE
 * to prevent RAM overhead. Filter slider changes are debounced via pointerup.
 */

export type HistoryActionType =
  | 'INGEST_IMAGE'
  | 'PAN_IMAGE'
  | 'ZOOM_IMAGE'
  | 'ROTATE_IMAGE'
  | 'FLIP_IMAGE'
  | 'UPDATE_FILTER'
  | 'APPLY_AI_MASK';

export interface Command {
  type: HistoryActionType;
  execute(): void | Promise<void>;
  undo(): void | Promise<void>;
  /** Serialized payload for IndexedDB persistence */
  serialize(): SerializedAction;
}

export interface SerializedAction {
  type: HistoryActionType;
  timestamp: number;
  payload: Record<string, any>;
}

export interface HistorySnapshot {
  zoom: number;
  translateX: number;
  translateY: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
  lightAngle: number;
  lightIntensity: number;
  hasMask: boolean;
  maskId: string | null;
  semanticBackgroundEnabled: boolean;
  semanticColorA: string | null;
  semanticColorB: string | null;
}

export type StateReader = () => HistorySnapshot;
export type StateWriter = (snapshot: HistorySnapshot) => void;
export type CommandExecutor = (command: Command) => void;

const MAX_STACK_SIZE = 50;

/**
 * Snapshot-based command that stores the full application state before and after an action.
 * This is more robust than individual action-based undo for complex operations.
 */
export class SnapshotCommand implements Command {
  public type: HistoryActionType;
  public beforeSnapshot: HistorySnapshot;
  public afterSnapshot: HistorySnapshot;
  private applyState: StateWriter;

  constructor(
    type: HistoryActionType,
    before: HistorySnapshot,
    after: HistorySnapshot,
    applyState: StateWriter
  ) {
    this.type = type;
    this.beforeSnapshot = before;
    this.afterSnapshot = after;
    this.applyState = applyState;
  }

  execute(): void {
    this.applyState(this.afterSnapshot);
  }

  undo(): void {
    this.applyState(this.beforeSnapshot);
  }

  serialize(): SerializedAction {
    return {
      type: this.type,
      timestamp: Date.now(),
      payload: { ...this.afterSnapshot },
    };
  }
}

/**
 * Manages undo/redo stacks and command execution lifecycle.
 */
export class HistoryManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private maxSize: number = MAX_STACK_SIZE;
  private stateReader: StateReader;
  private stateWriter: StateWriter;
  private onStackChange: (() => void) | null = null;

  /**
   * Callback for auto-save integration.
   * Fired when the undo stack changes (new command executed or undo/redo performed).
   */
  public onHistoryChange: (() => void) | null = null;

  constructor(stateReader: StateReader, stateWriter: StateWriter) {
    this.stateReader = stateReader;
    this.stateWriter = stateWriter;
  }

  /**
   * Captures the current state as a snapshot.
   */
  public captureSnapshot(): HistorySnapshot {
    return this.stateReader();
  }

  /**
   * Executes a command and pushes it onto the undo stack.
   * Clears the redo stack since a new action invalidates the redo history.
   */
  public executeCommand(command: Command): void {
    // Execute the command first
    command.execute();

    // Push onto undo stack
    this.undoStack.push(command);

    // Clear redo stack on new action
    this.redoStack = [];

    // Enforce max stack size - shift oldest off the bottom
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    this.notifyChange();
  }

  /**
   * Undo the most recent command.
   */
  public undo(): void {
    if (this.undoStack.length === 0) return;

    const command = this.undoStack.pop()!;
    command.undo();
    this.redoStack.push(command);
    this.notifyChange();
  }

  /**
   * Redo a previously undone command.
   */
  public redo(): void {
    if (this.redoStack.length === 0) return;

    const command = this.redoStack.pop()!;
    command.execute();
    this.undoStack.push(command);
    this.notifyChange();
  }

  /**
   * Returns whether undo is currently available.
   */
  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * Returns whether redo is currently available.
   */
  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * Returns the current undo stack size.
   */
  public undoSize(): number {
    return this.undoStack.length;
  }

  /**
   * Serializes the entire undo stack into a JSON-friendly array for IndexedDB persistence.
   */
  public serializeStack(): SerializedAction[] {
    return this.undoStack.map((cmd) => cmd.serialize());
  }

  /**
   * Restores the undo stack from a serialized array.
   * This is used during project loading to rebuild history.
   */
  public restoreFromSerialized(actions: SerializedAction[]): void {
    // Clear existing stacks
    this.undoStack = [];
    this.redoStack = [];

    // Rebuild commands from serialized data (snapshot-based)
    for (const action of actions) {
      if (
        action.type === 'ZOOM_IMAGE' ||
        action.type === 'PAN_IMAGE' ||
        action.type === 'ROTATE_IMAGE' ||
        action.type === 'FLIP_IMAGE' ||
        action.type === 'UPDATE_FILTER' ||
        action.type === 'APPLY_AI_MASK'
      ) {
        // Create a snapshot command that applies the stored state
        const cmd = new SnapshotCommand(
          action.type,
          action.payload as unknown as HistorySnapshot,
          action.payload as unknown as HistorySnapshot,
          this.stateWriter
        );
        this.undoStack.push(cmd);
      }
    }

    this.notifyChange();
  }

  /**
   * Clears both stacks (e.g., when a new image is loaded).
   */
  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.notifyChange();
  }

  private notifyChange(): void {
    this.onHistoryChange?.();
    this.onStackChange?.();
  }
}