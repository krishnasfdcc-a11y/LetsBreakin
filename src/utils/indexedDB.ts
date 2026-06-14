/**
 * Phase 4 - Part 3: IndexedDB Configuration & LocalForage Integration
 *
 * Uses localforage for persistent storage of:
 * - Original image binary blobs
 * - Serialized history stacks (undo/redo)
 * - AI mask data
 *
 * Storage structure:
 *   blob_{projectId}    → Blob (original image)
 *   history_{projectId} → SerializedAction[] (JSON)
 *   mask_{maskId}       → ImageData (alpha mask)
 */

import localforage from 'localforage';

// Dedicated localforage instance for the image editor
const store = localforage.createInstance({
  name: 'LocalImageEditor',
  storeName: 'editor_data',
  description: 'Persistent storage for LocalImageEditor projects',
});

// Configure to explicitly prioritize IndexedDB
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'LocalImageEditor',
});

export interface ProjectData {
  originalBlob: Blob;
  historyStack: any[];
  maskIds: string[];
}

/**
 * Saves a complete project snapshot to IndexedDB.
 * Stores the original image as a binary blob and the history stack as JSON.
 */
export async function saveProject(
  projectId: string,
  originalBlob: Blob,
  historyStack: any[]
): Promise<void> {
  // Write the raw image file as a binary blob
  await store.setItem(`blob_${projectId}`, originalBlob);

  // Write the serialized history stack
  await store.setItem(`history_${projectId}`, historyStack);

  // Write project metadata
  await store.setItem(`meta_${projectId}`, {
    savedAt: Date.now(),
    blobSize: originalBlob.size,
    blobType: originalBlob.type,
    historyLength: historyStack.length,
  });
}

/**
 * Loads a complete project from IndexedDB.
 */
export async function loadProject(
  projectId: string
): Promise<ProjectData | null> {
  const originalBlob = await store.getItem<Blob>(`blob_${projectId}`);
  const historyStack = await store.getItem<any[]>(`history_${projectId}`);

  if (!originalBlob) return null;

  return {
    originalBlob,
    historyStack: historyStack || [],
    maskIds: [],
  };
}

/**
 * Saves an AI mask (alpha-channel ImageData) to IndexedDB.
 * The mask is written as a structured clone of the ImageData.
 */
export async function saveMask(
  maskId: string,
  maskImageData: ImageData
): Promise<void> {
  await store.setItem(`mask_${maskId}`, {
    width: maskImageData.width,
    height: maskImageData.height,
    data: Array.from(maskImageData.data), // Convert Uint8ClampedArray to plain array for storage
  });
}

/**
 * Loads an AI mask from IndexedDB and reconstructs an ImageData object.
 */
export async function loadMask(maskId: string): Promise<ImageData | null> {
  const stored = await store.getItem<{
    width: number;
    height: number;
    data: number[];
  }>(`mask_${maskId}`);

  if (!stored) return null;

  const imageData = new ImageData(stored.width, stored.height);
  imageData.data.set(stored.data);
  return imageData;
}

/**
 * Deletes a mask from IndexedDB.
 */
export async function deleteMask(maskId: string): Promise<void> {
  await store.removeItem(`mask_${maskId}`);
}

/**
 * Lists all saved project IDs.
 */
export async function listProjects(): Promise<string[]> {
  const projectIds: string[] = [];
  await store.iterate((value, key) => {
    if (key.startsWith('meta_')) {
      projectIds.push(key.replace('meta_', ''));
    }
  });
  return projectIds;
}

/**
 * Deletes an entire project from IndexedDB.
 */
export async function deleteProject(projectId: string): Promise<void> {
  await store.removeItem(`blob_${projectId}`);
  await store.removeItem(`history_${projectId}`);
  await store.removeItem(`meta_${projectId}`);
}

/**
 * Generates a unique project ID.
 */
export function generateProjectId(): string {
  return `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}