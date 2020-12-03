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
    // const icosaGeometry = new global.THREE.IcosahedronGeometry(2, 1);
    // ------------- SHADERS -------------- SHADERS -----------------
    const vertexShader = glsl(/* glsl */ `

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    uniform float time;
    float amplitude = 0.58;
    float frequency = 0.48;
    //




    void main () {
      vPosition = position;
      vUv = uv;


      float stretch = time;

      vec3 vert = position.xyz;


      float noize4d = snoise4(vec4(vert.x * frequency,vert.y * frequency, vert.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(vert.x * frequency,vert.y * frequency, stretch)) * amplitude;

      vert.x += noize4d;
      vert.z += noize4d;
      vert.y += noize4d;

            /*
       vert.x += noize3d;
       vert.z += noize3d;
       vert.y += noize3d;
            */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(vert.xyz, 1.0);
    }


  `);
    const fragmentShader = glsl(/* glsl */ `
    varying vec2 vUv;

    void main () {
      vec3 fragColor = vec3(vUv.x);
      gl_FragColor = vec4(fragColor, 1.0);
    }

`);
    //
    // -----------------------------------------------------------------------------
    const planeGeo = new global.THREE.PlaneGeometry(8, 8, 28, 28);
    const planeShaderMaterial = new global.THREE.ShaderMaterial({
        wireframe: true,
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
        },
        flatShading: false,
    });
    const planeMesh = new global.THREE.Mesh(planeGeo, planeShaderMaterial);
    planeMesh.rotation.x = Math.PI / 2;
    scene.add(planeMesh);
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(12, 6, 3);
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
            // ----------------------------------------------------
            // console.log({ time });
            planeShaderMaterial.uniforms.time.value = time * Math.PI * 2 * 0.025;
            // ----------------------------------------------------
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
