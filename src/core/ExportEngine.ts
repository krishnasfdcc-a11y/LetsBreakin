/**
 * Phase 4 - Parts 5-10: Export Engine (High-Resolution Render Pass)
 *
 * Handles full-resolution export of the edited image.
 * Replays the transformation matrix and filter pipeline on an offscreen
 * canvas at the original image resolution, then generates a downloadable Blob.
 *
 * Key operations:
 * - Part 5: Offscreen canvas at full source resolution
 * - Part 6: Replay transformation history with upscaled coordinates
 * - Part 7: High-fidelity WebGL filter pass
 * - Part 8: AI mask compositing at full resolution
 * - Part 9: Blob generation & browser download
 * - Part 10: VRAM/RAM cleanup
 */

import { CanvasState } from './CanvasManager';
import { FilterState } from './WebGLManager';

export interface ExportOptions {
  format: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number; // 0.0 - 1.0 (for JPEG/WebP)
}

const DEFAULT_OPTIONS: ExportOptions = {
  format: 'image/png',
  quality: 0.92,
};

export class ExportEngine {
  private sourceImage: HTMLImageElement | null = null;
  private maskCanvas: HTMLCanvasElement | null = null;
  private isExporting: boolean = false;

  /**
   * Sets the source image for export (must be the original, full-resolution image).
   */
  public setSourceImage(img: HTMLImageElement): void {
    this.sourceImage = img;
  }

  /**
   * Sets the AI mask canvas for compositing at full resolution.
   */
  public setMaskCanvas(canvas: HTMLCanvasElement | null): void {
    this.maskCanvas = canvas;
  }

  /**
   * Returns whether an export is currently in progress.
   */
  public getIsExporting(): boolean {
    return this.isExporting;
  }

  /**
   * Exports the edited image at full original resolution.
   * Returns a Blob ready for download.
   */
  public async exportHighRes(
    canvasState: CanvasState,
    filterState: FilterState,
    options: Partial<ExportOptions> = {}
  ): Promise<Blob> {
    if (!this.sourceImage || !this.sourceImage.complete) {
      throw new Error('Source image not loaded for export');
    }

    this.isExporting = true;

    const opts = { ...DEFAULT_OPTIONS, ...options };
    const sourceWidth = this.sourceImage.naturalWidth;
    const sourceHeight = this.sourceImage.naturalHeight;

    try {
      // ===== Part 5: Offscreen Canvas at Full Resolution =====
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = sourceWidth;
      offscreenCanvas.height = sourceHeight;
      const oCtx = offscreenCanvas.getContext('2d')!;

      // ===== Part 6: Replay History at Full Resolution =====
      oCtx.clearRect(0, 0, sourceWidth, sourceHeight);

      // Calculate the geometric center of the high-res canvas
      const highResCenterX = sourceWidth / 2;
      const highResCenterY = sourceHeight / 2;

      oCtx.save();

      // Shift origin to center
      oCtx.translate(highResCenterX, highResCenterY);

      // Apply rotation
      oCtx.rotate((canvasState.rotation * Math.PI) / 180);

      // Apply mirroring + zoom (zoom at full res is 1.0 since we're at source scale)
      // For export, zoom is effectively disabled - we render at 1:1 source pixels
      oCtx.scale(
        canvasState.flipX ? -1 : 1,
        canvasState.flipY ? -1 : 1
      );

      // Apply upscaled pan translation
      // The preview translateX/Y are in preview-space. Since we're rendering
      // at full source resolution, we need to scale the pan offsets accordingly.
      // At the preview level, pan = delta / zoom. At export, zoom=1 so pan = delta.
      // But we also need to account for the preview-to-source scale factor.
      // translateSource = translatePreview * (sourceWidth / previewWidth)
      // Since we don't have preview dimensions here, we use the stored translate values
      // which are already in image-space coordinates.
      oCtx.translate(canvasState.translateX, canvasState.translateY);

      // Draw the original full-resolution image centered
      oCtx.drawImage(this.sourceImage, -sourceWidth / 2, -sourceHeight / 2);

      // ===== Part 8: Mask Compositing =====
      if (this.maskCanvas && canvasState.flipX !== undefined) {
        const maskWidth = this.maskCanvas.width;
        const maskHeight = this.maskCanvas.height;

        // If mask exists, apply it using destination-in compositing
        // Scale the mask to match source dimensions if needed
        oCtx.globalCompositeOperation = 'destination-in';

        // Draw mask at the same transformation but scaled to source size
        if (maskWidth !== sourceWidth || maskHeight !== sourceHeight) {
          // Scale mask to match source using linear interpolation
          const tempMaskCanvas = document.createElement('canvas');
          tempMaskCanvas.width = sourceWidth;
          tempMaskCanvas.height = sourceHeight;
          const tempMaskCtx = tempMaskCanvas.getContext('2d')!;
          tempMaskCtx.drawImage(this.maskCanvas, 0, 0, sourceWidth, sourceHeight);

          // Draw the upscaled mask with transform
          oCtx.save();
          oCtx.translate(highResCenterX, highResCenterY);
          oCtx.rotate((canvasState.rotation * Math.PI) / 180);
          oCtx.scale(canvasState.flipX ? -1 : 1, canvasState.flipY ? -1 : 1);
          oCtx.translate(canvasState.translateX, canvasState.translateY);
          oCtx.drawImage(tempMaskCanvas, -sourceWidth / 2, -sourceHeight / 2);
          oCtx.restore();
        } else {
          oCtx.save();
          oCtx.translate(highResCenterX, highResCenterY);
          oCtx.rotate((canvasState.rotation * Math.PI) / 180);
          oCtx.scale(canvasState.flipX ? -1 : 1, canvasState.flipY ? -1 : 1);
          oCtx.translate(canvasState.translateX, canvasState.translateY);
          oCtx.drawImage(this.maskCanvas, -sourceWidth / 2, -sourceHeight / 2);
          oCtx.restore();
        }

        // Restore compositing mode
        oCtx.globalCompositeOperation = 'source-over';
      }

      oCtx.restore();

      // ===== Part 7: WebGL Filter Pass at Full Resolution =====
      // Create an offscreen WebGL canvas for the filter pass
      const webglCanvas = document.createElement('canvas');
      webglCanvas.width = sourceWidth;
      webglCanvas.height = sourceHeight;
      const gl = webglCanvas.getContext('webgl2', {
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
      });

      if (gl) {
        this.applyFiltersGL(gl, offscreenCanvas, filterState);
      }
      // If WebGL2 not available for offscreen, filters are skipped for export
      // (the 2D canvas already has the un-filtered image which is better than nothing)

      // ===== Part 9: Generate Blob =====
      // Use the WebGL canvas if filters were applied, otherwise use the 2D canvas
      const exportCanvas = gl ? webglCanvas : offscreenCanvas;

      const blob = await new Promise<Blob>((resolve, reject) => {
        exportCanvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to generate export blob'));
          },
          opts.format,
          opts.quality
        );
      });

