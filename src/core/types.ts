// src/core/types.ts
/** Shared type definitions for the entire application. */

export interface TransformState {
  zoom: number;       // 1.0 = 100 %
  translateX: number; // horizontal offset (dx)
  translateY: number; // vertical offset (dy)
  rotation: number;   // 0 | 90 | 180 | 270 degrees
  flipX: boolean;
  flipY: boolean;
}

export interface FilterUniforms {
  brightness: number; // -1 .. 1  (additive)
  contrast: number;   //  0 .. 3  (1 = neutral)
  saturation: number; //  0 .. 3  (1 = neutral)
}

export interface AspectRatioPreset {
  label: string;
  width: number;
  height: number;
}

export type HistoryActionType =
  | 'INGEST_IMAGE'
  | 'PAN_IMAGE'
  | 'SET_ZOOM'
  | 'SET_ROTATION'
  | 'SET_FLIP'
  | 'SET_FILTER'
  | 'APPLY_AI_MASK';

export interface HistoryEntry {
  action: HistoryActionType;
  /** opaque reference used by the manager to replay this step */
  payload?: unknown;
  /** snapshot of transform state AFTER this action (for fast restore) */
  transform?: TransformState;
  /** snapshot of filter state AFTER this action */
  filter?: FilterUniforms;
  /** asset reference string */
  assetRef?: string;
}

export interface WorkerResponse {
  type: 'HEIC_DECODED' | 'AI_MASK_READY' | 'AUTO_CROP_READY' | 'ERROR';
  blob?: Blob;
  mask?: ImageData;
  bbox?: { x: number; y: number; width: number; height: number };
  error?: string;
}