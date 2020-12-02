const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");
const settings = {
    animate: true,
    context: "webgl",
    duration: 28,
};
const settingsFunc = (settings, canvas) => {
    if (canvas) {
        settings.canvas = canvas;
    }
    return settings;
};
const sketch = ({ context }) => {
    // RENDERER AND SCENE
    const renderer = new global.THREE.WebGLRenderer({ canvas: context.canvas });
    renderer.setClearColor("#000");
    const scene = new global.THREE.Scene();
    //
    // GEOMETRY MATERIAL AND MESH
    const boxGeometry = new global.THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    //
    const boxMaterial = new global.THREE.MeshNormalMaterial({
    // color: "crimson",
    // wireframe: true,
    });
    const boxMesh = new global.THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(boxMesh);
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    const color1 = new global.THREE.Color("crimson");
    const icoPosition = new global.THREE.Vector3(0, 0, 0);
    icoPosition.setScalar(2);
    const icosahedronGeometry = new global.THREE.IcosahedronGeometry(1, 1);
    const icosahedronMaterial = new global.THREE.MeshStandardMaterial({
        color: "purple",
        flatShading: true,
    });
    const icosahMesh = new global.THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    const colorVec3 = new global.THREE.Vector3(0.4, 0.6, 0.8);
    icosahedronMaterial.color.copy(color1);
    icosahedronMaterial.color.setScalar(0.8);
    icosahedronMaterial.color.r = 0.1;
    icosahedronMaterial.color.g = 0.4;
    icosahedronMaterial.color.b = 0.6;
    icosahedronMaterial.color.setHSL(0.4, 0.6, 0.8);
    icosahMesh.position.copy(icoPosition);
    icosahMesh.position.set(2, 0, 0);
    const coords = [-2, 2, -2];
    icosahMesh.position.fromArray(coords);
    icosahMesh.rotation.y = 2;
    const rotationEuler = new global.THREE.Euler(8, 3 * 3.14 - 1, 0);
    icosahMesh.rotation.copy(rotationEuler);
    icosahMesh.scale.x = 2;
    // scene.add(icosahMesh);
    // console.log(icosahMesh.position.toArray());
    // ----------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------
    //                  ------------------------------
    const vShad = glsl(/* glsl */ `

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
    const fShad = glsl(/* glsl */ `

    varying vec3 vPosition;
    varying vec2 vUv;

    uniform vec3 crimson;
    uniform float time;



    void main() {


      vec3 color = vec3(0.0, 0.0, 0.0);

      vec3 color2 = color + vec3(0.8) * 0.25;

      color2.x = sin(vUv.y);

      color2 = color2 + vUv.xyy;


      // -----------------  CIRCULAR GRADIENT, COLOR INTERPOLATION, ADDING TIME AND SOME COLOR AS UNIFORMS  ----
      // -----------------  MAKING ANIMATED GRADIENTS WITH sin AND cos -----------------------------------------

      vec2 center = vec2(0.5, 0.5);


      vec2 pos = mod(vUv * 6.0, 1.0);

      float d = distance(pos, center);

      // d = 0.5 - d;

      // ANIMIRAM VELICINU KRUGA, DODAJEM NEKE ANIMIRANE VREDNOSTI NA 0.25 VREDNOST
      // PAZIM DA KRUG NE UCINIM TOO BIG, SVE MNOZIM ZA BROJEM ISPOD NULE


      // VIDIS KAKO SAM MNOZIO SA VELIKIM BROJEM U SINUSNOJ FUNKCIJI
      // NE ZNAM ZASTO ALI STO JE VECI BROJ IMACES NEKI EFEKAT POPUT LAVALAMP-A; PREDPOSTAVLJAM USTAVRI DA JE TO ZATO STO SE
      // KRUGOVI PREKLAPAJU

      float mask = step(0.25 + sin(time + vUv.y * 16.58) * 0.18, d);

      // mask = 1.0 - mask;

      // vec3 myColor = vec3(mask);


      // ADDING UNIFORM COLOR FOR INTERPOLATION
      // ZELIM CRIMSON CUBE A BELE KRUGOVE

      vec3 myColor = mix(vec3(1.0), crimson, mask);  // OPET CU IMATI BELE KRUGOVE NA CRNOM BACKGROUNDU




      gl_FragColor = vec4(myColor, 1.0);

    }


  `);
    // -------------------------------------------------------------
    const shaderMat = new global.THREE.ShaderMaterial({
        vertexShader: vShad,
        fragmentShader: fShad,
        uniforms: {
            time: { value: 0 },
            crimson: { value: new global.THREE.Color("crimson") },
        },
    });
    const boxM = new global.THREE.Mesh(boxGeometry, shaderMat);
    boxM.scale.setScalar(2.4);
    scene.add(boxM);
    boxM.position.y = 1.4;
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(6, 3, 3);
    camera.lookAt(new global.THREE.Vector3());
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    //
    // ----------------------------------------------------------------
    // ---------------------- LIGHT, HELPERS --------------------------
    const light = new global.THREE.PointLight("white", 1);
    light.position.y = 9;
    light.position.z = 9;
    scene.add(light);
    // helpers
    scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
    scene.add(new global.THREE.AxesHelper(4));
    scene.add(new global.THREE.PointLightHelper(light));
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    return {
        // Handle resize events here
        resize({ pixelRatio, viewportWidth, viewportHeight }) {
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(viewportWidth, viewportHeight, false);
            camera.aspect = viewportWidth / viewportHeight;
            camera.updateProjectionMatrix();
        },
        // Update & render your scene here
        render({ time, playhead }) {
            // ---------------------------------------------
            shaderMat.uniforms.time.value = time;
            // ---------------------------------------------
            controls.update();
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload() {
            controls.dispose();
            renderer.dispose();
        },
    };
};
canvasSketch(sketch, settingsFunc(settings, document.querySelector("canvas.canvas")));
export {};
