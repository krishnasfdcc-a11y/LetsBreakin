/**
 * Feature 1.4: Offscreen WebCodecs Video Encoding Worker
 *
 * Receives ImageBitmaps from the main thread (zero-copy transfer) and encodes
 * them using the native browser VideoEncoder API into H.264 or VP9 chunks.
 *
 * The encoding loop runs silently in the background, keeping the main UI
 * perfectly responsive throughout the entire 90-frame export.
 *
 * Supports both H.264 (MP4) and VP9 (WebM) codecs with automatic fallback.
 */

export interface VideoEncodeInitMessage {
  type: 'INIT_ENCODE';
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  codec?: 'h264' | 'vp9';
}

export interface VideoFrameMessage {
  type: 'ENCODE_FRAME';
  frameNumber: number;
  bitmap: ImageBitmap;
}

export interface VideoFlushMessage {
  type: 'FLUSH';
}

export interface VideoAbortMessage {
  type: 'ABORT';
}

export type WorkerRequestMessage =
  | VideoEncodeInitMessage
  | VideoFrameMessage
  | VideoFlushMessage
  | VideoAbortMessage;

export interface EncodeProgressPayload {
  frame: number;
  total: number;
  percentage: number;
}

export interface EncodedChunkPayload {
  frame: number;
  chunk: ArrayBuffer;
}

export interface VideoCompletePayload {
  blob: Blob;
  filename: string;
}

export interface VideoErrorPayload {
  error: string;
}

interface EncoderMessage {
  type: 'PROGRESS' | 'CHUNK_ENCODED' | 'COMPLETE' | 'ERROR';
  payload: EncodeProgressPayload | EncodedChunkPayload | VideoCompletePayload | VideoErrorPayload;
}

let videoEncoder: VideoEncoder | null = null;
let muxer: BlobMuxer | null = null;

let configuredWidth: number = 0;
let configuredHeight: number = 0;
let configuredFps: number = 30;
let totalFrames: number = 0;
let encodedChunks: ArrayBuffer[] = [];
let frameCount: number = 0;

class BlobMuxer {
  private chunks: ArrayBuffer[] = [];
  private mimeType: string;

  constructor(mimeType: string) {
    this.mimeType = mimeType;
  }

  addChunk(chunk: ArrayBuffer): void {
    this.chunks.push(chunk);
  }

  getBlob(): Blob {
    const blob = new Blob(this.chunks, { type: this.mimeType });
    return blob;
  }

  getExtension(): string {
    return this.mimeType.includes('webm') ? 'webm' : 'mp4';
  }
}

/**
 * Selects the best available video codec with fallback chain.
 */
function selectCodec(preferred: 'h264' | 'vp9' = 'h264'): { mimeType: string; codec: string } | null {
  const h264Mime = 'video/mp4; codecs="avc1.42E01E"';
  const vp9Mime = 'video/webm; codecs="vp9"';
  const av1Mime = 'video/mp4; codecs="av01.0.01M.08"';

  const candidates = preferred === 'h264'
    ? [h264Mime, vp9Mime, av1Mime]
    : [vp9Mime, h264Mime, av1Mime];

  for (const mime of candidates) {
    if (VideoEncoder.isConfigSupported({
      codec: mime.split(';')[1]?.replace('codecs="', '').replace('"', '') || mime,
      width: 1920,
      height: 1080,
      bitrate: 5_000_000,
      framerate: 30,
    }).then) {
      return { mimeType: mime, codec: mime };
    }
  }

  // Fallback: try basic mp4
  if (MediaRecorder.isTypeSupported('video/mp4')) {
    return { mimeType: 'video/mp4', codec: 'video/mp4' };
  }

  if (MediaRecorder.isTypeSupported('video/webm')) {
    return { mimeType: 'video/webm', codec: 'video/webm' };
  }

  return null;
}

/**
 * Initializes the VideoEncoder with the selected codec.
 */
