// TYPE-OVI
import { SketchPropsI, SketchReturnType, threeType } from "./types/my_types";
//
// -------- UI STUFF ---------
import uiElements from "./ui/user_interface";
// SETTINGS OBJECT STUFF  -----------------
import settings, { settingsFunc } from "./sketch-settings";
//
// ANIMATION LIBRATRIES
import { TweenMax, Elastic, Power2, Quad } from "gsap";
//
// STATE MACHINE
import {
  EE,
  fse,
  animMachineService as service,
} from "./machine/anim_state_machine";
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
import wireframeSeaVertex from "./glsl_stuff/wireframeSeaVertex";
import wireframeSeaFragment from "./glsl_stuff/wireframeSeaFragment";
import spaceshipVertex from "./glsl_stuff/spaceshipVertex";
import spaceshipFragment from "./glsl_stuff/spaceshipFragment";
//

// THREEJS
global.THREE = require("three") as threeType;
//
//
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/controls/TrackballControls.js");
//
const canvasSketch = require("canvas-sketch");

// -------------------------------------------------------------------------------------------
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
    side: global.THREE.DoubleSide,
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
  const seaPlaneMesh = new global.THREE.Mesh(
    seaPlaneGeo,
    seaPlaneShaderMaterialWireframed
  );

  const middlePlaneMesh = new global.THREE.Mesh(
    plane0Geo,
    planeMiddleShaderMaterial
  );

  const skyMesh = new global.THREE.Mesh(icosaGeo, starsShaderMaterial);

  const sunMesh = new global.THREE.Mesh(icosaGeo, sunShaderMaterial);

  const spaceshipMesh = new global.THREE.Mesh(
    spaceshipGeo,
    spacehipShaderMaterial
  );

  const cageMesh = new global.THREE.Mesh(spaceshipGeo, cageShaderMaterial);

  const spaceshipGroup = new global.THREE.Group();

  spaceshipGroup.add(spaceshipMesh, cageMesh);

  // -----------------------------------------------------------------
  // --- CREATING AND ADDING WIREFRAME ACROSS OVER THE COLORS --------
  // -----------------------------------------------------------------
  const seaEdgesGeometry = new global.THREE.WireframeGeometry(
    seaPlaneMesh.geometry
  );

  const seaWireframeShaderMaterial = new global.THREE.ShaderMaterial({
    // wireframe: true,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
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

  const seaWireframe = new global.THREE.LineSegments(
    seaEdgesGeometry,
    seaWireframeShaderMaterial
  );

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // ------INITIAL POSITIONING AND ROTATING FOR MESHES --------------------
  plane0Mesh.rotation.x = -Math.PI / 2;
  plane0Mesh.position.y = -3.8;
  plane0Mesh.scale.setScalar(0.8);

  skyMesh.scale.setScalar(484);
  skyMesh.rotation.z = Math.PI / 2 - Math.PI / 8;

  seaPlaneMesh.rotation.x = (3 * Math.PI) / 2;
  seaPlaneMesh.scale.setScalar(6.2);

  middlePlaneMesh.rotation.copy(seaPlaneMesh.rotation);
  middlePlaneMesh.scale.copy(seaPlaneMesh.scale);
  middlePlaneMesh.position.y = -3.6;
  sunMesh.scale.setScalar(64);
  sunMesh.position.set(392, 34, 78);
  sunMesh.rotation.y = Math.PI / 2;
  sunMesh.rotation.z = -Math.PI / 12;
  //

  spaceshipMesh.position.y = -22;
  spaceshipMesh.scale.setScalar(0.1);

  cageMesh.position.copy(spaceshipMesh.position);
  cageMesh.scale.setScalar(14.4);

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

  /*  const controls: {
    target: globalThis.THREE.Vector3;
    object: globalThis.THREE.Object3D;
    update: () => void;
    dispose: () => void;

    // eslint-disable-next-line
    // @ts-ignore
  } = new global.THREE.OrbitControls(camera, context.canvas); */
  const controls: {
    target: globalThis.THREE.Vector3;
    object: globalThis.THREE.Object3D;
    update: () => void;
    dispose: () => void;
    enabled: boolean;
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    keys: number[];
    noPan: boolean;
    noRotate: boolean;
    noZoom: boolean;
    staticMoving: boolean;
    maxDistance: number;
    minDistance: number;
  } =
    // eslint-disable-next-line
    // @ts-ignore
    new global.THREE.TrackballControls(camera, context.canvas);
  // POKAZUJE STA SVE MOGU RADITI NA TRACKBALL CONTROLS
  // CONTROLS.addEventListener('change', () => console.log("Controls Change"))
  // controls.addEventListener('start', () => console.log("Controls Start Event"))
  // controls.addEventListener('end', () => console.log("Controls End Event"))
  // controls.enabled = false
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  // controls.keys = [65, 83, 68]
  // controls.noPan = true //default false
  // controls.noRotate = true //default false
  // controls.noZoom = true //default false
  // controls.staticMoving = true //default false
  // controls.maxDistance = 4;
  // controls.minDistance = 2;

  controls.noZoom = true;
  controls.noPan = true;
  controls.noRotate = true;
  controls.update();

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
  // scene.add(new global.THREE.PointLightHelper(light));
  // scene.add(new global.THREE.AxesHelper(4));

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // ------------ STARTING CAMERA POSITION ---------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  controls.object.position.copy(camera.position);
  //
  controls.object.position.x = 0;
  controls.object.position.y = 118;
  controls.object.position.z = 0;
  // i ovo
  // controls.target u 0 0 0

  // controls.target = spaceshipMesh.position;

  // -------------------------------------------------------------------
  // -------------- STATE MACHINE INITIAL SETUP ------------------------
  // -------------------------------------------------------------------
  service.send({
    type: EE.SETUP,
    payload: {
      camera,
      scene,
      cageMesh,
      controls,
      middlePlaneMesh,
      planeMiddleShaderMaterial,
      seaPlaneMesh,
      seaPlaneShaderMaterial,
      seaPlaneShaderMaterialWireframed,
      seaWireframeShaderMaterial,
      spaceshipMesh,
      seaWireframe,
      sunMesh,
      spacehipShaderMaterial,
    },
  });

  // -------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -------- GSAP STUFF  (ADDING LISTENERS TO BUTTONS) (TRYOUT) --------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  uiElements.up.addEventListener("click", (e) => {
    /* service.send({
      type: EE.HELLO,
    }); */

    /* service.send({
      type: EE.MOVE_UP,
    }); */

    service.send({ type: EE.SETUP, payload: {} });
    service.send({
      type: EE.SWITCH,
    });

    // -----------------------------
    // MOZDA NECE TREBATI
    /* assign(({ tl }, __) => {
      // ZAVISICE OD    TIMELINE-A
      return { canMoveToIdleAgain: true };
    }), */
    // -------------------------------

    /* TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
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
      y: 128,
      // x: 22,
      ease: Quad.easeIn,
    });
    TweenMax.to(spaceshipMesh.position, 2, {
      y: 20,
      // x: 22,
      ease: Quad.easeIn,
    });

    TweenMax.to(controls.object.position, 4, {
      x: 40,
      z: 0,
      y: 123,
      ease: Power2.easeOut,
    }); */
  });

  uiElements.down.addEventListener("click", (e) => {
    /* service.send({
      type: EE.HELLO,
    }); */

    /* service.send({
      type: EE.MOVE,
    }); */
    service.send({ type: EE.SETUP, payload: {} });
    service.send({
      type: EE.SWITCH,
    });

    /* TweenMax.to(seaPlaneShaderMaterial.uniforms.circleSize, 3, {
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
      y: 128,
      // x: 22,
      ease: Quad.easeIn,
    });

    const scaleArr = cageMesh.scale.toArray();

    const newValuesScal = scaleArr.map((num) => {
      return num * 0.4;
    });

    TweenMax.to(cageMesh.scale, 9, {
      x: newValuesScal[0],
      y: newValuesScal[1],
      z: newValuesScal[2],

      ease: Quad.easeIn,
    });
 */
  });

  // -----------------------------------------------------------------------
  // ------------------- TEST UPDATING MATERIAL ----------------------------
  // adding removing wireframe material
  // removing middleplane
  context.canvas.addEventListener("click", () => {
    /*  seaPlaneMesh.material = seaPlaneShaderMaterial;
    // ovo ide posle
    seaPlaneMesh.material.needsUpdate = true;

    seaPlaneMesh.add(seaWireframe);
    scene.remove(middlePlaneMesh);
    const newTargetVector = new global.THREE.Vector3(
      ...spaceshipMesh.position.toArray()
    );
    const newValuesTarget = sunMesh.position.toArray();

    controls.target = newTargetVector;
    controls.update();

    TweenMax.to(controls.target, 9, {
      x: newValuesTarget[0],
      y: newValuesTarget[1],
      z: newValuesTarget[2],

      ease: Quad.easeIn,
    });

    TweenMax.to(controls.object.position, 6, {
      y: 8,
      ease: Quad.easeInOut,
    });

    TweenMax.to(cageMesh.position, 4, {
      y: -24,
      ease: Elastic.easeInOut,
    });
    TweenMax.to(spaceshipMesh.position, 4, {
      y: -24,
      ease: Elastic.easeInOut,
    }); */
  });

  // preventing snapshots
  window.addEventListener("keydown", (e) => {
    if (
      (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
      (e.shiftKey && e.ctrlKey && (e.key === "S" || e.key === "s"))
    ) {
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

      // console.log({ playhead });

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

document.body.append(uiElements.controlsContainer);

// --------------- SKETCH INITIALIZATION  --------------------

canvasSketch(
  sketch,
  settingsFunc(settings, document.querySelector("canvas.canvas"))
);
