//
// -------- UI STUFF ---------
import uiElements from "./ui/user_interface";
// SETTINGS OBJECT STUFF  -----------------
import settings, { settingsFunc } from "./sketch-settings";
//
// ANIMATION LIBRATRIES
import { TweenMax, Elastic, Quad } from "gsap";
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
import spaceshipVertex from "./glsl_stuff/spaceshipVertex";
import spaceshipFragment from "./glsl_stuff/spaceshipFragment";
//
// THREEJS
global.THREE = require("three");
//
//
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/controls/TrackballControls.js");
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
    const seaPlaneGeo = new global.THREE.PlaneGeometry(108, 108, 168, 168);
    // let seaPlaneGeo = new global.THREE.RingGeometry(0.01, 98, 24, 16);
    const icosaGeo = new global.THREE.SphereGeometry(1, 16, 28);
    const spaceshipGeo = new global.THREE.IcosahedronGeometry(1, 6);
    // seaPlaneGeo = bspB.union(bspA);
    // const extrudedGeo = new global.THREE.ExtrudeGeometry(,)
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
    const seaPlaneShaderMaterialWireframed = new global.THREE.ShaderMaterial({
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
    const seaPlaneShaderMaterial = new global.THREE.ShaderMaterial({
        wireframe: false,
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
    const starsShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: starsIcosaVertes,
        fragmentShader: starsIcosaFragmant,
        side: global.THREE.BackSide,
        uniforms: {
            time: { value: 0 },
        },
        flatShading: false,
    });
    const sunShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: icosaItemVertex,
        fragmentShader: icosaItemFragment,
        // side: global.THREE.DoubleSide,
        flatShading: false,
        uniforms: {
            time: {
                value: 0,
            },
            deformation: {
                value: 0,
            },
        },
        extensions: {
            derivatives: true,
        },
    });
    const spacehipShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: spaceshipVertex,
        fragmentShader: spaceshipFragment,
        uniforms: {
            time: {
                value: 0,
            },
        },
        extensions: {
            derivatives: true,
        },
        // side: global.THREE.DoubleSide,
        flatShading: false,
    });
    const cageShaderMaterial = new global.THREE.ShaderMaterial({
        vertexShader: spaceshipVertex,
        fragmentShader: plane0Fragment,
        wireframe: true,
        uniforms: {
            time: {
                value: 0,
            },
        },
    });
    //  ----------- MESHES   ---------------
    const plane0Mesh = new global.THREE.Mesh(plane0Geo, plane0Material);
    const seaPlaneMesh = new global.THREE.Mesh(seaPlaneGeo, seaPlaneShaderMaterialWireframed);
    const middlePlaneMesh = new global.THREE.Mesh(plane0Geo, planeMiddleShaderMaterial);
    const skyMesh = new global.THREE.Mesh(icosaGeo, starsShaderMaterial);
    const sunMesh = new global.THREE.Mesh(icosaGeo, sunShaderMaterial);
    const spaceshipMesh = new global.THREE.Mesh(spaceshipGeo, spacehipShaderMaterial);
    const cageMesh = new global.THREE.Mesh(spaceshipGeo, cageShaderMaterial);
    const spaceshipGroup = new global.THREE.Group();
    spaceshipGroup.add(spaceshipMesh, cageMesh);
    // -----------------------------------------------------------------
    // --- CREATING AND ADDING WIREFRAME ACROSS OVER THE COLORS --------
    // -----------------------------------------------------------------
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
        flatShading: false,
        extensions: {
            derivatives: true,
        },
    });
    const seaWireframe = new global.THREE.LineSegments(seaEdgesGeometry, seaWireframeShaderMaterial);
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // ------INITIAL POSITIONING AND ROTATING FOR MESHES --------------------
    plane0Mesh.rotation.x = -Math.PI / 2;
    plane0Mesh.position.y = -3.8;
    plane0Mesh.scale.setScalar(0.8);
    seaPlaneMesh.rotation.x = (3 * Math.PI) / 2;
    // seaPlaneMesh.position.y = -4.2;
    seaPlaneMesh.scale.setScalar(6.2);
    middlePlaneMesh.rotation.copy(seaPlaneMesh.rotation);
    middlePlaneMesh.scale.copy(seaPlaneMesh.scale);
    middlePlaneMesh.position.y = -3.6;
    skyMesh.scale.setScalar(484);
    skyMesh.rotation.z = Math.PI / 2 - Math.PI / 8;
    // skyMesh.position.y = 1;
    sunMesh.scale.setScalar(64);
    sunMesh.position.set(392, 34, 78);
    sunMesh.rotation.y = Math.PI / 2;
    sunMesh.rotation.z = -Math.PI / 12;
    /* spaceshipMesh.scale.y = 8;
    spaceshipMesh.scale.x = 2;
    spaceshipMesh.scale.z = 3; */
    spaceshipMesh.position.y = 8;
    spaceshipMesh.scale.setScalar(1.8);
    cageMesh.position.copy(spaceshipMesh.position);
    cageMesh.scale.setScalar(9.4);
    // ----------------------------------------------------
    // ------------- ADDING MESHES ------------------------
    // ----------------------------------------------------
    scene.add(plane0Mesh);
    scene.add(seaPlaneMesh);
    scene.add(middlePlaneMesh);
    scene.add(skyMesh);
    scene.add(sunMesh);
    scene.add(spaceshipMesh);
    scene.add(cageMesh);
    // seaPlaneMesh.add(seaWireframe);
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // -------  ADDING MESHES TO STATE MACHINE CONTEXT  --------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 900);
    camera.position.set(-114, 12.08, 38);
    const cameraLookAtVector = new global.THREE.Vector3();
    camera.lookAt(cameraLookAtVector);
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    // const controls = new global.THREE.TrackballControls(camera, context.canvas);
    //
    // ----------------------------------------------------------------
    // ---------------------- LIGHT, HELPERS --------------------------
    const light = new global.THREE.PointLight("white", 8);
    light.position.set(158, 68, 29);
    scene.add(light);
    // adding light to a sun
    const directionalLight = new global.THREE.DirectionalLight("crimson", 8);
    directionalLight.target.position.copy(sunMesh.position);
    directionalLight.position.copy(sunMesh.position);
    scene.add(directionalLight);
    //          helpers
    // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
    scene.add(new global.THREE.PointLightHelper(light));
    scene.add(new global.THREE.AxesHelper(4));
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // ------------ STARTING CAMERA POSITION ---------------------------------
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    controls.object.position.copy(camera.position);
    controls.object.position.x = 1;
    controls.object.position.y = 140;
    controls.object.position.z = 0;
    controls.target = spaceshipMesh.position;
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // -------- GSAP STUFF  (ADDING LISTENERS TO BUTTONS) (TRYOUT) --------------------
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    uiElements.up.addEventListener("click", (e) => {
        TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
            value: 0.8,
            ease: Elastic.easeOut,
        });
        TweenMax.to(seaPlaneShaderMaterialWireframed.uniforms.circleSize, 3, {
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
        TweenMax.to(cageMesh.position, 2, {
            y: 198,
            // x: 22,
            ease: Quad.easeIn,
        });
        // controls.object.position.x = 1;
    });
    uiElements.down.addEventListener("click", (e) => {
        TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
            value: 0,
            ease: Elastic.easeOut,
        });
        TweenMax.to(seaPlaneShaderMaterialWireframed.uniforms.circleSize, 3, {
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
        TweenMax.to(spaceshipMesh.position, 2, {
            y: 198,
            // x: 22,
            ease: Quad.easeIn,
        });
        const scaleArr = cageMesh.scale.toArray();
        const newValuesScal = scaleArr.map((num) => {
            return num * 0.4;
        });
        TweenMax.to(controls.object.position, 2, {
            x: 0.4,
            z: 0.4,
            y: 198,
            ease: Elastic.easeIn,
        });
        TweenMax.to(cageMesh.scale, 9, {
            x: newValuesScal[0],
            y: newValuesScal[1],
            z: newValuesScal[2],
            ease: Quad.easeIn,
        });
    });
    // -----------------------------------------------------------------------
    // ------------------- TEST UPDATING MATERIAL ----------------------------
    // adding removing wireframe material
    // removing middleplane
    context.canvas.addEventListener("click", () => {
        seaPlaneMesh.material = seaPlaneShaderMaterial;
        // ovo ide posle
        seaPlaneMesh.material.needsUpdate = true;
        seaPlaneMesh.add(seaWireframe);
        scene.remove(middlePlaneMesh);
    });
    // preventing snapshots
    window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey && (e.key === "S" || e.key === "s")) ||
            (e.shiftKey && e.ctrlKey && (e.key === "S" || e.key === "s"))) {
            e.stopImmediatePropagation();
            e.preventDefault();
            console.log("snaphot prevented");
        }
    });
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
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
            seaPlaneShaderMaterialWireframed.uniforms.time.value = playhead;
            planeMiddleShaderMaterial.uniforms.time.value = playhead;
            starsShaderMaterial.uniforms.time.value = playhead;
            // skyMesh.rotation.x = Math.sin(Math.PI * playhead * 0.6);
            // skyMesh.rotation.z = Math.sin(Math.PI * playhead * 0.5);
            // sunShaderMaterial.uniforms.time.value = playhead * 0.1;
            // sunMesh.rotation.y = time * 100;
            spacehipShaderMaterial.uniforms.time.value = -playhead;
            cageShaderMaterial.uniforms.time.value = -playhead;
            // spaceshipMesh.rotation.y = -Math.sin(Math.PI * playhead) * 2;
            // cageMesh.rotation.y = Math.sin(Math.PI * playhead) * 12;
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
