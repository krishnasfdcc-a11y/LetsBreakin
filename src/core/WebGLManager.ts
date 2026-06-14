/**
 * WebGLManager - Hardware-accelerated WebGL2 filter pipeline.
 *
 * Renders the Phase 1 offscreen canvas content through a GPU shader pipeline
 * that applies real-time color grading (brightness, contrast, saturation).
 *
 * Architecture:
 * - Phase 1 canvas (offscreen, opacity: 0) handles transformations (pan/zoom/rotate)
 * - WebGL canvas sits above, sampling Phase 1 as a texture each frame
 * - Filter state uses a plain JS object to bypass React re-render cycles
 * - Dedicated requestAnimationFrame loop independent from Phase 1
 */

import { CanvasManager } from './CanvasManager';

export interface FilterState {
  brightness: number; // -1.0 to 1.0, default 0.0
  contrast: number;   // 0.0 to 3.0, default 1.0
  saturation: number; // 0.0 to 3.0, default 1.0
  lightAngle: number; // 0.0 to 360.0, default 0.0
  lightIntensity: number; // 0.0 to 100.0, default 0.0
}

// ===================== GLSL Shader Sources =====================

const vertexShaderSource = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

const fragmentShaderSource = `#version 300 es
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
  // Extract the baseline pixel data from the texture
  vec4 color = texture(u_image, v_texCoord);

  // Brightness: add uniform offset to RGB channels
  color.rgb += u_brightness;

  // Contrast: scale around the midpoint (0.5)
  color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;

  // Perceptual grayscale luminance (ITU-R BT.709)
  float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;

  // Saturation: mix luminance vector with current color
  color.rgb = mix(vec3(luminance), color.rgb, u_saturation);

  // Feature 1.3: AI Portrait Relighting (Mask-based hardware acceleration)
  float maskAlpha = texture(u_mask, v_texCoord).a;
  if (maskAlpha >= 0.1) {
    // Convert user angle to radians
    float rad = u_lightAngle * (PI / 180.0);
    // Compute 2D directional light vector
    vec2 lightDir = vec2(cos(rad), sin(rad));
    // Calculate spatial distance from simulated light source origin
    vec2 lightOrigin = vec2(0.5) + lightDir * 0.5;
    float dist = distance(v_texCoord, lightOrigin);
    // Apply radial intensity falloff formula
    float intensityMultiplier = smoothstep(1.0, 0.0, dist) * (u_lightIntensity / 100.0);
    color.rgb += intensityMultiplier;
  }

  // Clamp to prevent artifacting
  color.rgb = clamp(color.rgb, 0.0, 1.0);

  // Output the final pixel
  outColor = color;
}
`;

export class WebGLManager {
  // Canvas references
  private phase1Canvas: HTMLCanvasElement;
  private webglCanvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;

  // WebGL resources
  private program: WebGLProgram | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;
  private texture: WebGLTexture | null = null;
  private maskTexture: WebGLTexture | null = null;

  // Uniform locations
  private imageLoc: WebGLUniformLocation | null = null;
  private maskLoc: WebGLUniformLocation | null = null;
  private brightLoc: WebGLUniformLocation | null = null;
  private contrastLoc: WebGLUniformLocation | null = null;
  private satLoc: WebGLUniformLocation | null = null;
  private lightAngleLoc: WebGLUniformLocation | null = null;
  private lightIntensityLoc: WebGLUniformLocation | null = null;

  // Attribute locations
  private positionLoc: number = -1;
  private texCoordLoc: number = -1;

  // Render loop
  private animationFrameId: number | null = null;
  private needsRender: boolean = true;

  // CanvasManager reference for resize synchronization
  private canvasManager: CanvasManager | null = null;

  /**
   * Plain, non-reactive JavaScript object for filter state.
   * Updated directly by UI sliders to bypass frontend framework re-render cycles.
   */
  public filterState: FilterState = {
    brightness: 0.0,
    contrast: 1.0,
    saturation: 1.0,
    lightAngle: 0.0,
    lightIntensity: 0.0,
  };

  constructor(phase1Canvas: HTMLCanvasElement, webglCanvas: HTMLCanvasElement) {
    this.phase1Canvas = phase1Canvas;
    this.webglCanvas = webglCanvas;

    this.initWebGL();
    this.initShaders();
    this.initGeometry();
    this.initTexture();
    this.startRenderLoop();
  }

  /**
   * Optionally attach a CanvasManager to synchronize resize events.
   */
  public setCanvasManager(manager: CanvasManager): void {
    this.canvasManager = manager;
  }

  // ===================== Part 2: WebGL Context Initialization =====================

