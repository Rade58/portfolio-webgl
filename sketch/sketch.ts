// TYPE-OVI
import { SketchPropsI, SketchReturnType, threeType } from "./my_types";

import settings, { settingsFunc } from "./sketch-settings";
import { sceneService, fse, EE } from "./state_machines/scene_state_machine";

// GSAP
import { TweenMax, Elastic, Power2 } from "gsap";
// SHADER LIBRARIES
const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing");
//
// THREEJS
// global.THREE = require("three") as threeType;
// require("three/examples/js/controls/OrbitControls");
// CANVAS-SKETCH
const canvasSketch = require("canvas-sketch");

const sketch = ({ context }: SketchPropsI): SketchReturnType => {
  sceneService.send({
    type: EE.INIT_SCENE,
    payload: {
      canvas: context.canvas,
    },
  });

  // ODAVDE CU UZETI REGFERENCU canvas-A I DODELITI JE
  // CONTEXT-U
  // STO SE SVE TREBA DOGODITI ON STATE INIT

  /* const renderer = new global.THREE.WebGLRenderer({ canvas: context.canvas });
  renderer.setClearColor("#000");
  const scene = new global.THREE.Scene();
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
  scene.add(new global.THREE.PointLightHelper(light)); */
  // ------------- SHADERS -------------- SHADERS -----------------
  // ------------- SHADERS -------------- SHADERS -----------------

  // GEOMETRIES AND MESH

  // -------------   ------------------   -----------------  -----------------------------
  // ----------------   --------------  --------------------  ---------------------------

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
      const { renderer, camera } = sceneService.state.context;

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

      const { controls, renderer, scene, camera } = sceneService.state.context;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      const { controls, renderer } = sceneService.state.context;

      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(
  sketch,
  // querySelectotr OVDE NISTA NE RADI JER SE SIGURNO NECE BIRATI ELEMENT
  // SAM CE GA CANVAS SKETCH UGRADITI
  settingsFunc(settings, document.querySelector("canvas.canvas"))
);

const button = document.createElement("button");

button.textContent = "Switch";

document.body.append(button);

button.style.position = "fixed";
button.style.top = "0px";
button.style.left = "0px";

export {};