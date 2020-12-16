const glsl = require("glslify");
export default glsl(/* glsl */ `

    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');


    varying vec3 vPosition;
    varying vec2 vUv;

    uniform float time;

    uniform float deformation;


    void main() {


      gl_FragColor = vec4(vec3(0.2, vUv.y * 0.4, 0.6), 1.0);

    }


  `);
