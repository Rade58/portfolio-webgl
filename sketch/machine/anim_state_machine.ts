import { Vector3, Object3D, ShaderMaterial, Mesh } from "three";
import { TweenMax, TimelineLite } from "gsap";
import { createMachine, assign, interpret } from "xstate";
import { textDisplay } from "../ui/user_interface";

export enum fse {
  init = "init",
  idle = "idle",
  // hello world
  hello_world = "hello_world",
  //---- major -states (all of them shoud have transitions to idle)
  aboutme = "aboutme",
  projects = "projects",
  blog = "blog",
  //
  up_or_down = "up_or_down",
}

export enum EE {
  SETUP = "SETUP",
  /* CHANGE_TO_ABOUT_ME = "CHANGE_TO_ABOUT_ME",
  CHANGE_TO_BLOG = "CHANGE_TO_BLOG",
  CHANGE_TO_PROJECTS = "CHANGE_TO_PROJECTS", */
  SWITCH = "SWITCH",
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  HELLO = "HELLO",
}

const MAJOR_FINITE_STATES_ARRAY = [fse.aboutme, fse.projects, fse.blog];
const MAJOR_FS_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

// context HELPER TYPE ---------------------
interface ContextFullI {
  majorFiniteStatesArr: string[];
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number;
  tl: TimelineLite;
  up: boolean;
  canMoveToIdle: boolean;
  seaPlaneShaderMaterial: ShaderMaterial;
  seaPlaneShaderMaterialWireframed: ShaderMaterial;
  seaWireframeShaderMaterial: ShaderMaterial;
  planeMiddleShaderMaterial: ShaderMaterial;
  seaPlaneMesh: Mesh;
  cageMesh: Mesh;
  spaceshipMesh: Mesh;
  middlePlaneMesh: Mesh;

  controls: {
    target: Vector3;
    object: Object3D;
    update: () => void;
    dispose: () => void;
  };
}

// ------------ GENERIC TYPES FOR MACHINE

interface MachineContextGenericI {
  majorFiniteStatesArr: string[];
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number;
  tl: TimelineLite;
  up: boolean;
  canMoveToIdle: boolean;
  // materials
  seaPlaneShaderMaterial: ShaderMaterial | null;
  seaPlaneShaderMaterialWireframed: ShaderMaterial | null;
  seaWireframeShaderMaterial: ShaderMaterial | null;
  planeMiddleShaderMaterial: ShaderMaterial | null;
  // meshe|nulls
  seaPlaneMesh: Mesh | null;
  cageMesh: Mesh | null;
  spaceshipMesh: Mesh | null;
  middlePlaneMesh: Mesh | null;

  // controls
  controls: {
    target: Vector3;
    object: Object3D;
    update: () => void;
    dispose: () => void;
  } | null;
}

type machineEventGenericType =
  | {
      type: EE.SETUP;
      payload: {
        seaPlaneShaderMaterial: ShaderMaterial;
        seaPlaneShaderMaterialWireframed: ShaderMaterial;
        seaWireframeShaderMaterial: ShaderMaterial;
        planeMiddleShaderMaterial: ShaderMaterial;
        seaPlaneMesh: Mesh;
        cageMesh: Mesh;
        spaceshipMesh: Mesh;
        middlePlaneMesh: Mesh;
        controls: {
          target: Vector3;
          object: Object3D;
          update: () => void;
          dispose: () => void;
        };
      };
    }
  | {
      type: EE.SWITCH;
    }
  | {
      type: EE.MOVE_UP;
    }
  | {
      type: EE.MOVE_DOWN;
    }
  | {
      type: EE.HELLO;
    };

type machineFiniteStateGenericType =
  | {
      value: fse.init;
      context: MachineContextGenericI;
    }
  | {
      value: fse.idle;
      context: ContextFullI;
    }
  | {
      value: fse.aboutme;
      context: ContextFullI;
    }
  | {
      value: fse.projects;
      context: ContextFullI;
    }
  | {
      value: fse.blog;
      context: ContextFullI;
    }
  | {
      value: fse.up_or_down;
      context: ContextFullI;
    }
  | {
      value: fse.hello_world;
      context: ContextFullI;
    };

//---------------------------------------

//---------------------------------------
// ------------- MACHINE ----------------
//---------------------------------------

const animMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>(
  {
    id: "sketch_anim_machine",
    initial: fse.hello_world,
    context: {
      majorFiniteStatesArr: MAJOR_FINITE_STATES_ARRAY,
      majorFiniteStatesArrLength: MAJOR_FS_ARR_LENGTH,
      currentMajorStateNum: 2,
      up: false,
      canMoveToIdle: true,
      tl: new TimelineLite(),
      cageMesh: null,
      controls: null,
      middlePlaneMesh: null,
      planeMiddleShaderMaterial: null,
      seaPlaneMesh: null,
      seaPlaneShaderMaterial: null,
      seaPlaneShaderMaterialWireframed: null,
      seaWireframeShaderMaterial: null,
      spaceshipMesh: null,
    },
    // on: {},
    states: {
      [fse.init]: {
        on: {
          [EE.SETUP]: {
            actions: assign(
              (
                _,
                {
                  payload: {
                    cageMesh,
                    controls,
                    middlePlaneMesh,
                    planeMiddleShaderMaterial,
                    seaPlaneMesh,
                    seaPlaneShaderMaterial,
                    seaPlaneShaderMaterialWireframed,
                    seaWireframeShaderMaterial,
                    spaceshipMesh,
                  },
                }
              ) => ({
                cageMesh,
                controls,
                middlePlaneMesh,
                planeMiddleShaderMaterial,
                seaPlaneMesh,
                seaPlaneShaderMaterial,
                seaPlaneShaderMaterialWireframed,
                seaWireframeShaderMaterial,
                spaceshipMesh,
              })
            ),
            target: fse.hello_world,
          },
        },
      },
      [fse.hello_world]: {
        on: {
          [EE.HELLO]: {
            target: fse.up_or_down,
          },
        },
      },
      [fse.up_or_down]: {
        on: {
          [EE.MOVE_UP]: {
            actions: [
              assign((_, __) => ({ up: true })),
              assign(
                ({ currentMajorStateNum, majorFiniteStatesArrLength }, _) => {
                  if (
                    currentMajorStateNum + 1 >
                    majorFiniteStatesArrLength - 1
                  ) {
                    return { currentMajorStateNum: 0 };
                  }
                  return { currentMajorStateNum: currentMajorStateNum + 1 };
                }
              ),
            ],
            target: fse.idle,
          },
          [EE.MOVE_DOWN]: {
            actions: [
              assign((_, __) => ({ up: false })),
              assign(
                ({ currentMajorStateNum, majorFiniteStatesArrLength }, _) => {
                  if (currentMajorStateNum - 1 < 0) {
                    return {
                      currentMajorStateNum: majorFiniteStatesArrLength - 1,
                    };
                  }

                  return { currentMajorStateNum: currentMajorStateNum - 1 };
                }
              ),
            ],
            target: fse.idle,
          },
        },
      },
      [fse.idle]: {
        on: {
          [EE.SWITCH]: [
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 0;
              },

              //
              target: MAJOR_FINITE_STATES_ARRAY[0],
            },
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 1;
              },

              //
              target: MAJOR_FINITE_STATES_ARRAY[1],
            },
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 2;
              },

              //
              target: MAJOR_FINITE_STATES_ARRAY[2],
            },
          ],

          // ---------------------------------------------
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[0] /* aboutme */]: {
        entry: assign((_, __) => {
          return { canMoveToIdle: false };
        }),
        on: {
          "*": {
            actions: [
              assign(({ tl }, __) => {
                // ZAVISICE OD    TIMELINE-A
                // OVAJ PROPERTI CE DAKLE ZAVISITI
                return { canMoveToIdle: true };
              }),
            ],
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[1] /* projects */]: {
        entry: assign((_, __) => {
          return { canMoveToIdle: false };
        }),
        on: {
          "*": {
            actions: [
              assign(({ tl }, __) => {
                // ZAVISICE OD    TIMELINE-A
                return { canMoveToIdle: true };
              }),
            ],
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[2] /* blog */]: {
        entry: assign((_, __) => {
          return { canMoveToIdle: false };
        }),
        on: {
          "*": {
            actions: [
              assign(({ tl }, __) => {
                // ZAVISICE OD    TIMELINE-A
                return { canMoveToIdle: true };
              }),
            ],
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
    },
  },
  {
    guards: {
      allowIdle: (context, event) => {
        const { canMoveToIdle } = context;
        return canMoveToIdle;
      },
    },
  }
);

export const animMachineService = interpret(animMachine);

animMachineService.onTransition((state, event) => {
  console.log("ANIM MACHINE STATE MACHINE");
  console.log(`TRANSITIONING TO - ${state.value} - FINITE STATE`);
  console.log(`COSEQUENCE OF - ${event.type} - EVENT`);
  console.log("CONTEXT:");
  console.log(state.context);
  console.log("-------------------------------------");

  textDisplay.textContent = state.value as string;
});

animMachineService.start();
