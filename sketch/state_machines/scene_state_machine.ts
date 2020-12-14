// -- types
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector3,
  PointLight,
  GridHelper,
  AxesHelper,
  PointLightHelper,
} from "three";
import { threeType } from "../my_types";
//

global.THREE = require("three") as threeType;

//
import { createMachine, assign, interpret, actions } from "xstate";

// -----  CONSTANTS  ------
import { THICK_RATE } from "../constants";
import { exit } from "process";

// ---- FINITE STATES  n'   EVENTS ----

export enum fse {
  init = "init",
  idle = "idle",
}

export enum EE {
  INIT_SCENE = "INIT_SCENE",
}

// ----------------------------------

// ---- MACHINES GENERIC TYPRES ----------------------
//-----------------------------------------------------
interface MachineContextGenericI {
  //
  canvas: HTMLCanvasElement | null;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  cameraLookAtVector: Vector3 | null;
  lights: {
    pointLight: PointLight | null;
  };
  helpers: {
    grid: GridHelper | null;
    axes: AxesHelper | null;
    pointLightHelper: PointLightHelper | null;
  };
  controls: any;
}

type machineEventGenericType = {
  type: EE.INIT_SCENE;
  payload: {
    canvas: HTMLCanvasElement;
  };
};

type machineFiniteStateGenericType =
  | {
      value: fse.init;
      context: {
        canvas: HTMLCanvasElement | null;
        renderer: WebGLRenderer | null;
        scene: Scene | null;
        camera: PerspectiveCamera | null;
        cameraLookAtVector: Vector3 | null;
        lights: {
          pointLight: PointLight | null;
        };
        helpers: {
          grid: GridHelper | null;
          axes: AxesHelper | null;
          pointLightHelper: PointLightHelper | null;
        };
        controls: any;
      };
    }
  | {
      value: fse.idle;
      context: {
        canvas: HTMLCanvasElement;
        renderer: WebGLRenderer;
        scene: Scene;
        camera: PerspectiveCamera;
        cameraLookAtVector: Vector3;
        lights: {
          pointLight: PointLight;
        };
        helpers: {
          grid: GridHelper;
          axes: AxesHelper;
          pointLightHelper: PointLightHelper;
        };
        controls: any;
      };
    };

// -----------------------------------

// -------------------------------------------------------
// ------------------- MACHINE ---------------------------
// -------------------------------------------------------

const sceneMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>({
  id: "sketch_state_machine",
  initial: fse.init,
  context: {
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    cameraLookAtVector: null,
    lights: {
      pointLight: null,
    },
    helpers: {
      grid: null,
      axes: null,
      pointLightHelper: null,
    },
    controls: null,
  },
  states: {
    [fse.init]: {
      on: {
        [EE.INIT_SCENE]: {
          target: fse.idle,
          actions: [
            assign((_, { payload: { canvas } }) => {
              return {
                canvas,
              };
            }),
          ],
        },
      },
      exit: [
        assign(({ canvas }) => {
          return {
            renderer: new global.THREE.WebGLRenderer({ canvas }),
          };
        }),
        assign(() => {
          return {
            scene: new global.THREE.Scene(),
            camera: new global.THREE.PerspectiveCamera(50, 1, 0.01, 100),
            cameraLookAtVector: new global.THREE.Vector3(),
          };
        }),
        assign(({ canvas, camera, lights, helpers }) => {
          return {
            // eslint-disable-next-line
            // @ts-ignore
            controls: new global.THREE.OrbitControls(camera, canvas),
            lights: {
              ...lights,
              pointLight: new global.THREE.PointLight("white", 1),
            },
            helpers: {
              ...helpers,
              axes: new global.THREE.AxesHelper(4),
              grid: new global.THREE.GridHelper(8, 58, "purple", "olive"),
              pointLightHelper: new global.THREE.PointLightHelper(
                lights.pointLight
              ),
            },
          };
        }),
        ({
          renderer,
          camera,
          cameraLookAtVector,
          lights: { pointLight },
          scene,
          helpers,
        }): void => {
          renderer.setClearColor("#000");
          camera.position.set(-44, 12.08, 38);
          camera.lookAt(cameraLookAtVector);
          pointLight.position.set(19, 12, -54);

          scene
            .add(pointLight)
            .add(helpers.axes)
            .add(helpers.grid)
            .add(helpers.pointLightHelper);
        },
      ],
    },
  },
});

// -----------------------------------------------------
// -----------------------------------------------------

export const sceneService = interpret(sceneMachine);

sceneService.onTransition((state, event) => {
  console.log("SKETCH STATE MACHINE");
  console.log(`TRANSITIONING TO - ${state.value} - FINITE STATE`);
  console.log(`COSEQUENCE OF - ${event.type} - EVENT`);
  console.log("-------------------------------------");
});

sceneService.start();
