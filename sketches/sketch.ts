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

  const scene = new global.THREE.Scene();

  // ------------------ SHADERS ------------

  const sphVert = glsl(/* glsl */ `

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main () {
      vPosition = position;
      vUv = uv;
      vNormal = normal;

      // vec3 n = snoise3(vUv);



      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
    }

  `);

  const sphFrag = glsl(/* glsl */ `

    #pragma glslify: aastep = require(glsl-aastep)


    varying vec2 vUv;

    void main () {

      float distance = 0.4;

      float threshold = 0.25;

      float edge = aastep(threshold, distance);



      vec3 fragColor = vec3(vUv.x, 0.2, vUv.x);
      gl_FragColor = vec4(fragColor, 1.0);
    }

  `);

  // -------------------  GEOMETRIES AND MESHES -------

  const sphereGeo = new global.THREE.SphereGeometry(2, 18, 18);

  const sphereMaterial = new global.THREE.ShaderMaterial({
    vertexShader: sphVert,
    fragmentShader: sphFrag,
    extensions: {
      derivatives: true,
    },
  });

  const sphereMesh = new global.THREE.Mesh(sphereGeo, sphereMaterial);

  scene.add(sphereMesh);

  sphereMesh.position.y = 4;

  // --------------------------------------------------------------

  // ------------------- HELPERS -------------------------------

  scene.add(new global.THREE.GridHelper(9, 58));
  scene.add(new global.THREE.AxesHelper(4));

  // -----------------------------------------------------------

  // ------------------- LIGHT -----------------

  const light = new global.THREE.PointLight("white", 1);
  scene.add(light);
  light.position.z = -3;
  light.position.y = 3;

  // ----------------------------------------------

  // -------------------------- CAMERA ----------------------------------

  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 8, -18);
  camera.lookAt(new global.THREE.Vector3());

  // controls
  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);

  // -------------------------------------------------------------------

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
