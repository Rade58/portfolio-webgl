// TYPE-OVI
import {
  SettingsI,
  SketchPropsI,
  SketchReturnType,
  threeType,
} from "./my_types";

const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");

global.THREE = require("three") as threeType;

require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings: SettingsI = {
  animate: true,
  context: "webgl",
  duration: 28,
  // fps: 24,
  // attributes: { antialis: true },
};

const settingsFunc = (
  settings: SettingsI,
  canvas?: HTMLCanvasElement
): SettingsI => {
  if (canvas) {
    settings.canvas = canvas;
  }

  return settings;
};

const sketch = ({ context }: SketchPropsI): SketchReturnType => {
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


    uniform float mousemove;



    void main () {
      vec3 fragColor = vec3(vUv.x * 0.1);

      vec2 center = vec2(0.5, 0.5);
      vec2 pos = mod(vUv * 2.0, 1.0);

      float d = distance(vUv.xy, center);

      float mask = aastep(mousemove * 0.18, d);   // ANIMIRANO SA time
      // float mask = aastep(0.1, d);  // NIJE ANIMIRANO

      if(mask < 0.5) discard;

      vec3 col = mix(vec3(0.8), color, mask);


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
      mousemove: { value: 0 },
    },
    flatShading: false,
    extensions: {
      derivatives: true,
    },
  });

  const planeMesh = new global.THREE.Mesh(planeGeo, planeShaderMaterial);

  planeMesh.rotation.x = (3 * Math.PI) / 2;
  // planeMesh.position.z = 2;
  scene.add(planeMesh);

  // -------------- FINDING CENTRAL VERTICE OF THE PLANE (POKAZALO SE KAO NESTO STA NECU KORISTITI) ----------------------------

  const planeVertices = planeMesh.geometry.vertices;

  console.log(planeVertices.length);

  const planeFaces = planeMesh.geometry.faces;

  console.log(planeFaces.length);

  const middleVertice = planeVertices[Math.round(planeVertices.length / 2)];

  console.log(middleVertice);

  const circleGeo = new global.THREE.CircleGeometry(2, 22);

  const circleMesh = new global.THREE.Mesh(
    circleGeo,
    new global.THREE.MeshNormalMaterial({})
  );

  circleMesh.rotation.copy(planeMesh.rotation);

  circleMesh.position.copy(middleVertice);

  // ----- CIRCLE IN MIDDLE VERTICE
  // scene.add(circleMesh);  // NA KRAJU MI CIRCLE NIJE NI TREBAO

  // --------- ADDING CILINDER
  const cylinderGeo = new global.THREE.CylinderGeometry(3, 3, 4, 28, 28, true);

  const cylinderMaterial = new global.THREE.MeshBasicMaterial({
    // color: "white",
    color: "black",
  });

  const cylinderMesh = new global.THREE.Mesh(cylinderGeo, cylinderMaterial);

  // cylinderMesh.position.copy(middleVertice);

  cylinderMesh.position.y = -2.5;

  // scene.add(cylinderMesh);

  // ------  SPACE SHIP --------------------------------------------
  // ---------------------------------------------------------------
  const icosaGeo = new global.THREE.IcosahedronGeometry(1.8, 6);

  // USING TEXTURE LOADER
  const difuseTexturePath = "public/black-stone/damp-dungeon-floor_albedo.png";
  const normalTexturePath =
    "public/black-stone/damp-dungeon-floor_normal-dx.png";

  const textureLoader = new global.THREE.TextureLoader();

  const map = textureLoader.load(difuseTexturePath);
  const normalMap = textureLoader.load(normalTexturePath);

  map.wrapS = map.wrapT = global.THREE.RepeatWrapping;
  map.repeat.set(1, 2).multiplyScalar(1.2);
  normalMap.wrapS = normalMap.wrapT = global.THREE.RepeatWrapping;
  normalMap.repeat.copy(map.repeat);
  //

  const icosaMaterial = new global.THREE.MeshStandardMaterial({
    flatShading: false,
    map,
    normalMap,
    roughness: 2.76,
    metalness: 0.4,
  });

  const icosaMesh = new global.THREE.Mesh(icosaGeo, icosaMaterial);

  icosaMesh.scale.x = 1.4;

  icosaMesh.position.y = 6.4;

  scene.add(icosaMesh);

  // ----------------------------SECOND PLANE -------------------------------
  // ------------------------------------------------------------------------

  const planeGeo2 = new global.THREE.PlaneGeometry(38, 38, 1, 1);

  const vertexPlane2Shader = glsl(/* glsl */ `

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    // uniform float time;
    float amplitude = 0.58;
    float frequency = 0.48;
    //




    void main () {
      vPosition = position;
      vUv = uv;


      // float stretch = time;

      vec3 transformedPos = position.xyz;


      // float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }


  `);

  const fragmentPlane2Shader = glsl(/* glsl */ `


    #pragma glslify: aastep = require('glsl-aastep');


    varying vec2 vUv;

    uniform float time;

    uniform vec3 color;

    uniform float mousemove;




    void main () {

      vec3 fragColor = vec3(vUv.x * 0.1);

      vec2 center = vec2(0.5, 0.5);
      vec2 pos = mod(vUv * 2.0, 1.0);

      float d = distance(vUv.xy, center);

      float mask = aastep(mousemove * 0.18, d);   // ANIMIRANO SA time
      // float mask = aastep(0.08, d);  // NIJE ANIMIRANO

      if(mask < 0.5) discard;

      vec3 col = mix(vec3(0.0), color,mask);

      gl_FragColor = vec4(col, 1.0);
    }

`);

  const plane2ShaderMaterial = new global.THREE.ShaderMaterial({
    vertexShader: vertexPlane2Shader,
    fragmentShader: fragmentPlane2Shader,
    extensions: {
      derivatives: true,
    },
    uniforms: {
      color: { value: new global.THREE.Color("#341944") },
      time: { value: 0 },
      mousemove: { value: 0 },
    },
  });

  const plane2Mesh = new global.THREE.Mesh(planeGeo2, plane2ShaderMaterial);

  plane2Mesh.rotation.copy(planeMesh.rotation);

  plane2Mesh.position.y = -0.42;

  scene.add(plane2Mesh);

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

  // ----------------   MOUSE MOVMENT ---------------------------------
  // -------
  let control = 0.001;

  let spacehipY = icosaMesh.position.y - 10;

  icosaMesh.position.y = spacehipY;

  let outerInnerState: "outer" | "inner" = "outer";

  context.canvas.addEventListener("mousemove", (e) => {
    // console.log("y", e.clientY);
    // console.log("x", e.clientX);

    if (control >= 1) {
      outerInnerState = "inner";
    }

    if (control <= 0.048) {
      outerInnerState = "outer";
    }

    if (outerInnerState === "outer") {
      control += 0.001;

      spacehipY += 0.01;
    } else {
      control -= 0.001;

      spacehipY -= 0.01;
    }

    plane2ShaderMaterial.uniforms.mousemove.value = planeShaderMaterial.uniforms.mousemove.value = control;

    icosaMesh.position.y = spacehipY;
    // const move = e.clientX
  });

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

  // --------------------- CAMERA, CONTROLS --------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------
  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(-18, 5.08, 18);

  camera.lookAt(new global.THREE.Vector3());

  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);
  //

  // ----------------------------------------------------------------
  // ---------------------- LIGHT, HELPERS --------------------------
  const light = new global.THREE.PointLight("white", 1);
  light.position.y = 19;
  light.position.z = 12;
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
      planeShaderMaterial.uniforms.time.value = plane2ShaderMaterial.uniforms.time.value = Math.sin(
        Math.PI * 2 * playhead * 1.8
      );

      const max = 4;
      const min = 2 - max;
      // console.log({ playhead });
      // icosaMesh.position.y = playhead * 10;

      // ------ icosahedron rotation

      icosaMesh.rotation.y = Math.PI * 2 * playhead;

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

canvasSketch(
  sketch,
  settingsFunc(settings, document.querySelector("canvas.canvas"))
);

/*
export default () => {
  canvasSketch(
    sketch,
    settingsFunc(settings, document.querySelector("canvas.canvas"))
  );
}; */

export {};
