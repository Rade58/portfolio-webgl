import settings, { settingsFunc } from "./sketch-settings";
// SHADER LIBRARIES
const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
const eases = require("eases");
const BeziearEasing = require("bezier-easing");
//
// THREEJS
global.T = require("three");
require("three/examples/js/controls/OrbitControls");
// CANVAS-SKETCH
const canvasSketch = require("canvas-sketch");
const sketch = ({ context }) => {
    // ODAVDE CU UZETI REGFERENCU canvas-A I DODELITI JE
    // CONTEXT-U
    // STO SE SVE TREBA DOGODITI ON STATE INIT
    const renderer = new global.T.WebGLRenderer({ canvas: context.canvas });
    renderer.setClearColor("#000");
    const scene = new global.T.Scene();
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.T.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(-44, 12.08, 38);
    camera.lookAt(new global.T.Vector3());
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.T.OrbitControls(camera, context.canvas);
    //
    // ----------------------------------------------------------------
    // ---------------------- LIGHT, HELPERS --------------------------
    const light = new global.T.PointLight("white", 1);
    light.position.y = 19;
    light.position.z = 12;
    light.position.x = -54;
    scene.add(light);
    // helpers
    // scene.add(new global.T.GridHelper(8, 58, "purple", "olive"));
    scene.add(new global.T.AxesHelper(4));
    scene.add(new global.T.PointLightHelper(light));
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
canvasSketch(sketch, 
// querySelectotr OVDE NISTA NE RADI JER SE SIGURNO NECE BIRATI ELEMENT
// SAM CE GA CANVAS SKETCH UGRADITI
settingsFunc(settings, document.querySelector("canvas.canvas")));
const button = document.createElement("button");
button.textContent = "Switch";
document.body.append(button);
button.style.position = "fixed";
button.style.top = "0px";
button.style.left = "0px";
