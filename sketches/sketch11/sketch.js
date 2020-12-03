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

      vec3 transformedPos = position.xyz;


      float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      transformedPos.x += noize4d;
      transformedPos.z += noize4d;
      transformedPos.y += noize4d;

            /*
       transformedPos.x += noize3d;
       transformedPos.z += noize3d;
       transformedPos.y += noize3d;
            */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }


  `);
    const fragmentShader = glsl(/* glsl */ `


    #pragma glslify: aastep = require('glsl-aastep');


    varying vec2 vUv;

    uniform float time;

    uniform vec3 color;



    void main () {
      vec3 fragColor = vec3(vUv.x * 0.1);

      vec2 center = vec2(0.5, 0.5);
      vec2 pos = mod(vUv * 2.0, 1.0);

      float d = distance(vUv.xy, center);

      float mask = aastep(time* 0.025, d);   // ANIMIRANO SA time
      // float mask = aastep(0.1, d);  // NIJE ANIMIRANO

      if(mask < 0.5) discard;

      vec3 col = mix(vec3(0.8), color,mask);


      gl_FragColor = vec4(col, 1.0);
    }

`);
    //
    // -----------------------------------------------------------------------------
    const planeGeo = new global.THREE.PlaneGeometry(38, 38, 68, 68);
    const planeShaderMaterial = new global.THREE.ShaderMaterial({
        wireframe: true,
        vertexShader,
        vertexColors: true,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
            color: { value: new global.THREE.Color("#971245") },
        },
        flatShading: false,
        extensions: {
            derivatives: true,
        },
    });
    const planeMesh = new global.THREE.Mesh(planeGeo, planeShaderMaterial);
    planeMesh.rotation.x = (3 * Math.PI) / 2;
    planeMesh.position.z = 2;
    scene.add(planeMesh);
    // -------------- FINDING CENTRAL VERTICE OF THE PLANE ----------------------------
    const planeVertices = planeMesh.geometry.vertices;
    console.log(planeVertices.length);
    const planeFaces = planeMesh.geometry.faces;
    console.log(planeFaces.length);
    const middleVertice = planeVertices[Math.round(planeVertices.length / 2)];
    console.log(middleVertice);
    const circleGeo = new global.THREE.CircleGeometry(2, 22);
    const circleMesh = new global.THREE.Mesh(circleGeo, new global.THREE.MeshNormalMaterial({}));
    circleMesh.rotation.copy(planeMesh.rotation);
    circleMesh.position.copy(middleVertice);
    scene.add(circleMesh);
    // ----- CIRCLE IN MIDDLE VERTICE
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(22, 6, 4);
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
            planeShaderMaterial.uniforms.time.value = playhead * 20;
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
