import glsl from "glslify";

export default glsl(/* glsl */ `
  varying vec2 vUv;

  void main () {
    vec3 fragColor = vec3(vUv.x);
    gl_FragColor = vec4(fragColor, 1.0);
  }
`);
