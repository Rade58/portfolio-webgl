//
// -------- UI STUFF ---------
import uiElements from "./ui/user_interface";
// SETTINGS OBJECT STUFF  -----------------
import settings, { settingsFunc } from "./sketch-settings";
//
// ANIMATION LIBRATRIES
import { TweenMax, Elastic } from "gsap";
//
// ----- MOZDA CU KORISTITI ALI VEROVATNO NE -------
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
import starsIcosaVertes from "./glsl_stuff/starsIcosaVertex";
import starsIcosaFragmant from "./glsl_stuff/starsIcosaFragment";
import icosaItemVertex from "./glsl_stuff/icosaItemVertex";
import icosaItemFragment from "./glsl_stuff/icosaItemFragment";
import wireframeSeaFragment from "./glsl_stuff/wireframeSeaFragment";
//
// THREEJS
global.THREE = require("three");
//
//
require("three/examples/js/controls/OrbitControls");
//
const canvasSketch = require("canvas-sketch");
// -------------------------------------------------------------------------------------------
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
    const plane0Geo = new global.THREE.PlaneGeometry(108, 108, 8, 8);
    const seaPlaneGeo = new global.THREE.PlaneGeometry(108, 108, 58, 58);
    // const icosaGeo = new global.THREE.IcosahedronGeometry(1, 2);
    const icosaGeo = new global.THREE.SphereGeometry(1, 16, 28);
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
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
        // wireframe: true,
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
    const icosaShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: starsIcosaVertes,
        fragmentShader: starsIcosaFragmant,
        side: global.THREE.BackSide,
        uniforms: {
            time: { value: 0 },
        },
        flatShading: false,
    });
    const icosaItemShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: icosaItemVertex,
        fragmentShader: icosaItemFragment,
        side: global.THREE.DoubleSide,
        flatShading: true,
        uniforms: {
            time: {
                value: 0,
            },
            deformation: {
                value: 0,
            },
        },
    });
    //  ----------- MESHES   ---------------
    const plane0Mesh = new global.THREE.Mesh(plane0Geo, plane0Material);
    const seaPlaneMesh = new global.THREE.Mesh(seaPlaneGeo, seaPlaneShaderMaterial);
    const middlePlaneMesh = new global.THREE.Mesh(plane0Geo, planeMiddleShaderMaterial);
    const icosaMesh = new global.THREE.Mesh(icosaGeo, icosaShaderMaterial);
    const icosaItemMesh = new global.THREE.Mesh(icosaGeo, icosaItemShaderMaterial);
    // -----------------------------------------------------------------
    // -------- CREATING AND ADDING WIREFRAME ACROSS OVER THE COLORS ----------------
    const seaEdgesGeometry = new global.THREE.WireframeGeometry(seaPlaneMesh.geometry);
    const seaWireframeShaderMaterial = new global.THREE.ShaderMaterial({
        // wireframe: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        wireframeLinewidth: 1,
        vertexShader: seaPlaneVertex,
        // vertexColors: true,
        fragmentShader: wireframeSeaFragment,
        uniforms: {
            time: { value: 0 },
            color: { value: new global.THREE.Color("#971245") },
            circleSize: { value: 0 },
        },
        // flatShading: false,
        extensions: {
            derivatives: true,
        },
    });
    const seaWireframe = new global.THREE.LineSegments(seaEdgesGeometry, seaWireframeShaderMaterial);
    seaPlaneMesh.add(seaWireframe);
    // ------INITIAL POSITIONING AND ROTATING FOR MESHES --------------------
    plane0Mesh.rotation.x = -Math.PI / 2;
    plane0Mesh.position.y = -2.89;
    // plane0Mesh.scale.setScalar(0.9);
    seaPlaneMesh.rotation.x = (3 * Math.PI) / 2;
    // seaPlaneMesh.position.y = -4.2;
    seaPlaneMesh.scale.setScalar(3.4);
    middlePlaneMesh.rotation.copy(seaPlaneMesh.rotation);
    middlePlaneMesh.scale.copy(seaPlaneMesh.scale);
    middlePlaneMesh.position.y = -3.3;
    icosaMesh.scale.setScalar(184);
    // icosaMesh.position.y = 1;
    icosaItemMesh.scale.setScalar(34);
    icosaItemMesh.position.set(148, 48, 78);
    // ------------- ADDING MESHES ------------------------
    scene.add(plane0Mesh);
    scene.add(seaPlaneMesh);
    // scene.add(middlePlaneMesh);
    scene.add(icosaMesh);
    scene.add(icosaItemMesh);
    // -----------------------------------------------------------------
    // -------  ADDING MESHES TO STATE MACHINE CONTEXT   --------------------------------
    // ----------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 400);
    camera.position.set(-14, 12.08, 38);
    const cameraLookAtVector = new global.THREE.Vector3();
    camera.lookAt(cameraLookAtVector);
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    //
    // ----------------------------------------------------------------
    // ---------------------- LIGHT, HELPERS --------------------------
    const light = new global.THREE.PointLight("white", 2);
    light.position.set(-19, 68, 29);
    scene.add(light);
    //          helpers
    // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
    scene.add(new global.THREE.AxesHelper(4));
    scene.add(new global.THREE.PointLightHelper(light));
    // -----------------------------------------------------------------
    // -----------------------------------------------------------------
    // -----------------------------------------------------------------
    // --------------------  GSAP STUFF  (ADDING LISTENERS TO BUTTONS) -------------------------------
    uiElements.up.addEventListener("click", (e) => {
        TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
        TweenMax.to(planeMiddleShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
        TweenMax.to(seaWireframeShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
    });
    uiElements.down.addEventListener("click", (e) => {
        TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
            value: 0,
            ease: Elastic.easeOut,
        });
        TweenMax.to(planeMiddleShaderMaterial.uniforms.circleSize, 3, {
            value: 0,
            ease: Elastic.easeOut,
        });
        TweenMax.to(seaWireframeShaderMaterial.uniforms.circleSize, 3, {
            value: 0,
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
            seaPlaneShaderMaterial.uniforms.time.value = seaWireframeShaderMaterial.uniforms.time.value = playhead;
            planeMiddleShaderMaterial.uniforms.time.value = playhead;
            icosaShaderMaterial.uniforms.time.value = playhead;
            icosaMesh.rotation.x = Math.sin(Math.PI * playhead);
            icosaMesh.rotation.z = Math.sin(Math.PI * playhead);
            icosaItemShaderMaterial.uniforms.time.value = playhead * 0.1;
            icosaItemMesh.rotation.y = time * 100;
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
// ------------ UI ELEMENTS APPENDING ------------------------
document.body.append(uiElements.up);
document.body.append(uiElements.down);
// --------------- SKETCH INITIALIZATION  --------------------
canvasSketch(sketch, settingsFunc(settings, document.querySelector("canvas.canvas")));
