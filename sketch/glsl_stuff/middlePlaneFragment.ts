const glsl = require("glslify");

export default glsl(/* glsl */ `

  #pragma glslify: aastep = require('glsl-aastep');

  #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

  varying vec3 vPosition;

  varying vec2 vUv;

  uniform float time;

  uniform vec3 color;

  uniform float circleSize;


  uniform mat4 modelMatrix;

  float sphereRim (vec3 spherePosition) {
    vec3 normal = normalize(spherePosition.xyz);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
    vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
    vec3 V = normalize(cameraPosition - worldPosition);
    float rim = 1.0 - max(dot(V, worldNormal), 0.0);
    return pow(smoothstep(0.0, 1.0, rim), 0.5);
  }


  void main () {


    float rim = sphereRim(vPosition);


    vec3 fragColor = vec3(vUv.x * 0.1);

    vec2 center = vec2(0.5, 0.5);
    vec2 pos = mod(vUv * 1.0, 1.0);

    float d = distance(pos, center);

    float mask = aastep(circleSize * 0.05, d);   // ANIMIRANO SA time
    // float mask = aastep(circleSize * 0.41, d);   // ANIMIRANO SA time

    // float mask = aastep(0.08, d);  // NIJE ANIMIRANO

    if(mask < 0.5) discard;

    // vec3 col = mix(vec3(0.6), color,mask);
    vec3 col = mix(vec3(0.4, sin(vUv.x * 0.4), 0.6), vec3(0.28, 0.28, sin(vUv.x * 0.8)),mask);

    col += rim * 0.068;


    gl_FragColor = vec4(col, 1.0);
  }

`);
