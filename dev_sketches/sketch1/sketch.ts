// TYPE-OVI
import {
  SettingsI,
  SketchPropsI,
  SketchReturnType,
  threeType,
} from "./my_types";

import { TweenMax, Elastic, Power2 } from "gsap";

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
  const vertexShader = glsl(/* glsl */ `

    #pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    uniform float time;
    float amplitude = 0.78;
    float frequency = 0.38;
    //




    void main () {
      vPosition = position;
      vUv = uv;


      float stretch = time;

      vec3 transformedPos = position.xyz;


      float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      transformedPos.x += noize4d;
      transformedPos.z += noize4d;
      transformedPos.y += noize4d;

            /*
       transformedPos.x += noize3d;
       transformedPos.z += noize3d;
       transformedPos.y += noize3d;
            */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }


  `);

  const fragmentShader = glsl(/* glsl */ `


    #pragma glslify: aastep = require('glsl-aastep');


    varying vec2 vUv;

    uniform float time;

    uniform vec3 color;


    uniform float mousemove;



    void main () {
      vec3 fragColor = vec3(vUv.x * 0.1);

      vec2 center = vec2(0.5, 0.5);
      vec2 pos = mod(vUv * 2.0, 1.0);

      float d = distance(vUv.xy, center);

      float mask = aastep(mousemove * 0.11, d);   // ANIMIRANO SA time
      // float mask = aastep(0.1, d);  // NIJE ANIMIRANO

      if(mask < 0.5) discard;

      // vec3 col = mix(vec3(0.8), color, mask);
      vec3 col = mix(vec3(0.8), vec3(0.8, vUv.y, vUv.x), mask);


      gl_FragColor = vec4(col, 1.0);
    }

  `);

  //

  // -----------------------------------------------------------------------------
  const planeGeo = new global.THREE.PlaneGeometry(108, 108, 68, 68);

  const planeShaderMaterial = new global.THREE.ShaderMaterial({
    wireframe: true,
    vertexShader,
    vertexColors: true,
    fragmentShader,
    uniforms: {
      time: { value: 0 },
      color: { value: new global.THREE.Color("#971245") },
      mousemove: { value: 0 },
    },
    flatShading: false,
    extensions: {
      derivatives: true,
    },
  });

  const planeMesh = new global.THREE.Mesh(planeGeo, planeShaderMaterial);

  planeMesh.rotation.x = (3 * Math.PI) / 2;
  // planeMesh.position.z = 2;
  scene.add(planeMesh);

  // -------------- FINDING CENTRAL VERTICE OF THE PLANE (POKAZALO SE KAO NESTO STA NECU KORISTITI) ----------------------------

  const planeVertices = planeMesh.geometry.vertices;

  // console.log(planeVertices.length);

  const planeFaces = planeMesh.geometry.faces;

  // console.log(planeFaces.length);

  const middleVertice = planeVertices[Math.round(planeVertices.length / 2)];

  // console.log(middleVertice);

  const circleGeo = new global.THREE.CircleGeometry(2, 22);

  const circleMesh = new global.THREE.Mesh(
    circleGeo,
    new global.THREE.MeshNormalMaterial({})
  );

  circleMesh.rotation.copy(planeMesh.rotation);

  circleMesh.position.copy(middleVertice);

  // ----- CIRCLE IN MIDDLE VERTICE
  // scene.add(circleMesh);  // NA KRAJU MI CIRCLE NIJE NI TREBAO

  // --------- ADDING CILINDER
  const cylinderGeo = new global.THREE.CylinderGeometry(3, 3, 4, 28, 28, true);

  const cylinderMaterial = new global.THREE.MeshBasicMaterial({
    // color: "white",
    color: "black",
  });

  const cylinderMesh = new global.THREE.Mesh(cylinderGeo, cylinderMaterial);

  // cylinderMesh.position.copy(middleVertice);

  cylinderMesh.position.y = -2.5;

  // scene.add(cylinderMesh);

  // ------  SPACE SHIP --------------------------------------------
  // ---------------------------------------------------------------
  const icosaGeo = new global.THREE.IcosahedronGeometry(1.8, 6);

  // USING TEXTURE LOADER
  const difuseTexturePath = "public/black-stone/damp-dungeon-floor_albedo.png";
  const normalTexturePath =
    "public/black-stone/damp-dungeon-floor_normal-dx.png";

  const textureLoader = new global.THREE.TextureLoader();

  const map = textureLoader.load(difuseTexturePath);
  const normalMap = textureLoader.load(normalTexturePath);

  map.wrapS = map.wrapT = global.THREE.RepeatWrapping;
  map.repeat.set(1, 2).multiplyScalar(1.2);
  normalMap.wrapS = normalMap.wrapT = global.THREE.RepeatWrapping;
  normalMap.repeat.copy(map.repeat);
  //

  const icosaMaterial = new global.THREE.MeshStandardMaterial({
    flatShading: false,
    map,
    normalMap,
    roughness: 2.76,
    metalness: 0.4,
  });

  const icosaMesh = new global.THREE.Mesh(icosaGeo, icosaMaterial);

  icosaMesh.scale.x = 1.4;

  icosaMesh.position.y = 6.4;

  scene.add(icosaMesh);

  // ----------------------------SECOND PLANE -------------------------------
  // ---------------------------------DODACU I RIM LIGHTING---------------------------------------

  const planeGeo2 = new global.THREE.PlaneGeometry(108, 108, 1, 1);

  const vertexPlane2Shader = glsl(/* glsl */ `

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec2 vUv;
    varying vec3 vPosition;

    varying vec3 transformed;

    //
    // uniform float time;
    float amplitude = 0.78;
    float frequency = 0.38;
    //




    void main () {
      vPosition = position;
      vUv = uv;


      // float stretch = time;

      vec3 transformedPos = position.xyz;


      // float noize4d = snoise4(vec4(transformedPos.x * frequency,transformedPos.y * frequency, transformedPos.z * frequency, stretch)) * amplitude;

      // float noize3d = snoise3(vec3(transformedPos.x * frequency,transformedPos.y * frequency, stretch)) * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos.xyz, 1.0);
    }


  `);

  const fragmentPlane2Shader = glsl(/* glsl */ `


    #pragma glslify: aastep = require('glsl-aastep');

    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

    varying vec3 vPosition;

    varying vec2 vUv;

    uniform float time;

    uniform vec3 color;

    uniform float mousemove;


    uniform mat4 modelMatrix;

    float sphereRim (vec3 spherePosition) {
      vec3 normal = normalize(spherePosition.xyz);
      vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
      vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
      vec3 V = normalize(cameraPosition - worldPosition);
      float rim = 1.0 - max(dot(V, worldNormal), 0.0);
      return pow(smoothstep(0.0, 1.0, rim), 0.5);
    }






    void main () {


      float rim = sphereRim(vPosition);


      vec3 fragColor = vec3(vUv.x * 0.1);

      vec2 center = vec2(0.5, 0.5);
      vec2 pos = mod(vUv * 1.0, 1.0);

      float d = distance(pos, center);

      float mask = aastep(mousemove * 0.11, d);   // ANIMIRANO SA time
      // float mask = aastep(mousemove * 0.41, d);   // ANIMIRANO SA time

      // float mask = aastep(0.08, d);  // NIJE ANIMIRANO

      if(mask < 0.5) discard;

      // vec3 col = mix(vec3(0.6), color,mask);
      vec3 col = mix(vec3(0.6), vec3(0.46, 0.2, vUv.x),mask);

      col += rim * 0.068;


      gl_FragColor = vec4(col, 1.0);
    }

`);

  const plane2ShaderMaterial = new global.THREE.ShaderMaterial({
    vertexShader: vertexPlane2Shader,
    fragmentShader: fragmentPlane2Shader,
    extensions: {
      derivatives: true,
    },
    uniforms: {
      color: { value: new global.THREE.Color("#341944") },
      time: { value: 0 },
      mousemove: { value: 0 },
    },
  });

  const plane2Mesh = new global.THREE.Mesh(planeGeo2, plane2ShaderMaterial);

  plane2Mesh.rotation.copy(planeMesh.rotation);

  plane2Mesh.position.y = -0.62;

  scene.add(plane2Mesh);

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------
  // ------ THIRD PLANE

  const thirdPlaneVertShader = glsl(/* glsl */ `

    varying vec2 vUv;
    varying vec3 vPosition;

    void main () {
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
    }

  `);
  const thirdPlaneFragShader = glsl(/* glsl */ `

    varying vec2 vUv;

    uniform float time;

    void main () {
      // vec3 fragColor = vec3(vUv.x, 0.4, 0.2 * time * vUv.y);

      vec3 fragColor = 0.4 + 0.5 * cos(time * 0.26 + vUv.xyx + vec3(0.9, 1.0, 0.64));


      // fragColor *= time * 0.2;

      gl_FragColor = vec4(fragColor, 1.0);
    }

  `);

  const thirdPlaneShaderMaterial = new global.THREE.ShaderMaterial({
    // wireframe: true,
    vertexShader: thirdPlaneVertShader,
    fragmentShader: thirdPlaneFragShader,
    uniforms: {
      time: { value: 0 },
    },
  });

  const thirdPlaneMesh = new global.THREE.Mesh(
    planeGeo2,
    thirdPlaneShaderMaterial
  );

  thirdPlaneMesh.rotation.copy(plane2Mesh.rotation);
  thirdPlaneMesh.position.y = -2;
  thirdPlaneMesh.scale.setScalar(0.38);

  scene.add(thirdPlaneMesh);

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

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

  icosaMesh.position.y = -6;

  context.canvas.addEventListener("click", (e) => {
    if (e.ctrlKey) {
      // gradient i izlazak shipa iz vode
      TweenMax.to(icosaMesh.position, 1.4, {
        y: 12,
        ease: Elastic.easeInOut,
      });

      TweenMax.to(plane2ShaderMaterial.uniforms.mousemove, 3, {
        value: 0.8,
        ease: Elastic.easeOut,
      });

      TweenMax.to(planeShaderMaterial.uniforms.mousemove, 3, {
        value: 0.8,
        ease: Elastic.easeOut,
      });

      camera.lookAt(icosaMesh.position);
    }

    if (e.shiftKey) {
      // POMERAM KAMERU DO SHIP-A

      TweenMax.to(camera.position, 3, {
        x: 12,
        z: 12,
        y: 28,
        ease: Power2.easeInOut,
      });
    }
  });

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
      planeShaderMaterial.uniforms.time.value = plane2ShaderMaterial.uniforms.time.value = Math.sin(
        Math.PI * 2 * playhead * 1.8
      );

      const max = 4;
      const min = 2 - max;
      // console.log({ playhead });
      // icosaMesh.position.y = playhead * 10;

      // ------ icosahedron rotation

      icosaMesh.rotation.y = Math.PI * 2 * playhead;

      // ----------------------------------------------------
      // THIRD PLANE
      thirdPlaneShaderMaterial.uniforms.time.value = Math.sin(
        Math.PI * 2 * time * 0.088
      );

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
