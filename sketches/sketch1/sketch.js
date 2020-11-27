"use strict";
exports.__esModule = true;
var glsl = require("glslify");
var Random = require("canvas-sketch-util/random");
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
var canvasSketch = require("canvas-sketch");
var settings = {
    animate: true,
    context: "webgl"
};
var sketch = function (_a) {
    var context = _a.context;
    // Create a renderer
    var renderer = new global.THREE.WebGLRenderer({
        canvas: context.canvas
    });
    renderer.setClearColor("#fff", 1);
    var camera = new global.THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(0, 0, -4);
    camera.lookAt(new global.THREE.Vector3());
    // eslint-disable-next-line
    // @ts-ignore
    var controls = new global.THREE.OrbitControls(camera, context.canvas);
    var scene = new global.THREE.Scene();
    // const geometry = new global.THREE.BoxGeometry(1, 1, 1);
    var geometry = new global.THREE.SphereGeometry(1, 16, 32);
    var baseGeom = new global.THREE.IcosahedronGeometry(1, 1);
    var points = baseGeom.vertices;
    var vertexShader = glsl(/* glsl */ "\n\n    varying vec3 vPosition;\n\n    varying vec2 vUv;\n\n    void main(){\n\n      vUv = uv;\n\n      vPosition = position;\n\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);\n\n    }\n\n  ");
    // DAKLE DODAO SAM COLOR MIX DOLE
    var fragmentShader = glsl(/* glsl */ "\n\n    #define PI 3.14;\n\n    // #define int POINT_COUNT;\n\n    #pragma glslify: noise = require(glsl-noise/simplex/3d)\n\n    varying vec3 vPosition;\n\n\n    uniform vec3 points[POINT_COUNT];\n\n    varying vec2 vUv;\n    uniform vec3 color;\n    uniform float time;\n\n    void main(){\n\n      float dist = 10000.0;\n\n\n      for (int i = 0; i < POINT_COUNT; i++){\n        vec3 p = points[i];\n        float d = distance(vPosition, p);\n\n        dist = min(d, dist);\n      }\n\n      float mask = step(0.16, dist);\n\n      mask = 1.0 - mask;\n\n      vec3 fragColor = mix(color, vec3(1.0), mask);\n\n      gl_FragColor = vec4(vec3(fragColor), 1.0);\n    }\n  ");
    var material = new global.THREE.ShaderMaterial({
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
        uniforms: {
            color: { value: new global.THREE.Color("crimson") },
            time: { value: 0 },
            points: { value: points }
        },
        defines: {
            POINT_COUNT: points.length
        }
    });
    var mesh = new global.THREE.Mesh(geometry, material);
    mesh.rotation.x = 4;
    mesh.rotation.z = 4;
    scene.add(mesh);
    return {
        // Handle resize events here
        resize: function (_a) {
            var pixelRatio = _a.pixelRatio, viewportWidth = _a.viewportWidth, viewportHeight = _a.viewportHeight;
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(viewportWidth, viewportHeight, false);
            camera.aspect = viewportWidth / viewportHeight;
            camera.updateProjectionMatrix();
        },
        // Update & render your scene here
        render: function (_a) {
            var time = _a.time, playhead = _a.playhead;
            material.uniforms.time.value = time;
            // material.uniforms.time.value = playhead * Math.PI * 2;
            // mesh.rotation.z = playhead * Math.PI * 2;
            // mesh.rotation.y = playhead * Math.PI * 2;
            // ---------------------------------------------
            controls.update();
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload: function () {
            controls.dispose();
            renderer.dispose();
        }
    };
};
canvasSketch(sketch, settings);
/* export default () => {
  canvasSketch(sketch, settings);
};
 */
