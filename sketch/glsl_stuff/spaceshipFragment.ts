import glsl from "glslify";

export default glsl(/* glsl */ `
  #pragma glslify: noise = require(glsl-noise/simplex/3d)

  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float time;

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

    float offset = noise(vec3(noiseInput.xx, time)) * 0.18;

    float mask = smoothstep(0.34 + offset, 0.35 + offset, d);

    mask = 1.0 - mask;



    vec3 interpolated = mix(vec3(0.2,0.3,0.6), vec3(0.6, 0.4, 0.8),mask);

    gl_FragColor = vec4(vec3(interpolated), 1.0);
  }
`);
