const glsl = require("glslify");
const Random = require("canvas-sketch-util/random");
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");
const settings = {
    animate: true,
    context: "webgl",
    duration: 18,
};
const settingsFunc = (settings, canvas) => {
    if (canvas) {
        settings.canvas = canvas;
    }
    return settings;
};
const sketch = ({ context }) => {
    // Create a renderer
    const renderer = new global.THREE.WebGLRenderer({
        canvas: context.canvas,
    });
    renderer.setClearColor("#3a3d42", 1);
    const camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(0, 0, -4);
    camera.lookAt(new global.THREE.Vector3());
    // eslint-disable-next-line
    // @ts-ignore
    const controls = new global.THREE.OrbitControls(camera, context.canvas);
    const scene = new global.THREE.Scene();
    const geometry = new global.THREE.SphereGeometry(1, 16, 32);
    const baseGeom = new global.THREE.IcosahedronGeometry(1, 1);
    const points = baseGeom.vertices;
    const vertexShader = glsl(/* glsl */ `

    varying vec3 vPosition;

    varying vec2 vUv;

    void main(){

      vUv = uv;
      vPosition = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);

    }

  `);
    // DAKLE DODAO SAM COLOR MIX DOLE
    const fragmentShader = glsl(/* glsl */ `

    #define PI 3.14;

    // #define int POINT_COUNT;

    #pragma glslify: noise = require(glsl-noise/simplex/3d)

    varying vec2 vUv;
    varying vec3 vPosition;

    uniform vec3 points[POINT_COUNT];

    uniform vec3 color;
    uniform float time;

    void main(){


      vec3 fragColor = vec3(0.2, 0.6, 0.2);


      gl_FragColor = vec4(vec3(fragColor), 1.0);
    }
  `);
    const material = new global.THREE.ShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: {
            color: { value: new global.THREE.Color("crimson") },
            time: { value: 0 },
            points: { value: points },
        },
        defines: {
            POINT_COUNT: points.length,
        },
    });
    const mesh = new global.THREE.Mesh(geometry, material);
    mesh.rotation.x = 4;
    mesh.rotation.z = 4;
    scene.add(mesh);
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
            // material.uniforms.time.value = time;
            material.uniforms.time.value = playhead * Math.PI * 2;
            // mesh.rotation.z = playhead * Math.PI * 2;
            // mesh.rotation.y = playhead * Math.PI * 2;
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
