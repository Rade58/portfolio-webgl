const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");
const settings = {
    animate: true,
    context: "webgl",
    duration: 28,
};
const settingsFunc = (settings, canvas) => {
    if (canvas) {
        settings.canvas = canvas;
    }
    return settings;
};
const sketch = ({ context }) => {
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
    scene.add(boxMesh);
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    const icoPosition = new global.THREE.Vector3(0, 0, 0);
    icoPosition.setScalar(2);
    const icosahedronGeometry = new global.THREE.IcosahedronGeometry(1, 1);
    const icosahedronMaterial = new global.THREE.MeshNormalMaterial({
        // color: "crimson",
        flatShading: true,
    });
    const icosahMesh = new global.THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahMesh.position.copy(icoPosition);
    icosahMesh.position.set(2, 0, 0);
    const coords = [0, 0, 0];
    icosahMesh.position.fromArray(coords);
    scene.add(icosahMesh);
    // --------------------- CAMERA, CONTROLS --------------------
    // -----------------------------------------------------------
    // -----------------------------------------------------------
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(4, 0, 0);
    camera.lookAt(new global.THREE.Vector3());
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    //
    // LIGHT, HELPERS
    const light = new global.THREE.PointLight("white", 1);
    light.position.y = 4;
    light.position.z = 4;
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
canvasSketch(sketch, settingsFunc(settings, document.querySelector("canvas.canvas")));
export {};
