// src/core/ProjectStore.ts
/**
 * ProjectStore – Phase 4 IndexedDB persistence via localForage.
 *
 * Bypasses the 5 MB localStorage limit by using IndexedDB through
 * the localForage abstraction.  Stores:
 *   1. Original source asset as a binary Blob.
 *   2. Full history state stack as JSON.
 *   3. Current filter & transform snapshots.
 *
 * On application launch the store is queried; if an active project
 * exists the editor restores the image and replays the history.
 */

import localforage from 'localforage';
import type { TransformState, FilterUniforms } from './types';

const STORE_KEYS = {
  assetBlob: 'project_asset_blob',
  assetType: 'project_asset_type',
  assetUrl: 'project_asset_url', // cached object URL (ephemeral, regenerated on load)
  historyJSON: 'project_history_json',
  transformState: 'project_transform_state',
  filterState: 'project_filter_state',
} as const;

export interface ProjectSnapshot {
  assetBlob: Blob | null;
  assetType: string; // e.g. 'image/png'
  historyJSON: string | null;
  transformState: TransformState | null;
  filterState: FilterUniforms | null;
}

// Configure localForage instance
const store = localforage.createInstance({
  name: 'LetsBreakinEditor',
  storeName: 'projects',
});

export const ProjectStore = {
  /** Save the entire project state atomically. */
  async save(snapshot: {
    assetBlob?: Blob;
    assetType?: string;
    historyJSON?: string;
    transformState?: TransformState;
    filterState?: FilterUniforms;
  }): Promise<void> {
    const writes: Array<Promise<unknown>> = [];

    if (snapshot.assetBlob !== undefined) {
      writes.push(store.setItem(STORE_KEYS.assetBlob, snapshot.assetBlob));
    }
    if (snapshot.assetType !== undefined) {
      writes.push(store.setItem(STORE_KEYS.assetType, snapshot.assetType));
    }
    if (snapshot.historyJSON !== undefined) {
      writes.push(store.setItem(STORE_KEYS.historyJSON, snapshot.historyJSON));
    }
    if (snapshot.transformState !== undefined) {
      writes.push(store.setItem(STORE_KEYS.transformState, snapshot.transformState));
    }
    if (snapshot.filterState !== undefined) {
      writes.push(store.setItem(STORE_KEYS.filterState, snapshot.filterState));
    }

    await Promise.all(writes);
  },

  /** Load the most recent project snapshot, or null if none exists. */
  async load(): Promise<ProjectSnapshot | null> {
    const assetBlob = await store.getItem<Blob>(STORE_KEYS.assetBlob);
    // If no blob is stored, there's no active project
    if (!assetBlob) return null;

    const [assetType, historyJSON, transformState, filterState] = await Promise.all([
      store.getItem<string>(STORE_KEYS.assetType),
      store.getItem<string>(STORE_KEYS.historyJSON),
      store.getItem<TransformState>(STORE_KEYS.transformState),
      store.getItem<FilterUniforms>(STORE_KEYS.filterState),
    ]);

    return {
      assetBlob,
      assetType: assetType ?? 'image/png',
      historyJSON: historyJSON ?? null,
      transformState: transformState ?? null,
      filterState: filterState ?? null,
    };
  },

  /** Check whether a saved project exists. */
  async exists(): Promise<boolean> {
    const blob = await store.getItem(STORE_KEYS.assetBlob);
    return blob !== null;
  },

  /** Delete all stored project data. */
  async clear(): Promise<void> {
    await Promise.all(Object.values(STORE_KEYS).map((key) => store.removeItem(key)));
  },
};