  private initWebGL(): void {
    // Attempt to extract WebGL2 context first
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null =
      this.webglCanvas.getContext('webgl2', {
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });

    // Fallback to WebGL1 if WebGL2 is unavailable
    if (!gl) {
      gl = this.webglCanvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      }) as WebGLRenderingContext | null;
    }

    // Fallback to experimental WebGL
    if (!gl) {
      gl = this.webglCanvas.getContext('experimental-webgl', {
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      }) as WebGLRenderingContext | null;
    }

    if (!gl) {
      throw new Error(
        'WebGL is not supported by this browser. ' +
        'Please use a modern browser that supports WebGL to use the image editor.'
      );
    }

    this.gl = gl;

    // Match internal pixel dimensions to parent container
    this.syncCanvasDimensions();

    // Map the WebGL coordinate system to the canvas size
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Set default clear color to transparent black
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // Enable blending to handle transparent PNGs
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  /**
   * Synchronizes the WebGL canvas pixel dimensions with the phase1 canvas.
   */
  private syncCanvasDimensions(): void {
    if (!this.gl) return;

    this.webglCanvas.width = this.phase1Canvas.width;
    this.webglCanvas.height = this.phase1Canvas.height;

    this.webglCanvas.style.width = this.phase1Canvas.style.width;
    this.webglCanvas.style.height = this.phase1Canvas.style.height;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  // ===================== Part 3 & 4: Shader Compilation =====================

  /**
   * Helper method to compile a shader from source.
   */
  private compileShader(
    gl: WebGL2RenderingContext | WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('Failed to create shader object');
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Check for compilation errors
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const infoLog = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compilation failed: ${infoLog}`);
    }

    return shader;
  }

  // ===================== Part 5: Program Linking & Memory Cleanup =====================

  private initShaders(): void {
    const gl = this.gl;
    if (!gl) return;

    // Compile vertex shader
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

    // Compile fragment shader
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create the master GPU program
    const program = gl.createProgram();
    if (!program) {
      throw new Error('Failed to create WebGL program');
    }

    // Attach compiled shaders
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Link the program to the GPU pipeline
    gl.linkProgram(program);

    // Verify the linking process
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      const infoLog = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program linking failed: ${infoLog}`);
    }

    // Instruct the GPU to utilize this program
    gl.useProgram(program);

    // Immediately detach shaders
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);

    // Delete raw shaders from GPU memory to prevent leaks
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    this.program = program;

    // Extract uniform locations
    this.brightLoc = gl.getUniformLocation(program, 'u_brightness');
    this.contrastLoc = gl.getUniformLocation(program, 'u_contrast');
    this.satLoc = gl.getUniformLocation(program, 'u_saturation');
    this.lightAngleLoc = gl.getUniformLocation(program, 'u_lightAngle');
    this.lightIntensityLoc = gl.getUniformLocation(program, 'u_lightIntensity');
    this.imageLoc = gl.getUniformLocation(program, 'u_image');
    this.maskLoc = gl.getUniformLocation(program, 'u_mask');

    // Extract attribute locations
    this.positionLoc = gl.getAttribLocation(program, 'a_position');
    this.texCoordLoc = gl.getAttribLocation(program, 'a_texCoord');
  }

  // ===================== Part 6: Geometry (Screen Quad) =====================

  private initGeometry(): void {
    const gl = this.gl;
    if (!gl || !this.program) return;

    // ----- Position Buffer (2 triangles covering the canvas) -----
    // Coordinates from -1.0 to 1.0 forming a perfect rectangle
    const positions = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      throw new Error('Failed to create position buffer');
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    this.positionBuffer = positionBuffer;

    // Enable and configure the position attribute
    gl.enableVertexAttribArray(this.positionLoc);
    gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);

    // ----- Texture Coordinate Buffer (UV mapping) -----
    // Maps 0.0 to 1.0 corners matching the screen quad
    const texCoords = new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0,
    ]);

    const texCoordBuffer = gl.createBuffer();
    if (!texCoordBuffer) {
      throw new Error('Failed to create texture coordinate buffer');
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    this.texCoordBuffer = texCoordBuffer;

    // Enable and configure the texture coordinate attribute
    gl.enableVertexAttribArray(this.texCoordLoc);
    gl.vertexAttribPointer(this.texCoordLoc, 2, gl.FLOAT, false, 0, 0);
  }

  // ===================== Part 7: Texture Generation =====================

  private initTexture(): void {
    const gl = this.gl;
    if (!gl) return;

    const texture = gl.createTexture();
    if (!texture) {
      throw new Error('Failed to create WebGL texture');
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture wrap parameters to prevent repeating edge pixels
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Set filters to linear for smooth zooming
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    this.texture = texture;

    this.maskTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Perform initial texture upload
    this.updateTexture();
  }

  /**
   * Copies pixel state from the Phase 1 offscreen canvas directly into GPU VRAM.
   * Must be called after every pan, zoom, rotate, or image change in Phase 1.
   */
  public updateTexture(): void {
    const gl = this.gl;
    if (!gl || !this.texture) return;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    // Check if the phase1 canvas has actual dimensions and content
    if (this.phase1Canvas.width === 0 || this.phase1Canvas.height === 0) {
      // Upload a 1x1 transparent pixel as placeholder
      const placeholder = new Uint8Array([0, 0, 0, 0]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, placeholder);
      return;
    }

    // This single, critical command copies the pixel state from the Phase 1
    // offscreen canvas directly into GPU VRAM
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,                // mip level
      gl.RGBA,          // internal format
      gl.RGBA,          // source format
      gl.UNSIGNED_BYTE, // source type
      this.phase1Canvas // source: the offscreen canvas element
    );

    this.needsRender = true;
  }

  /**
   * Uploads the AI mask to a secondary GPU texture unit for Relighting compositing.
   */
  public updateMaskTexture(maskCanvas: HTMLCanvasElement | null): void {
    const gl = this.gl;
    if (!gl || !this.maskTexture) return;

    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);

    if (!maskCanvas || maskCanvas.width === 0) {
      const placeholder = new Uint8Array([0, 0, 0, 0]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, placeholder);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);
    }
    this.needsRender = true;
  }

  /**
   * Synchronizes canvas dimensions when the parent container resizes.
   * Called from ResizeObserver or window resize handler.
   */
  public handleResize(): void {
    this.syncCanvasDimensions();
    this.updateTexture();
  }

  // ===================== Part 8: Dedicated GPU Render Loop =====================

  /**
   * The dedicated WebGL render loop, completely independent from Phase 1.
   * Runs at the monitor's refresh rate via requestAnimationFrame.
   */
  private startRenderLoop(): void {
    const renderLoop = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(renderLoop);
    };

    this.animationFrameId = requestAnimationFrame(renderLoop);
  }

  /**
   * Performs a single WebGL render pass.
   * - Clears buffers
   * - Pushes filter uniforms to the GPU
   * - Draws the screen quad (6 vertices = 2 triangles)
   */
  public render(): void {
    const gl = this.gl;
    if (!gl || !this.program) return;

    if (!this.needsRender) return;

    // Use the filter program
    gl.useProgram(this.program);

    // Clear the WebGL canvas buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.positionLoc);
    gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Bind the texture coordinate buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.enableVertexAttribArray(this.texCoordLoc);
    gl.vertexAttribPointer(this.texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    // Bind the primary image texture to TEXTURE0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.imageLoc, 0);

    // Bind the AI mask texture to TEXTURE1
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
    gl.uniform1i(this.maskLoc, 1);

    // Push current filter state values into GPU uniforms dynamically
    // These values come directly from the plain JS object, bypassing React
    gl.uniform1f(this.brightLoc, this.filterState.brightness);
    gl.uniform1f(this.contrastLoc, this.filterState.contrast);
    gl.uniform1f(this.satLoc, this.filterState.saturation);
    gl.uniform1f(this.lightAngleLoc, this.filterState.lightAngle);
    gl.uniform1f(this.lightIntensityLoc, this.filterState.lightIntensity);

    // Execute the final draw command: 6 vertices (2 triangles forming the full-screen quad)
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    this.needsRender = false;
  }

  /**
   * Requests a re-render. Called externally when filter state changes.
   */
  public requestRender(): void {
    this.needsRender = true;
  }

  // ===================== Cleanup =====================

  /**
   * Destroys all WebGL resources to prevent severe VRAM leaks.
   * Call when the component unmounts.
   */
  public destroy(): void {
    const gl = this.gl;
    if (!gl) return;

    // Stop the render loop
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Delete the GPU program
    if (this.program) {
      gl.deleteProgram(this.program);
      this.program = null;
    }

    // Delete buffers
    if (this.positionBuffer) {
      gl.deleteBuffer(this.positionBuffer);
      this.positionBuffer = null;
    }
    if (this.texCoordBuffer) {
      gl.deleteBuffer(this.texCoordBuffer);
      this.texCoordBuffer = null;
    }

    // Delete the texture (frees GPU VRAM)
    if (this.texture) {
      gl.deleteTexture(this.texture);
      this.texture = null;
    }

    if (this.maskTexture) {
      gl.deleteTexture(this.maskTexture);
      this.maskTexture = null;
    }
  }
}