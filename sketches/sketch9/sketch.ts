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
  //

  // PRVO SI NARAVNO POSTAVIO SAM ICOSAHEDRON TAMO GDE SI POSTAVIO I SPHERE
  // CISTO RADI PROVERE OVO RADIM

  const icosaGeometry = new global.THREE.IcosahedronGeometry(2, 1);

  const icoMaterial = new global.THREE.MeshNormalMaterial({
    flatShading: true,
  });

  const icosaMesh = new global.THREE.Mesh(icosaGeometry, icoMaterial);

  // ------------------  DODAVANJE ICOSAHEDRON VERTICES-OVA INTO FRAGMENT SHADER ----

  // ------------------------------------------------------------------------------
  const icoVertices = icosaMesh.geometry.vertices; // OVO JE MOGLO DA SE UZME I DIREKTNO SA GEOMETRIJE, ALI NEMA VEZE

  const vertexShader = glsl(/* glsl */ `

    varying vec2 vUv;
    varying vec3 vPosition;

    void main(){

      vUv = uv;
      vPosition = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);

    }


  `);

  const fragmentShader = glsl(/* glsl */ `
    varying vec2 vUv;
    varying vec3 vPosition;

    uniform vec3 temena[BROJ_TEMENA];

    uniform vec3 color;
    uniform float time;


    void main(){

      // OVO MU DODJE KAO VARIJABLA KOJA JE IZVAN LOOP-A A U KOJU STAVLJAM VREDNOST min-A

      float dist = 10000.0;

      for (int i = 0; i < BROJ_TEMENA; i++){
        // TRENUTNI VERTEX; ODNSNO TRENUTNO TEME
        vec3 vertice = temena[i];

        float d = distance(vPosition, vertice);

        dist = min(d, dist);
      }

      // BITNO JE DA SI DODAO DIST, A OVO SA SINUSOM CE KREIRATI ANIMACIJU
      float mask = step(0.25 + sin(time + vUv.y * 16.58) * 0.18, dist);



      vec3 fragColor = mix(color * 0.61, vec3(0.6, 0.2, cos(vUv.y * time) * 0.4),mask);



      gl_FragColor = vec4(fragColor, 1.0);

    }


  `);

  //
  const sphereGeo = new global.THREE.SphereGeometry(2, 12, 12);
  //
  const sphereShaderMaterial = new global.THREE.ShaderMaterial({
    // wireframe: true,
    // DODAJEM SHADER
    vertexShader,
    fragmentShader,

    // DODAJE UNIFORMS
    uniforms: {
      temena: { value: icoVertices },
      color: { value: new global.THREE.Color("crimson") },
      time: { value: 0 },
    },
    // DODAJEM DEFINES
    defines: {
      BROJ_TEMENA: icoVertices.length,
    },
  });

  const sphereMesh = new global.THREE.Mesh(sphereGeo, sphereShaderMaterial);

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

  icosaMesh.position.fromArray(sphereMesh.position.toArray());

  // scene.add(icosaMesh);

  // sphereMesh.scale.setScalar(2.4);
  scene.add(sphereMesh);
  /*
  sphereMesh.position.y = 2.6; */

  // OVO JE SAMO ZA PROVERU DA LI KRUGOVE LEZE NA PRAVOM MESTU, KASNIJE SE MOZE UKLONITI

  const circleGeo = new global.THREE.CircleGeometry(0.1);
  const circleMaterial = new global.THREE.MeshNormalMaterial({
    side: global.THREE.BackSide,
  });

  icoVertices.forEach((vec3) => {
    const circleMesh = new global.THREE.Mesh(circleGeo, circleMaterial);

    circleMesh.position.fromArray(vec3.toArray());

    circleMesh.lookAt(0, 0, 0);

    // scene.add(circleMesh);
  });

  // --------------------- CAMERA, CONTROLS --------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------
  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(10, 6, 3);

  camera.lookAt(new global.THREE.Vector3());

  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);
  //

  // ----------------------------------------------------------------
  // ---------------------- LIGHT, HELPERS --------------------------
  const light = new global.THREE.PointLight("white", 1);
  light.position.y = 9;
  light.position.z = 9;
  scene.add(light);

  // helpers
  // scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
  scene.add(new global.THREE.AxesHelper(4));
  scene.add(new global.THREE.PointLightHelper(light));

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
      // ---------------------------------------------
      sphereShaderMaterial.uniforms.time.value = time * Math.PI * 0.2;
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
