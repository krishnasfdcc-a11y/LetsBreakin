/**
 * Maximum file size: 100MB
 */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

/**
 * HEIC/HEIF file signatures (magic numbers) in hex.
 * HEIC files start with "ftyp" box, with specific brand identifiers.
 * Common HEIC brands: mif1, msf1, heic, heix, hevc, hevx, heis
 */
const HEIC_SIGNATURES: string[] = [
  '6674797068656963', // ftyp heic
  '6674797068656978', // ftyp heix
  '6674797068657663', // ftyp hevc
  '6674797068657678', // ftyp hevx
  '6674797068656973', // ftyp heis
  '667479706d696631', // ftyp mif1
  '667479706d736631', // ftyp msf1
];

/**
 * Reads the first bytes of a file to detect its magic number/signature.
 * This is more reliable than checking the file extension since HEIC files
 * may have incorrect extensions.
 */
export function readMagicNumbers(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          reject(new Error('Failed to read file bytes'));
          return;
        }

        // Read first 12 bytes to capture the ftyp box
        const bytes = new Uint8Array(arrayBuffer, 0, 12);
        let hex = '';
        bytes.forEach((byte) => {
          hex += byte.toString(16).padStart(2, '0');
        });
        resolve(hex);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader error occurred'));
    };

    // Slice the first 12 bytes and read them
    const blob = file.slice(0, 12);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Validates whether a given hex signature corresponds to a HEIC/HEIF file.
 */
export function isHeicSignature(hexSignature: string): boolean {
  return HEIC_SIGNATURES.some((signature) => hexSignature.includes(signature));
}

/**
 * Validates the file type, checking extension first, then falling back to magic number detection.
 */
export async function validateFile(file: File): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'File is empty',
    };
  }

  // Check extension first as a quick filter
  const allowedExtensions = ['png', 'jpg', 'jpeg', 'heic', 'heif'];
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file extension: ${extension}. Supported formats: ${allowedExtensions.join(', ')}`,
    };
  }

  // If it's a HEIC/HEIF file, verify with magic number detection
  if (extension === 'heic' || extension === 'heif') {
    try {
      const hexSignature = await readMagicNumbers(file);
      if (!isHeicSignature(hexSignature)) {
        return {
          valid: false,
          error: 'File has a HEIC/HEIF extension but does not contain a valid HEIC/HEIF signature',
        };
      }
    } catch (error) {
      return {
        valid: false,
        error: 'Failed to read file signature for validation',
      };
    }
  }

  return { valid: true };
}

/**
 * Reads a File as an ArrayBuffer for transfer to the Web Worker.
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (result instanceof ArrayBuffer) {
        resolve(result);
      } else {
        reject(new Error('FileReader did not return an ArrayBuffer'));
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader error occurred while reading file as ArrayBuffer'));
    };

    reader.readAsArrayBuffer(file);
  });
}