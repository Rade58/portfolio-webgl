const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing");

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
