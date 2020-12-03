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
    const icosaGeometry = new global.THREE.IcosahedronGeometry(2, 1);
    const icoMaterial = new global.THREE.MeshNormalMaterial({
        flatShading: true,
    });
    const icosaMesh = new global.THREE.Mesh(icosaGeometry, icoMaterial);
    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    const icoVertices = icosaMesh.geometry.vertices;
    const vertexShader = glsl(/* glsl */ `

    varying vec2 vUv;
    varying vec3 vPosition;

    void main(){

      vUv = uv;
      vPosition = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);

    }


  `);
    const fragmentShader = glsl(/* glsl */ `


    #pragma glslify: aastep = require('glsl-aastep');



    varying vec2 vUv;
    varying vec3 vPosition;

    uniform vec3 temena[BROJ_TEMENA];

    uniform vec3 color;
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

      // OVO MU DODJE KAO VARIJABLA KOJA JE IZVAN LOOP-A A U KOJU STAVLJAM VREDNOST min-A

      float dist = 10000.0;

      for (int i = 0; i < BROJ_TEMENA; i++){
        // TRENUTNI VERTEX; ODNSNO TRENUTNO TEME
        vec3 vertice = temena[i];

        float d = distance(vPosition, vertice);

        dist = min(d, dist);
      }


      // KORISTIO SI OVDE ANTIALIASED STEP
      float mask = aastep(0.28, dist);


      // OVO CE RECI DA AKO SMO INSIDE THE CIRCLE    NEMOJ DA DRW-UJES FRAGMENT
      if(mask < 0.5) discard;
      // MOCI CES VIDETI KRIOZ KRUGOVE, I ZATO STO SI DOLE NA SHADER MATERIALU DEFINISAO TWO SIDED ZA sides

      float rim = sphereRim(vPosition);


      vec3 fragColor = mix(color, vec3(cos(2.4), 0.2, sin(time + vUv.y + 0.1)),mask);

      // ENHANCE FRAG COLOR BASED ON SOME RIM AMOUNT
      fragColor += rim * 0.25;



      gl_FragColor = vec4(fragColor, 1.0);

    }


  `);
    //
    const sphereGeo = new global.THREE.SphereGeometry(2, 12, 12);
    //
    const sphereShaderMaterial = new global.THREE.ShaderMaterial({
        // wireframe: true,
        // DODAJEM SHADER
        vertexShader,
        fragmentShader,
        // DODAJE UNIFORMS
        uniforms: {
            temena: { value: icoVertices },
            color: { value: new global.THREE.Color("crimson") },
            time: { value: 0 },
        },
        // DODAJEM DEFINES
        defines: {
            BROJ_TEMENA: icoVertices.length,
        },
        extensions: {
            derivatives: true,
        },
        flatShading: false,
        side: global.THREE.DoubleSide,
    });
    const sphereMesh = new global.THREE.Mesh(sphereGeo, sphereShaderMaterial);
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    icosaMesh.position.fromArray(sphereMesh.position.toArray());
    // scene.add(icosaMesh);
    // sphereMesh.scale.setScalar(2.4);
    scene.add(sphereMesh);
    sphereMesh.position.y = 2.6;
    sphereMesh.position.x = -8.6;
    sphereMesh.position.z = -8.6;
    // OVO JE SAMO ZA PROVERU DA LI KRUGOVE LEZE NA PRAVOM MESTU, KASNIJE SE MOZE UKLONITI
    const circleGeo = new global.THREE.CircleGeometry(0.1);
    const circleMaterial = new global.THREE.MeshNormalMaterial({
        side: global.THREE.BackSide,
    });
    icoVertices.forEach((vec3) => {
        const circleMesh = new global.THREE.Mesh(circleGeo, circleMaterial);
        circleMesh.position.fromArray(vec3.toArray());
        circleMesh.lookAt(0, 0, 0);
        // scene.add(circleMesh);
    });
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(18, 6, 3);
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
    // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
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
            sphereShaderMaterial.uniforms.time.value = time * Math.PI * 0.2;
            sphereMesh.rotation.y = Math.PI * 2 * playhead;
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
