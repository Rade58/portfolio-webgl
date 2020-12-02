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

  //
  const sphereGeo = new global.THREE.SphereGeometry(2, 12, 12);
  //
  const sphereShaderMaterial = new global.THREE.ShaderMaterial({
    wireframe: true,
  });

  const sphereMesh = new global.THREE.Mesh(sphereGeo, sphereShaderMaterial);

  // sphereMesh.scale.setScalar(2.4);
  scene.add(sphereMesh);
  /*
  sphereMesh.position.y = 2.6; */

  // PRVO SI NARAVNO POSTAVIO SAM ICOSAHEDRON TAMO GDE SI POSTAVIO I SPHERE
  // CISTO RADI PROVERE OVO RADIM

  const icosaGeometry = new global.THREE.IcosahedronGeometry(2, 1);

  const icoMaterial = new global.THREE.MeshNormalMaterial({
    flatShading: true,
  });

  const icosaMesh = new global.THREE.Mesh(icosaGeometry, icoMaterial);

  icosaMesh.position.fromArray(sphereMesh.position.toArray());

  scene.add(icosaMesh);

  // KAD SAM GA STAVIO UZIMAM MU VERTICES

  const icoVertices = icosaMesh.geometry.vertices;

  // NA TIM VERTICES-OVIM STAVLJAM MESH-EVE KRUGOVA

  const circleGeo = new global.THREE.CircleGeometry(0.1);

  const circleMaterial = new global.THREE.MeshNormalMaterial({});

  icoVertices.forEach((vec3) => {
    const circleMesh = new global.THREE.Mesh(circleGeo, circleMaterial);

    circleMesh.position.fromArray(vec3.toArray());

    circleMesh.lookAt(0, 0, 0);

    scene.add(circleMesh);
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
