import { Vector3, Object3D, ShaderMaterial, Mesh } from "three";
import { TweenMax, TimelineMax, Elastic, Quad } from "gsap";
import { createMachine, assign, interpret } from "xstate";
import { textDisplay } from "../ui/user_interface";

export enum fse {
  init = "init",
  idle = "idle",
  // hello world   // MOGUCE DA JE NOOP
  hello_world = "hello_world",
  //
  anim_error = "anim_error",
  //---- major -states (all of them shoud have transitions to idle)
  aboutme = "aboutme",
  projects = "projects",
  blog = "blog",
  // ANIMATION STATES
  animation0 = "animation0",
  animation1 = "animation1",
  animation2 = "animation2",
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
const ANIMATION_SERVICES_STATE_ARRAY = [
  fse.animation0,
  fse.animation1,
  fse.animation2,
];

const MAJOR_FS_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

// context HELPER TYPE ---------------------
interface ContextFullI {
  majorFiniteStatesArr: string[];
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number;
  tl: TimelineMax;
  up: boolean;
  canMoveToIdleAgain: boolean;
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
  tl: TimelineMax;
  up: boolean;
  canMoveToIdleAgain: boolean;
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
    }
  | { value: fse.animation0; context: ContextFullI }
  | { value: fse.animation1; context: ContextFullI }
  | { value: fse.animation2; context: ContextFullI }
  | { value: fse.anim_error; context: ContextFullI };

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
    initial: fse.init,
    context: {
      majorFiniteStatesArr: MAJOR_FINITE_STATES_ARRAY,
      majorFiniteStatesArrLength: MAJOR_FS_ARR_LENGTH,
      currentMajorStateNum: 2,
      up: false,
      canMoveToIdleAgain: true,
      tl: new TimelineMax(),
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
            target: fse.up_or_down,
          },
        },
      },
      [fse.hello_world]: {
        /* on: {
          [EE.HELLO]: {
            target: fse.up_or_down,
          },
        }, */
        type: "final",
      },
      [fse.up_or_down]: {
        on: {
          [EE.MOVE_UP]: {
            actions: [
              assign((_, __) => ({ up: true })), // MOZDE BESPOTREBNO
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
              assign((_, __) => ({ up: false })), // MOZDE BESPOTREBNO
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
            // E OVI TRANSITIONI CE SE DESITI U ODNOSU NA
            // context.currentMajorStateNum
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 0;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[0],
            },
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 1;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[1],
            },
            {
              cond: ({ currentMajorStateNum }) => {
                return currentMajorStateNum === 2;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[2],
            },
          ],
        },
      },
      // OVI SU STATE-OVI U KOJIMA CU KORISTITI invoke
      // UPRAVO ZBOG ANIMACIJE
      // ------------------------------------------------------
      // ------------------------------------------------------

      [ANIMATION_SERVICES_STATE_ARRAY[0] /* animation0 */]: {
        invoke: {
          id: "__0__",
          src: (
            {
              tl,
              seaPlaneShaderMaterial,
              seaPlaneShaderMaterialWireframed,
              planeMiddleShaderMaterial,
              cageMesh,
            },
            __
          ) => {
            // DAKLE INVOKUJEM PROMISE-E
            // USTVARI INVOKE-UJEM ANIMATION SERVICE

            // tl.pause();

            tl.to(
              [
                seaPlaneShaderMaterial.uniforms.circleSize,
                seaPlaneShaderMaterialWireframed.uniforms.circleSize,
                planeMiddleShaderMaterial.uniforms.circleSize,
              ],
              {
                value: 0.8,
                ease: Elastic.easeOut,
                duration: 3,
              }
            )
              .to(
                cageMesh.position,
                {
                  y: 148,
                  ease: Quad.easeOut,
                  duration: 2,
                },
                "-=3"
              )
              .to(cageMesh.scale, {
                x: 10.4,
                y: 10.4,
                z: 10.4,
                duration: 0.5,
              })
              .to(
                cageMesh.position,
                {
                  y: 128,
                },
                "-=0.5"
              );

            return tl.play().then(() => {
              console.log("animation0");

              tl.pause();
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[0],
          },
          onError: {
            target: fse.anim_error,
          },
        },
      },
      [ANIMATION_SERVICES_STATE_ARRAY[1] /* animation0 */]: {
        invoke: {
          id: "__1__",
          src: ({ tl, seaPlaneShaderMaterial }, __) => {
            return Promise.resolve().then(() => {
              return tl.to(seaPlaneShaderMaterial.uniforms.circleSize, {
                value: 0,
                ease: Elastic.easeOut,
              });
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[1],
          },
          onError: {
            target: fse.anim_error,
          },
        },
      },
      [ANIMATION_SERVICES_STATE_ARRAY[2] /* animation0 */]: {
        invoke: {
          id: "__2__",
          src: ({ tl, seaPlaneMesh, seaPlaneShaderMaterial }, __) => {
            return Promise.resolve().then(() => {
              seaPlaneMesh.material = seaPlaneShaderMaterial;
              seaPlaneMesh.material.needsUpdate = true;

              return "anything";
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[2],
          },
          onError: {
            target: fse.anim_error,
          },
        },
      },
      //-------------------------------------------------------
      [MAJOR_FINITE_STATES_ARRAY[0] /* aboutme */]: {
        on: {
          "*": {
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[1] /* projects */]: {
        on: {
          "*": {
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[2] /* blog */]: {
        on: {
          "*": {
            cond: "allowIdle",
            target: fse.up_or_down,
          },
        },
      },
      [fse.anim_error]: {
        entry: () => {
          console.log("Something wrong with Animation");
        },
        type: "final",
      },
    },
  },
  {
    guards: {
      allowIdle: (context, event) => {
        const { canMoveToIdleAgain } = context;
        return canMoveToIdleAgain;
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
