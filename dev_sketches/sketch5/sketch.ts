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

  // GEOMETRY MATERIAL AND MESH
  const boxGeometry = new global.THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
  //

  const boxMaterial = new global.THREE.MeshNormalMaterial({
    // color: "crimson",
    // wireframe: true,
  });

  const boxMesh = new global.THREE.Mesh(boxGeometry, boxMaterial);

  // scene.add(boxMesh);

  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------

  const color1 = new global.THREE.Color("crimson");

  const icoPosition = new global.THREE.Vector3(0, 0, 0);

  icoPosition.setScalar(2);

  const icosahedronGeometry = new global.THREE.IcosahedronGeometry(1, 1);
  const icosahedronMaterial = new global.THREE.MeshStandardMaterial({
    color: "purple",
    flatShading: true,
  });

  const icosahMesh = new global.THREE.Mesh(
    icosahedronGeometry,
    icosahedronMaterial
  );

  const colorVec3 = new global.THREE.Vector3(0.4, 0.6, 0.8);

  icosahedronMaterial.color.copy(color1);
  icosahedronMaterial.color.setScalar(0.8);

  icosahedronMaterial.color.r = 0.1;
  icosahedronMaterial.color.g = 0.4;
  icosahedronMaterial.color.b = 0.6;

  icosahedronMaterial.color.setHSL(0.4, 0.6, 0.8);

  icosahMesh.position.copy(icoPosition);

  icosahMesh.position.set(2, 0, 0);

  const coords = [-2, 2, -2];
  icosahMesh.position.fromArray(coords);

  icosahMesh.rotation.y = 2;

  const rotationEuler = new global.THREE.Euler(8, 3 * 3.14 - 1, 0);

  icosahMesh.rotation.copy(rotationEuler);

  icosahMesh.scale.x = 2;

  // scene.add(icosahMesh);

  console.log(icosahMesh.position.toArray());

  // DRAWING TRIANGLES -----------------------------------------------
  // -----------------------------------------------------------------

  const trianglesGeometry = new global.THREE.Geometry();

  const vertices: globalThis.THREE.Vector3[] = [
    new global.THREE.Vector3(0, 1, 0),
    new global.THREE.Vector3(1, 0, 0),
    new global.THREE.Vector3(0, 0, 0),
    new global.THREE.Vector3(1, 1, 0),
  ];
  const faces: globalThis.THREE.Face3[] = [
    new global.THREE.Face3(0, 1, 2),
    new global.THREE.Face3(0, 3, 1),
  ];

  const trianglesMaterial = new global.THREE.MeshNormalMaterial({
    side: global.THREE.DoubleSide,
    colorWrite: true,
  });
  const trianglesMesh = new global.THREE.Mesh(
    trianglesGeometry,
    trianglesMaterial
  );

  trianglesGeometry.vertices = vertices;
  trianglesGeometry.faces = faces;

  trianglesGeometry.computeVertexNormals();

  trianglesMesh.position.setScalar(4);

  scene.add(trianglesMesh);

  // OTHER TRIANGLE
  // OTHER TRIANGLE
  // OTHER TRIANGLE
  // OTHER TRIANGLE

  const trianglesGeometry2 = new global.THREE.BufferGeometry();

  const vertices2: globalThis.THREE.Vector3[] = [
    new global.THREE.Vector3(0, 1, 0),
    new global.THREE.Vector3(1, 0, 0),
    new global.THREE.Vector3(0, 0, 0),
    new global.THREE.Vector3(1, 1, 0),
  ];
  const faces2: number[][] = [
    [0, 1, 2],
    [0, 3, 1],
  ];

  const flatFaces = faces2.flat();

  const facesArray = new Uint16Array(flatFaces);
  const facesAttribute = new global.THREE.BufferAttribute(facesArray, 1);
  trianglesGeometry2.setIndex(facesAttribute);

  const flatVertices = vertices2
    .map((vec3) => {
      const coordsArr = vec3.toArray();

      return coordsArr;
    })
    .flat();

  const fArray = new Float32Array(flatVertices);

  const vertsAttribute = new global.THREE.BufferAttribute(fArray, 3);

  console.log({ vertsAttribute, facesAttribute });

  const trianglesMaterial2 = new global.THREE.MeshNormalMaterial({
    side: global.THREE.DoubleSide,
    colorWrite: true,
  });
  const trianglesMesh2 = new global.THREE.Mesh(
    trianglesGeometry2,
    trianglesMaterial2
  );

  trianglesGeometry2.setAttribute("position", vertsAttribute);

  trianglesGeometry2.computeVertexNormals();

  scene.add(trianglesMesh2);

  // --------------------- CAMERA, CONTROLS --------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------
  const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(6, 4, 4);

  camera.lookAt(new global.THREE.Vector3());

  // eslint-disable-next-line
  // @ts-ignore
  const controls = new global.THREE.OrbitControls(camera, context.canvas);
  //

  // LIGHT, HELPERS
  const light = new global.THREE.PointLight("white", 1);
  light.position.y = 9;
  light.position.z = 9;
  scene.add(light);

  // helpers
  scene.add(new global.THREE.GridHelper(8, 58, "purple", "olive"));
  scene.add(new global.THREE.AxesHelper(4));
  scene.add(new global.THREE.PointLightHelper(light));

  // -----------------------------------------------------------
  // -----------------------------------------------------------

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
