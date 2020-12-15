const glsl = require("glslify");

export default glsl(/* glsl */ `

  #pragma glslify: hslToRgb = require('glsl-hsl2rgb');
  #pragma glslify: noise = require('glsl-noise/simplex/3d');


  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float playhead;

  void main () {

    vec2 center = vUv - 0.5;

    float dist = length(center);

    float alpha = smoothstep(16.0 * 0.486, 0.48, dist);

    float n = noise(vec3(center * 2.2, sin(playhead * 3.14) * 0.68));

    vec3 color = hslToRgb(
      0.8 + n * 0.18,
      0.68,
      0.6
    );

    gl_FragColor = vec4(color, alpha);


  }
`);
