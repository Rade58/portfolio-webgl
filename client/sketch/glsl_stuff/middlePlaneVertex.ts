const glsl = require("glslify");

export default glsl(/* glsl */ `

    #pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    // uniform float time;
    float amplitude = 0.78;
    float frequency = 0.38;
    //

    uniform float time;




    void main () {
      vPosition = position;
      vUv = uv;


      float stretch = time;

      vec3 transformedPos = position.xyz;


      // float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }

`);
