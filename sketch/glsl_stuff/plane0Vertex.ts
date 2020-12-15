const glsl = require("glslify");

export default glsl(/* glsl */ `

  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main () {
    vPosition = position;
    vUv = uv;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
  }

`);
