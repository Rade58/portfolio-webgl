const glsl = require("glslify");

export default glsl(/* glsl */ `


#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    uniform float time;
    float amplitude = 0.4;
    float frequency = 0.48;
    //




    void main () {
      vPosition = position;
      vUv = uv;


      float stretch = -sin(time * 3.14) * 6.2;

      vec3 transformedPos = position.xyz;


      float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      transformedPos.x += noize4d;
      transformedPos.z += noize4d;
      transformedPos.y += noize4d;

            /*
       transformedPos.x += noize3d;
       transformedPos.z += noize3d;
       transformedPos.y += noize3d;
            */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }
`);
