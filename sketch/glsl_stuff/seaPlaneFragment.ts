const glsl = require("glslify");

export default glsl(/* glsl */ `

  #pragma glslify: aastep = require('glsl-aastep');

  varying vec2 vUv;

  uniform float time;

  uniform float circleSize;



  void main () {
    vec3 fragColor = vec3(vUv.x * 0.1);

    vec2 center = vec2(0.5, 0.5);
    vec2 pos = mod(vUv * 2.0, 1.0);

    float d = distance(vUv.xy, center);

    float mask = aastep(circleSize * 0.041, d);   // ANIMIRANO SA time
    // float mask = aastep(0.1, d);  // NIJE ANIMIRANO

    if(mask < 0.5) discard;

    vec3 col = mix(vec3(0.8), vec3(0.8, vUv.y, vUv.x), mask);


    gl_FragColor = vec4(col, 1.0);
  }

`);
