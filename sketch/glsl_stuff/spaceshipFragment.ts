import glsl from "glslify";

export default glsl(/* glsl */ `
  #pragma glslify: noise = require(glsl-noise/simplex/3d)

  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float time;


  uniform mat4 modelMatrix;
  float sphereRim (vec3 spherePosition) {
    vec3 normal = normalize(spherePosition.xyz);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
    vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
    vec3 V = normalize(cameraPosition - worldPosition);
    float rim = 1.0 - max(dot(V, worldNormal), 0.0);
    return pow(smoothstep(0.0, 1.0, rim), 0.5);
  }


  void main(){

    vec2 center = vec2(0.5,0.5);

    vec2 q = vPosition.xz;

    q.x *= 1.2;
    q.y *= 1.2;

    // UMESTO vUv PROSLEDIO q

    vec2 pos = mod(q * 2.0, 1.0);

    float d = distance(pos,center);


    // float mask = step(0.18 + sin(time + vUv.y * 4.8) * 0.18, d);

    vec2 noiseInput = floor(q * time * 0.6);

    // MNOZIM OVDE SA MALIM BROJEM NA KRAJU ZBOG DRASTICNOG OFFSET-A, USTVARI SCALE-UJEM NOISE DOWN

    float offset = noise(vec3(noiseInput.yy, time)) * 0.18;

    float mask = smoothstep(0.24 + offset, 0.38 + offset, d);

    mask = 1.0 - mask;

    if(mask > 0.5) discard;

    float rim = sphereRim(vPosition);

    vec3 interpolated = mix(vec3(0.2,0.3,0.6), vec3(0.6, 0.4, 0.8),mask);

    interpolated += rim * 0.2;

    gl_FragColor = vec4(vec3(interpolated), 1.0);
  }
`);
