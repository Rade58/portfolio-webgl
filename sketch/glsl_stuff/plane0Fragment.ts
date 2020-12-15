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

    float alpha = smoothstep(18.0 * 0.186, 0.18, dist);

    float n = noise(vec3(center * 1.8, sin(playhead * 3.14) * 0.38));

    vec3 color = hslToRgb(
      0.8 + n * 0.18,
      0.4,
      0.6
    );

    gl_FragColor = vec4(color, alpha);


  }
`);
