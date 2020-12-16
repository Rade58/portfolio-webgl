const glsl = require("glslify");

export default glsl(/* glsl */ `

    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');


    varying vec3 vPosition;
    varying vec2 vUv;

    uniform float time;

    uniform float deformation;


    void main() {

      vec2 center = vec2(0.5, 0.5);

      vec2 pos = mod(vPosition.yy * 24.0, 1.0);


      float d = distance(pos, center);
      float mask = step(sin(time * 3.14 + vPosition.y) * 0.2, d);
      mask = 1.0 - mask;


      gl_FragColor = vec4(mix(vec3(0.6 * vUv.y, 0.2 * vUv.y, 0.4), vec3(1.0), mask), 1.0);

    }


  `);
