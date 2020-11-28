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
  duration: 18,
  // fps: 24,
  // duration: 8,
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
  // Create a renderer
  const renderer = new global.THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  renderer.setClearColor("#3a3d42", 1);

  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new global.THREE.Vector3());

  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);

  const scene = new global.THREE.Scene();

  // -----  ICOSAHEDRON----------------------------------------
  const baseGeom = new global.THREE.IcosahedronGeometry(1, 1);
  const points = baseGeom.vertices;
  //-----------------------------------------------------------

  // ----------------- VERTEX SHADER ---------------------------------

  const vertexShader = glsl(/* glsl */ `

    varying vec3 vPosition;

    varying vec2 vUv;

    void main(){

      vUv = uv;
      vPosition = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);

    }

  `);

  // -------------FRAGMENT SHADER -----------------------

  const fragmentShader = glsl(/* glsl */ `

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

  //  -------------------   SPHERE --------------------------------

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

  const planeGeometry = new global.THREE.PlaneGeometry(28, 28, 28, 28);
  const planeMaterial = new global.THREE.MeshStandardMaterial({
    color: "crimson",
    wireframe: true,
  });
  const planeMesh = new global.THREE.Mesh(planeGeometry, planeMaterial);

  // planeMesh.position.z = 2;
  planeMesh.rotation.x = Math.PI / 2;

  scene.add(planeMesh);

  // --------------------------------------------------------------

  // ------------------- HELPERS -------------------------------

  // scene.add(new global.THREE.GridHelper(9, 58));
  scene.add(new global.THREE.AxesHelper(4));

  // -----------------------------------------------------------

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
