export const particleVertexShader = `
uniform float uTime;
uniform float uPixelRatio;
uniform vec2 uMouse;

attribute float aScale;
attribute float aRandom;
attribute vec3 aVelocity;

varying vec2 vUv;
varying float vAlpha;
varying float vRandom;

void main() {
  vUv = uv;
  vRandom = aRandom;

  vec3 pos = position;

  // Gentle orbital and upward floating motion
  pos.y += sin(uTime * 0.4 + aRandom * 6.28) * 0.15 + (uTime * 0.05 * (1.0 + aRandom));
  pos.x += cos(uTime * 0.3 + aRandom * 6.28) * 0.12 + (uMouse.x * 0.1 * aRandom);
  pos.z += sin(uTime * 0.2 + aRandom * 3.14) * 0.08 + (uMouse.y * 0.05 * aRandom);

  // Wrap around viewport box [-5, 5]
  pos.y = mod(pos.y + 5.0, 10.0) - 5.0;
  pos.x = mod(pos.x + 5.0, 10.0) - 5.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Distance attenuation
  gl_PointSize = (aScale * uPixelRatio * 30.0) / -mvPosition.z;

  // Shimmering alpha pulse
  vAlpha = 0.35 + 0.65 * sin(uTime * 1.5 + aRandom * 12.0);
}
`;

export const particleFragmentShader = `
precision mediump float;

uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying float vAlpha;
varying float vRandom;

void main() {
  // Circular point with soft halo
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  if (dist > 0.5) {
    discard;
  }

  // Soft glow falloff
  float glow = smoothstep(0.5, 0.05, dist);

  // Blend between golden champagne and rose gold
  vec3 col = mix(uColorA, uColorB, vRandom);

  gl_FragColor = vec4(col, glow * vAlpha * 0.75);
}
`;
