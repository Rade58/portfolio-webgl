const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing");

export default glsl(/* glsl */ `
  varying vec2 vUv;

  void main () {
    vec3 fragColor = vec3(vUv.x);
    gl_FragColor = vec4(fragColor, 1.0);
  }
`);