      return blob;
    } finally {
      // ===== Part 10: Cleanup =====
      this.isExporting = false;
    }
  }

  /**
   * Applies the WebGL filter pipeline to the offscreen canvas at full resolution.
   * Part 7 implementation: duplicates Phase 2 shaders on an offscreen context.
   */
  private applyFiltersGL(
    gl: WebGL2RenderingContext,
    sourceCanvas: HTMLCanvasElement,
    filterState: FilterState
  ): void {
    // Vertex shader (same as Phase 2)
    const vertexSrc = `#version 300 es
      in vec2 a_position;
      in vec2 a_texCoord;
      out vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }`;

    // Fragment shader with brightness/contrast/saturation (same as Phase 2)
    const fragmentSrc = `#version 300 es
      precision mediump float;
      in vec2 v_texCoord;
      out vec4 outColor;
      uniform sampler2D u_image;
      uniform sampler2D u_mask;
      uniform float u_brightness;
      uniform float u_contrast;
      uniform float u_saturation;
      uniform float u_lightAngle;
      uniform float u_lightIntensity;
      const float PI = 3.14159265359;
      void main() {
        vec4 color = texture(u_image, v_texCoord);
        color.rgb += u_brightness;
        color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;
        float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
        color.rgb = mix(vec3(luminance), color.rgb, u_saturation);
        
        float maskAlpha = texture(u_mask, v_texCoord).a;
        if (maskAlpha >= 0.1) {
          float rad = u_lightAngle * (PI / 180.0);
          vec2 lightDir = vec2(cos(rad), sin(rad));
          vec2 lightOrigin = vec2(0.5) + lightDir * 0.5;
          float dist = distance(v_texCoord, lightOrigin);
          float intensityMultiplier = smoothstep(1.0, 0.0, dist) * (u_lightIntensity / 100.0);
          color.rgb += intensityMultiplier;
        }
        
        color.rgb = clamp(color.rgb, 0.0, 1.0);
        outColor = color;
      }`;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexSrc);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentSrc);
    gl.compileShader(fs);

    // Link program
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Clean up shaders
    gl.detachShader(program, vs);
    gl.detachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    // Geometry: screen quad
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    const texCoords = new Float32Array([
      0, 1, 1, 1, 0, 0,
      0, 0, 1, 1, 1, 0,
    ]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture: upload the 2D canvas as a WebGL texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);

    // Texture 1: upload the AI mask as a secondary WebGL texture
    const maskTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, maskTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (this.maskCanvas) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.maskCanvas);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]));
    }

    // Set uniforms
    gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0);
    gl.uniform1i(gl.getUniformLocation(program, 'u_mask'), 1);
    gl.uniform1f(gl.getUniformLocation(program, 'u_brightness'), filterState.brightness);
    gl.uniform1f(gl.getUniformLocation(program, 'u_contrast'), filterState.contrast);
    gl.uniform1f(gl.getUniformLocation(program, 'u_saturation'), filterState.saturation);
    gl.uniform1f(gl.getUniformLocation(program, 'u_lightAngle'), filterState.lightAngle);
    gl.uniform1f(gl.getUniformLocation(program, 'u_lightIntensity'), filterState.lightIntensity);

    // Render
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // ===== Part 10: VRAM cleanup =====
    gl.deleteTexture(texture);
    gl.deleteTexture(maskTexture);
    gl.deleteBuffer(posBuf);
    gl.deleteBuffer(texBuf);
    gl.deleteProgram(program);
  }

  /**
   * Triggers the browser download for a Blob.
   * Part 9 implementation: creates an anchor element, clicks it, then removes it.
   */
  public static downloadBlob(blob: Blob, filename: string = 'edited-masterpiece.png'): void {
    const exportUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = exportUrl;

    // Append briefly, click, then remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Revoke the object URL to free memory
    URL.revokeObjectURL(exportUrl);
  }
}