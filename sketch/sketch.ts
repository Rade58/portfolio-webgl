// TYPE-OVI
import { SketchPropsI, SketchReturnType, threeType } from "./types/my_types";
//
// -------- UI INITIALIZATION ---------

// SETTINGS OBJECT STUFF  -----------------
import settings, { settingsFunc } from "./sketch-settings";
//
// ANIMATION LIBRATRIES
import { TweenMax, Elastic, Power2 } from "gsap";
//
// glslify AND GLSL LIBRARIES (MOZDA OVDE NE TREBA DA BUDE)
/*
const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing"); */
//
// ------------- SHADERS --------------
import plane0Vertex from "./glsl_stuff/plane0Vertex";
import plane0Fragment from "./glsl_stuff/plane0Fragment";
//
// THREEJS
global.THREE = require("three") as threeType;
//
//
require("three/examples/js/controls/OrbitControls");
//
const canvasSketch = require("canvas-sketch");

//------------------------------------- SKETCH -----------------------------------------------

const sketch = ({ context }: SketchPropsI): SketchReturnType => {
  //   ------------- RENDERER AND SCENE --------------------
  const renderer = new global.THREE.WebGLRenderer({ canvas: context.canvas });
  renderer.setClearColor("#000");
  const scene = new global.THREE.Scene();
  // -------------   ------------------   -----------------  ------------ ---------------
  // ----------------   --------------  --------------------  ---------------------------
  //   -----------------     SCENE SETUP  -----------------------------------------------
  //   ----------------------------------------------------------------------------------
  //   ----------- GEMETRIES ------------

  const plane0Geo = new global.THREE.PlaneGeometry(58, 68, 18, 18);

  //   ----------- MATERIALS  -----------
  const plane0Material = new global.THREE.ShaderMaterial({
    vertexShader: plane0Vertex,
    fragmentShader: plane0Fragment,
    uniforms: {
      playhead: {
        value: 0,
      },
    },
  });

  //  ----------- MESHES   ---------------
  const plane0Mesh = new global.THREE.Mesh(plane0Geo, plane0Material);

  // ----------- INITIAL POSITIONING AND ROTATING FOR MESHES --------------------
  plane0Mesh.rotation.x = -Math.PI / 2;

  // ------------- ADDING MESHES ------------------------
  scene.add(plane0Mesh);

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  // --------------------- CAMERA, CONTROLS --------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------
  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(-14, 12.08, 38);

  camera.lookAt(new global.THREE.Vector3());

  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);
  //
  // ----------------------------------------------------------------
  // ---------------------- LIGHT, HELPERS --------------------------
  const light = new global.THREE.PointLight("white", 1);
  light.position.set(-19, 18, 29);
  scene.add(light);

  //          helpers
  // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
  scene.add(new global.THREE.AxesHelper(4));
  scene.add(new global.THREE.PointLightHelper(light));

  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  // --------------------  GSAP STUFF  -------------------------------

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  // ------------------------RETURN---------------------------------------
  // ------------------------RETURN---------------------------------------
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      // ----------------------------------------------------
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time, playhead }) {
      // ----------------------------------------------------
      // ----------------------------------------------------
      // time RELATED UNIFORMS

      plane0Material.uniforms.playhead.value = playhead;

      //-----------------------------------------------------
      //-----------------------------------------------------

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      //------------------------------------------------------
      controls.dispose();
      renderer.dispose();
    },
  };
};

// --------------- SKETCH INITIALIZATION  --------------------

canvasSketch(
  sketch,
  settingsFunc(settings, document.querySelector("canvas.canvas"))
);