async function initEncoder(width: number, height: number, fps: number, codecPref: 'h264' | 'vp9'): Promise<string> {
  const codecInfo = selectCodec(codecPref);
  if (!codecInfo) {
    throw new Error('No supported video codec found on this browser');
  }

  configuredWidth = width;
  configuredHeight = height;
  configuredFps = fps;
  totalFrames = ParallaxEngine.TOTAL_FRAMES;
  frameCount = 0;
  encodedChunks = [];

  muxer = new BlobMuxer(codecInfo.mimeType);

  const encoderConfig: VideoEncoderEncodeOptions = {
    codec: codecInfo.mimeType.includes('webm') ? 'vp9' : 'avc1.42E01E',
    width,
    height,
    bitrate: 8_000_000,
    framerate: fps,
    hardwareAcceleration: 'prefer-hardware',
  };

  videoEncoder = new VideoEncoder({
    output: (chunk: EncodedVideoChunk, metadata: EncodedVideoChunkMetadata | undefined) => {
      const buffer = new ArrayBuffer(chunk.byteLength);
      chunk.copyTo(buffer);
      encodedChunks.push(buffer);

      const encoderMsg: EncoderMessage = {
        type: 'CHUNK_ENCODED',
        payload: {
          frame: frameCount,
          chunk: buffer,
        },
      };
      self.postMessage(encoderMsg, [buffer]);
    },
    error: (e: VideoEncoderErrorEvent) => {
      const errMsg: EncoderMessage = {
        type: 'ERROR',
        payload: { error: `VideoEncoder error: ${e.message}` },
      };
      self.postMessage(errMsg);
    },
  });

  await videoEncoder.configure(encoderConfig);

  return codecInfo.mimeType;
}

/**
 * Encodes a single frame bitmap into the VideoEncoder pipeline.
 */
function encodeFrame(bitmap: ImageBitmap, frameNumber: number): void {
  if (!videoEncoder) return;

  const timestamp = Math.round((frameNumber / configuredFps) * 1_000_000);
  const duration = Math.round((1 / configuredFps) * 1_000_000);

  const videoFrame = new VideoFrame(bitmap, {
    timestamp,
    duration,
  });

  videoEncoder.encode(videoFrame, { keyFrame: frameNumber === 1 || frameNumber % 10 === 0 });
  videoFrame.close();
  bitmap.close();

  frameCount++;

  const progressMsg: EncoderMessage = {
    type: 'PROGRESS',
    payload: {
      frame: frameNumber,
      total: totalFrames,
      percentage: Math.round((frameNumber / totalFrames) * 100),
    },
  };
  self.postMessage(progressMsg);
}

/**
 * Flushes the encoder and finalizes the output Blob.
 */
async function flushEncoder(): Promise<void> {
  if (!videoEncoder) return;

  await videoEncoder.flush();
  videoEncoder.close();
  videoEncoder = null;

  const blob = muxer!.getBlob();
  const filename = `parallax-3d-video.${muxer!.getExtension()}`;

  const completeMsg: EncoderMessage = {
    type: 'COMPLETE',
    payload: { blob, filename },
  };

  self.postMessage(completeMsg, [blob]);

  encodedChunks = [];
  muxer = null;
}

function abortEncoder(): void {
  if (videoEncoder && videoEncoder.state !== 'closed') {
    videoEncoder.close();
  }
  videoEncoder = null;
  muxer = null;
  encodedChunks = [];
  frameCount = 0;

  self.postMessage({ type: 'PROGRESS', payload: { frame: 0, total: 0, percentage: 0 } });
}

// ===================== Message Handler =====================

self.addEventListener('message', async (event: MessageEvent<WorkerRequestMessage>) => {
  const msg = event.data;

  try {
    switch (msg.type) {
      case 'INIT_ENCODE': {
        const mimeType = await initEncoder(msg.width, msg.height, msg.fps, msg.codec || 'h264');
        self.postMessage({ type: 'PROGRESS', payload: { frame: 0, total: msg.totalFrames, percentage: 0 } });
        break;
      }
      case 'ENCODE_FRAME': {
        encodeFrame(msg.bitmap, msg.frameNumber);
        break;
      }
      case 'FLUSH': {
        await flushEncoder();
        break;
      }
      case 'ABORT': {
        abortEncoder();
        break;
      }
      default:
        self.postMessage({ type: 'ERROR', payload: { error: `Unknown message type: ${(msg as any).type}` } });
    }
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', payload: { error: `Encoding failed: ${error?.message || 'Unknown error'}` } });
  }
});

export {};
