const glsl = require("glslify");

export default glsl(/* glsl */ `

    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');


    varying vec3 vPosition;
    varying vec2 vUv;

    uniform float time;

    uniform float deformation;

    uniform mat4 modelMatrix;
    float sphereRim (vec3 spherePosition) {
      vec3 normal = normalize(spherePosition.xyz);
      vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
      vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
      vec3 V = normalize(cameraPosition - worldPosition);
      float rim = 1.0 - max(dot(V, worldNormal), 0.0);
      return pow(smoothstep(0.0, 1.0, rim), 0.5);
    }


    void main() {


      vec3 fragColor = mix(vec3(0.6 * vPosition.y, 0.2 * vPosition.y, 0.4 * vPosition.y), vec3(0.8, 0.4 * sin(vPosition.y), 0.4), 1.0);

      float rim = sphereRim(vPosition);

      fragColor += rim * 0.48;

      gl_FragColor = vec4(fragColor, 1.0);

    }


  `);
