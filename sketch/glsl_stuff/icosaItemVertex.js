const glsl = require("glslify");
export default glsl(/* glsl */ `

    varying vec3 vPosition;
    varying vec2 vUv;


    void main(){

      vPosition = position;
      vUv = uv;
      /*
      vec3 transformed = position.xyz;

      transformed.xz -= 1.0;
      transformed.yz -= 0.2;
      */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    }


  `);
