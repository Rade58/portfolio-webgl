//
// -------- UI INITIALIZATION ---------
// SETTINGS OBJECT STUFF  -----------------
import settings, { settingsFunc } from "./sketch-settings";
//
// ANIMATION LIBRATRIES
import { TweenMax, Elastic } from "gsap";
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
import seaPlaneVertex from "./glsl_stuff/seaPlaneVertex";
import seaPlaneFragmant from "./glsl_stuff/seaPlaneFragment";
import middlePlaneVertex from "./glsl_stuff/middlePlaneVertex";
import middlePlaneFragment from "./glsl_stuff/middlePlaneFragment";
//
// THREEJS
global.THREE = require("three");
//
//
require("three/examples/js/controls/OrbitControls");
//
const canvasSketch = require("canvas-sketch");
//------------------------------------- SKETCH -----------------------------------------------
const sketch = ({ context }) => {
    //   ------------- RENDERER AND SCENE --------------------
    const renderer = new global.THREE.WebGLRenderer({ canvas: context.canvas });
    renderer.setClearColor("#000");
    const scene = new global.THREE.Scene();
    // -------------   ------------------   -----------------  ------------ ---------------
    // ----------------   --------------  --------------------  ---------------------------
    //   -----------------     SCENE SETUP  -----------------------------------------------
    //   ----------------------------------------------------------------------------------
    //   ----------- GEMETRIES ------------
    const plane0Geo = new global.THREE.PlaneGeometry(28, 28, 8, 8);
    const seaPlaneGeo = new global.THREE.PlaneGeometry(108, 108, 68, 68);
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
    const seaPlaneShaderMaterial = new global.THREE.ShaderMaterial({
        wireframe: true,
        vertexShader: seaPlaneVertex,
        vertexColors: true,
        fragmentShader: seaPlaneFragmant,
        uniforms: {
            time: { value: 0 },
            color: { value: new global.THREE.Color("#971245") },
            circleSize: { value: 0 },
        },
        flatShading: false,
        extensions: {
            derivatives: true,
        },
    });
    const planeMiddleShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: middlePlaneVertex,
        fragmentShader: middlePlaneFragment,
        extensions: {
            derivatives: true,
        },
        uniforms: {
            color: { value: new global.THREE.Color("#341944") },
            time: { value: 0 },
            circleSize: { value: 0 },
        },
    });
    //  ----------- MESHES   ---------------
    const plane0Mesh = new global.THREE.Mesh(plane0Geo, plane0Material);
    const seaPlaneMesh = new global.THREE.Mesh(seaPlaneGeo, seaPlaneShaderMaterial);
    const middlePlaneMesh = new global.THREE.Mesh(plane0Geo, planeMiddleShaderMaterial);
    // ----------- INITIAL POSITIONING AND ROTATING FOR MESHES --------------------
    plane0Mesh.rotation.x = -Math.PI / 2;
    plane0Mesh.position.y = -4;
    seaPlaneMesh.rotation.x = (3 * Math.PI) / 2;
    middlePlaneMesh.rotation.copy(seaPlaneMesh.rotation);
    middlePlaneMesh.scale.set(4, 4, 4);
    middlePlaneMesh.position.y = -1.2;
    // ------------- ADDING MESHES ------------------------
    scene.add(plane0Mesh);
    scene.add(seaPlaneMesh);
    scene.add(middlePlaneMesh);
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 200);
    camera.position.set(-14, 12.08, 38);
    const cameraLookAtVector = new global.THREE.Vector3();
    camera.lookAt(cameraLookAtVector);
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
    // --------------------  GSAP STUFF  (ADDING LISTENERS TO BUTTONS) -------------------------------
    context.canvas.addEventListener("click", (e) => {
        TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
        TweenMax.to(planeMiddleShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
    });
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
            seaPlaneShaderMaterial.uniforms.time.value = playhead;
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
canvasSketch(sketch, settingsFunc(settings, document.querySelector("canvas.canvas")));
