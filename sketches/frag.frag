#pragma glslify: noise = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float time;


    void main(){


      float n = noise(vec3(1.0, 0.2, 0.1));


      gl_FragColor = vec4( 1.0, 0.8, 1.0, 1.0);

    }
