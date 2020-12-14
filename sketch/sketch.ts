// TYPE-OVI
import {
  SettingsI,
  SketchPropsI,
  SketchReturnType,
  threeType,
} from "./my_types";

import { TweenMax, Elastic, Power2 } from "gsap";
/* import {
  sceneService,
  fse,
  EE,
} from "../../state_machines/scene_state_machine"; */

const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing");

global.THREE = require("three") as threeType;

require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings: SettingsI = {
  name: "synth",
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
  // ------------- SHADERS -------------- SHADERS -----------------

  // -------------   ------------------   -----------------  -----------------------------
  // ----------------   --------------  --------------------  ---------------------------

  // --------------------- CAMERA, CONTROLS --------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------
  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(-44, 12.08, 38);

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
  light.position.x = -54;
  scene.add(light);

  // helpers
  // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
  scene.add(new global.THREE.AxesHelper(4));
  scene.add(new global.THREE.PointLightHelper(light));

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

  // ----------------   ANIMATIONS  ---------------------------------
  // -------

  // ANIMATIONS ------------------------------------------------------------
  // WITH EASING --------------------------------------------------
  // --------------------  GSAP STUFF  ----------------------------

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

      // ----------------------------------------------------
      // THIRD PLANE

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

const button = document.createElement("button");

button.textContent = "Switch";

document.body.append(button);

button.style.position = "fixed";
button.style.top = "0px";
button.style.left = "0px";

export {};
