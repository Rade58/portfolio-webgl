const glsl = require("glslify");

export default glsl(/* glsl */ `

    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');
    #pragma glslify: hslToRgb = require('glsl-hsl2rgb');

    varying vec3 vPosition;
    varying vec2 vUv;

    uniform float time;

    void main() {

      //  color noise
      float noiseForColor = noise(vec3(center * 1.8, time));




      vec3 color = vec3(0.0, 0.0, 0.0);

      vec3 color2 = color + vec3(0.8) * 0.25;

      color2.x = sin(vUv.y);

      color2 = color2 + vUv.xyy;


      // -----------------  OVO JE RELEVANT, SVE OKO OVOGA JE NEKA VEZBA  ------------------------
      // CENTAR GRADIENT-A


      vec2 center = vec2(0.5, 0.5);

      // VECI BROJ KRUGOVA
      vec2 pos = mod(vUv * 24.0, 1.0);


      // DISTANCE
      float d = distance(pos, center);

      // MASKING USTVARI PRAVI TAKVO STANJE DA JE GRADIENT GRANICA, ODNOSNO COLOR STOP
      // USTVARI JASNO VIDLJIVA LINIJA, DAKLE COLOR STOP NIJE GRADUAL VEC JASAN TAKORECI

      // d = 0.5 - d;  // DA UCINIM DA IMAM BELE KRUGOVE NA CRNOJ POZADINI
                    // DAKORISTIS SAMO d IMAO BI CRNE KRUGOVE
                    // ALI MOGU DA KORISTIM I   mask = 1.0 - mask


      float mask = step(0.01, d);

      mask = 1.0 - mask;   // EVO OVO TI JE UPRAVO BILO TO DA INVERT-UJES
                           // DA MESH BUDE CRN SA BELIM GRADIENT KRUGOVIMA

      vec3 myColor = vec3(mask);

      //
      // -----------------------------------------
      // vec3 col = vec3(d) /* * vec3(0.2, 0.3, 0.6) + 0.1 */;



      vec3 noiseColor = hslToRgb(0.1 * n, 0.2 *n, 0.4)


      gl_FragColor = vec4(mix(myColor, noiseColor), 1.0);

    }


  `);
