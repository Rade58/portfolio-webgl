#pragma glslify: noise = require('glsl-noise/simplex/3d');


varying vec2 vUv;
varying vec3 vPosition;

uniform float time;


void main(){
  vUv = uv;
  vPosition = position;


  vec3 vert = position.xyz;


  float stretch = time;
  float amplitude = 0.16;
  float frequency = 1.22;



  float noizeTest = noise(vert);


  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * noizeTest, 1.0);

}
