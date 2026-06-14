// src/core/WebGLFilter.ts
/**
 * WebGLFilter – Phase 2 GPU-accelerated filter pipeline.
 *
 * Creates a WebGL2 rendering context on a dedicated <canvas> element.
 * Binds the source image as a 2D texture and applies brightness,
 * contrast, and saturation via GLSL fragment shaders.
 *
 * The filter uniform values are read directly from a plain JS object
 * (bypassing React state) so that slider updates never trigger
 * framework re-renders.
 */

import type { FilterUniforms } from './types';

// ── GLSL Shaders ──────────────────────────────────────────────────────

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;
out vec2 v_texCoord;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_texture;
uniform float u_brightness; // -1 .. 1
uniform float u_contrast;   //  0 .. 3  (1 = neutral)
uniform float u_saturation; //  0 .. 3  (1 = neutral)

void main() {
  vec4 color = texture(u_texture, v_texCoord);

  // --- Brightness (additive) ---
  color.rgb += u_brightness;

  // --- Contrast (scale around 0.5) ---
  color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;

  // --- Saturation (distance from perceptual luminance) ---
  float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  color.rgb = mix(vec3(luminance), color.rgb, u_saturation);

  outColor = color;
}
`;

// ── Static geometry (full-screen quad) ───────────────────────────────

/** Two triangles covering clip-space [-1,1] with texture coords [0,1]. */
const QUAD_VERTICES = new Float32Array([
  // position   |  texCoord
  -1, -1,         0, 0,
   1, -1,         1, 0,
  -1,  1,         0, 1,

  -1,  1,         0, 1,
   1, -1,         1, 0,
   1,  1,         1, 1,
]);

// ── Helper ───────────────────────────────────────────────────────────

function compileShader(
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

// ── WebGLFilter class ────────────────────────────────────────────────

export class WebGLFilter {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private texture: WebGLTexture | null = null;
  private animFrameId: number = 0;

  // Uniform locations (cached for speed)
  private uBrightnessLoc: WebGLUniformLocation;
  private uContrastLoc: WebGLUniformLocation;
  private uSaturationLoc: WebGLUniformLocation;

  /** The plain JS object that sliders write into directly.  Read every frame. */
  public uniforms: FilterUniforms = {
    brightness: 0,
    contrast: 1,
    saturation: 1,
  };

  /** Set to false to pause the render loop. */
  public running = true;

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) throw new Error('WebGL2 not available');
    this.gl = gl;

    // Compile shaders & link program
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;

    // Cache uniform locations
    this.uBrightnessLoc = this.getUniform('u_brightness');
    this.uContrastLoc = this.getUniform('u_contrast');
    this.uSaturationLoc = this.getUniform('u_saturation');

    // Setup static geometry (full-screen quad)
    this.setupQuad();

    // Start render loop
    this.animFrameId = requestAnimationFrame(() => this.renderLoop());
  }


  /* ─── public API ─────────────────────────────────────────────── */

  /**
   * Upload a new source image as a WebGL texture.
   * Call this whenever the user loads a new asset or after an
   * AI pipeline modifies the pixel data.
   */
  updateTexture(source: HTMLImageElement | ImageData | HTMLCanvasElement): void {
    const gl = this.gl;
    if (!this.texture) {
      this.texture = gl.createTexture()!;
    }

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // Always use linear filtering for smooth zoom
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (source instanceof HTMLImageElement || source instanceof HTMLCanvasElement) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    } else {
      // ImageData — use the smaller overload
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,
        (source as ImageData).width, (source as ImageData).height, 0,
        gl.RGBA, gl.UNSIGNED_BYTE,
        source.data,
      );
    }
  }

  /** Resize the canvas backing store to match display size. */
  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  /** Clean up GPU resources and stop the animation loop. */
  dispose(): void {
    this.running = false;
    cancelAnimationFrame(this.animFrameId);
    const gl = this.gl;
    if (this.texture) gl.deleteTexture(this.texture);
    gl.deleteProgram(this.program);
  }


  /* ─── internal ──────────────────────────────────────────────── */

  private getUniform(name: string): WebGLUniformLocation {
    const loc = this.gl.getUniformLocation(this.program, name);
    if (loc === null) throw new Error(`Uniform "${name}" not found`);
    return loc;
  }

  private setupQuad(): void {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

    const stride = 4 * Float32Array.BYTES_PER_ELEMENT; // 4 floats per vertex (pos2+tex2)
    const posLoc = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);

    const texLoc = gl.getAttribLocation(this.program, 'a_texCoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);
  }

  private renderLoop(): void {
    if (!this.running) return;
    const gl = this.gl;

    gl.useProgram(this.program);

    // Bind texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.getUniformLocation(this.program, 'u_texture'), 0);

    // Push current slider values directly to GPU (no React involvement)
    gl.uniform1f(this.uBrightnessLoc, this.uniforms.brightness);
    gl.uniform1f(this.uContrastLoc, this.uniforms.contrast);
    gl.uniform1f(this.uSaturationLoc, this.uniforms.saturation);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    this.animFrameId = requestAnimationFrame(() => this.renderLoop());
  }
}