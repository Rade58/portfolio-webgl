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
    // Create a renderer
    const renderer = new global.THREE.WebGLRenderer({
        canvas: context.canvas,
    });
    renderer.setClearColor("#3a3d42", 1);
    const scene = new global.THREE.Scene();
    // -----  ICOSAHEDRON----------------------------------------
    const baseGeom = new global.THREE.IcosahedronGeometry(1, 1);
    const points = baseGeom.vertices;
    //-----------------------------------------------------------
    // ----------------- VERTEX SHADER ---------------------------------
    // ----------------- FOR THE SPHERE ----------------------------
    const sphereVertexShader = glsl(/* glsl */ `

    varying vec3 vPosition;

    varying vec2 vUv;

    void main(){

      vUv = uv;
      vPosition = position;


      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);

    }

  `);
    // -------------FRAGMENT SHADER -----------------------
    const sphereFragmentShader = glsl(/* glsl */ `

    #define PI 3.14;

    // #define int POINT_COUNT;

    #pragma glslify: noise = require(glsl-noise/simplex/3d)

    varying vec2 vUv;
    varying vec3 vPosition;

    uniform vec3 points[POINT_COUNT];

    uniform vec3 color;
    uniform float time;

    void main(){


      vec3 fragColor = vec3(0.2, 0.6, 0.2);


      gl_FragColor = vec4(vec3(fragColor), 1.0);
    }
  `);
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // ----------------- VERTEX SAHDER FOR THE PLANE
    // -------------------
    const planeVertexShader = glsl(/* glsl */ `

    #pragma glslify: noise3d = require('glsl-noise/simplex/3d');


    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float time;

    float amplitude = 0.28;
    float frequency = 0.90;

    void main(){
      vUv = uv;
      vPosition = position;


    float stretch = time;

      vec3 vert = position.xyz;


      float noizeTest = noise3d(vec3(vert.x * frequency,vert.y * frequency, stretch)) * amplitude;

      vert.z += noizeTest;
      vert.y += noizeTest;
      vert.x += noizeTest;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(vert, 1.0);

    }


  `);
    const planeFragmentShader = glsl(/* glsl */ `

    #pragma glslify: noise = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float time;
    uniform vec3 color;

    uniform mat4 modelMatrix;


    void main(){

      // float n = noise(vec3(1.0, time, 0.1));

      vec3 fragColor = mix(color, vec3(vUv.x * 0.8, 0.4, vUv.y * 0.6), time);





      gl_FragColor = vec4(vec3(fragColor), 1.0);

    }

  `);
    // ------------------------------------------------------------
    //  -------------------   SPHERE --------------------------------
    //  ------------------- ---------------- --------------------------------
    /* const shadermaterial = new global.THREE.ShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: {
          color: { value: new global.THREE.Color("crimson") },
          time: { value: 0 },
          points: { value: points },
        },
  
        defines: {
          POINT_COUNT: points.length,
        },
      }); */
    const sphereGeometry = new global.THREE.SphereGeometry(0.5, 16, 32);
    const sphereMaterial = new global.THREE.MeshStandardMaterial({
        color: "crimson",
        wireframe: true,
    });
    const sphereMesh = new global.THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.rotation.x = 4;
    sphereMesh.rotation.z = 4;
    scene.add(sphereMesh);
    // ---------------------- PLANE -------------------------------------
    const planeGeometry = new global.THREE.PlaneGeometry(48, 48, 148, 148);
    const planeMaterial = new global.THREE.MeshNormalMaterial({
        // color: "crimson",
        // wireframe: true,
        flatShading: true,
    });
    const planeShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: planeVertexShader,
        fragmentShader: planeFragmentShader,
        uniforms: {
            time: { value: 0 },
            color: { value: new global.THREE.Color("#bb7fa9") },
        },
        // wireframe: true,
        flatShading: true,
    });
    const planeMesh = new global.THREE.Mesh(planeGeometry, planeShaderMaterial);
    planeMesh.position.y = -1;
    planeMesh.rotation.x = -Math.PI / 2;
    scene.add(planeMesh);
    // ------------------- LIGHT -----------------
    const light = new global.THREE.PointLight("white", 1);
    scene.add(light);
    light.position.z = -18;
    light.position.y = 8;
    const ambientLight = new global.THREE.AmbientLight("crimson", 1);
    ambientLight.position.y = 8;
    ambientLight.position.z = 8;
    // scene.add(ambientLight);
    // --------------------------------------------------------------
    // ------------------- HELPERS -------------------------------
    // scene.add(new global.THREE.GridHelper(9, 58));
    scene.add(new global.THREE.AxesHelper(4));
    scene.add(new global.THREE.PointLightHelper(light));
    // -----------------------------------------------------------
    // ----------------------------------------------
    // -------------------------- CAMERA ----------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(0, 2, -4);
    camera.lookAt(new global.THREE.Vector3());
    // controls
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    // -------------------------------------------------------------------
    // MOUSEMOVE ---------------------------------------
    /* context.canvas.addEventListener("mousemove", (e) => {
      const value = e.clientX * 0.008 * Math.random();
  
      console.log(value);
  
      planeShaderMaterial.uniforms.time.value =
        value !== Infinity && value < 8 ? value * 0.028 : Math.random() * 0.28;
      // planeMesh.rotation.z = Math.sin(value * Math.PI * 2);
    }); */
    // -------------------------------------------------
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
            // material.uniforms.time.value = time;
            // material.uniforms.time.value = playhead * Math.PI * 2;
            // mesh.rotation.z = playhead * Math.PI * 2;
            // mesh.rotation.y = playhead * Math.PI * 2;
            // TALASI NA PLANE-U
            // ---------------------------------------------
            planeShaderMaterial.uniforms.time.value = Math.sin(playhead * 2 * Math.PI);
            // ---------------------------------------------
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
