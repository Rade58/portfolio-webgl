import { Vector3, Object3D, ShaderMaterial, Mesh } from "three";
import { TweenMax, TimelineMax, Elastic, Quad, Power1, Power4 } from "gsap";
import { createMachine, assign, interpret } from "xstate";
import { textDisplay } from "../ui/user_interface";

export enum fse {
  init = "init",
  idle = "idle",

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
}

export enum EE {
  SETUP = "SETUP",
  /* CHANGE_TO_ABOUT_ME = "CHANGE_TO_ABOUT_ME",
  CHANGE_TO_BLOG = "CHANGE_TO_BLOG",
  CHANGE_TO_PROJECTS = "CHANGE_TO_PROJECTS", */
  SWITCH = "SWITCH",
  /* MOVE_UP = "MOVE_UP",  // DEPRECATED
  MOVE_DOWN = "MOVE_DOWN", */
  MOVE = "MOVE",
  // HELLO = "HELLO", // DEPRECATED
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
  // OVO JE HELPER KOJI CE BELEZITI POSLEDNI MAJOR STATE
  // PRE PRELEASKA TO IDLE (TO CE MI IZUZETNO SLUZITI
  // JER CU TEKST DISPLAY-OVATI U ODNOSU NA TAJ MAJOR STATE)
  majorStateAfterIdle: typeof MAJOR_FINITE_STATES_ARRAY[number];
  //
  majorFiniteStatesArr: typeof MAJOR_FINITE_STATES_ARRAY;
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number;
  // TREBALO BI DA PRATIM I BROJ ANIMACIJE, JER MOGUCE JE DA CES IMATI
  // VISE ANIAMCIJA NEGO STO BUDES IMAO MAJOR STATE-OVA
  currentAnimationServiceNumber: number;
  animationServicesArray: typeof ANIMATION_SERVICES_STATE_ARRAY;
  animationsServiceArrayLength: number;
  //
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
  majorStateAfterIdle: typeof MAJOR_FINITE_STATES_ARRAY[number];
  majorFiniteStatesArr: string[];
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number;
  currentAnimationServiceNumber: number;
  animationServicesArray: typeof ANIMATION_SERVICES_STATE_ARRAY;
  animationsServiceArrayLength: number;
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
      type: EE.MOVE;
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
      majorStateAfterIdle: MAJOR_FINITE_STATES_ARRAY[0],
      majorFiniteStatesArr: MAJOR_FINITE_STATES_ARRAY,
      majorFiniteStatesArrLength: MAJOR_FS_ARR_LENGTH,
      animationServicesArray: ANIMATION_SERVICES_STATE_ARRAY,
      animationsServiceArrayLength: ANIMATION_SERVICES_STATE_ARRAY.length,
      currentMajorStateNum: 0,
      currentAnimationServiceNumber: 0,
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
              cond: ({ currentAnimationServiceNumber }) => {
                return currentAnimationServiceNumber === 0;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[0],
            },
            {
              cond: ({ currentAnimationServiceNumber }) => {
                return currentAnimationServiceNumber === 1;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[1],
            },
            {
              cond: ({ currentAnimationServiceNumber }) => {
                return currentAnimationServiceNumber === 2;
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
        entry: ["disableMovingToIdle"],
        invoke: {
          id: "__0__",
          src: (
            {
              tl,
              seaPlaneShaderMaterial,
              seaPlaneShaderMaterialWireframed,
              seaWireframeShaderMaterial,
              planeMiddleShaderMaterial,
              cageMesh,
              spaceshipMesh,
              controls,
            },
            __
          ) => {
            // DAKLE INVOKUJEM PROMISE-E
            // USTVARI INVOKE-UJEM
            // ANIMATION SERVICE

            tl.pause();

            tl.to(
              [
                seaPlaneShaderMaterial.uniforms.circleSize,
                seaPlaneShaderMaterialWireframed.uniforms.circleSize,
                planeMiddleShaderMaterial.uniforms.circleSize,
                seaWireframeShaderMaterial.uniforms.circleSize,
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
                x: 8.4,
                y: 8.4,
                z: 8.4,
                duration: 0.1,
              })
              .to(
                cageMesh.position,
                {
                  y: 128,
                },
                "-=0.1"
              )
              .to(
                spaceshipMesh.position,
                {
                  y: 20,
                  ease: Quad.easeOut,
                  duration: 2,
                },
                `-=${0.1 + 0.1 + 2}`
              )
              .to(
                controls.object.position,
                {
                  y: 21.2,
                  ease: Quad.easeIn,
                  duration: 2,
                },
                `-=${0.7 + 0.1 + 2}`
              );

            return tl.play().then(() => {
              console.log("animation0");

              tl.pause();
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[0],
            actions: ["enableMovingToIdle"],
          },
          onError: {
            target: fse.anim_error,
          },
        },
        exit: ["incrementAnimationServiceNum"],
      },
      [ANIMATION_SERVICES_STATE_ARRAY[1] /* animation1 */]: {
        entry: ["disableMovingToIdle"],
        invoke: {
          id: "__1__",
          src: (
            {
              tl,
              seaPlaneShaderMaterial,
              planeMiddleShaderMaterial,
              seaPlaneShaderMaterialWireframed,
              seaWireframeShaderMaterial,
              spaceshipMesh,
              cageMesh,
              controls,
            },
            __
          ) => {
            controls.target = spaceshipMesh.position;

            tl.play()
              .to(
                [
                  seaPlaneShaderMaterial.uniforms.circleSize,
                  seaPlaneShaderMaterialWireframed.uniforms.circleSize,
                  planeMiddleShaderMaterial.uniforms.circleSize,
                  seaWireframeShaderMaterial.uniforms.circleSize,
                ],
                {
                  value: 0,
                  ease: Elastic.easeOut,
                  duration: 3,
                }
              )
              .to(
                controls.object.position,
                {
                  y: 21.1,
                  z: 1.2,
                  duration: 2,
                  ease: Power1.easeOut,
                },
                "-=2.6"
              )
              .to(
                spaceshipMesh.scale,
                {
                  x: 1.2,
                  y: 1.2,
                  z: 1.2,
                  duration: 2,
                  ease: Power4.easeInOut,
                },
                "-=1.8"
              )
              .to(
                spaceshipMesh.position,
                {
                  y: 2.4,
                  ease: Power1.easeIn,
                  duration: 1.2,
                },
                "-1.2"
              )
              .to(
                controls.object.position,
                {
                  y: 1.2,
                  ease: Power1.easeIn,
                },
                `-${1.2 * 2}`
              );

            return tl.then(() => {
              tl.pause();
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[1],
            actions: ["enableMovingToIdle"],
          },
          onError: {
            target: fse.anim_error,
          },
        },
        exit: ["incrementAnimationServiceNum"],
      },
      [ANIMATION_SERVICES_STATE_ARRAY[2] /* animation2 */]: {
        entry: ["disableMovingToIdle"],
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
            actions: ["enableMovingToIdle"],
          },
          onError: {
            target: fse.anim_error,
          },
        },
        exit: ["incrementAnimationServiceNum"],
      },
      //-------------------------------------------------------
      [MAJOR_FINITE_STATES_ARRAY[0] /* aboutme */]: {
        entry: ["setLastMajorState", "incrementMajorStateNum"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain && currentMajorStateNum !== 0;
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[1] /* projects */]: {
        entry: ["setLastMajorState", "incrementMajorStateNum"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain && currentMajorStateNum !== 1;
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[2] /* blog */]: {
        entry: ["setLastMajorState", "incrementMajorStateNum"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain && currentMajorStateNum !== 2;
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
    // guards: {
    /* idleIsAllowed: (context, event) => {
        const { canMoveToIdleAgain } = context;
        return canMoveToIdleAgain;
      }, */
    // },
    actions: {
      setLastMajorState: assign(({ currentMajorStateNum }, __) => {
        return {
          majorStateAfterIdle: MAJOR_FINITE_STATES_ARRAY[currentMajorStateNum],
        };
      }),
      enableMovingToIdle: assign((_, __) => ({ canMoveToIdleAgain: true })),
      disableMovingToIdle: assign((_, __) => ({ canMoveToIdleAgain: false })),
      incrementMajorStateNum: assign(
        ({ currentMajorStateNum, majorFiniteStatesArrLength }, _) => {
          if (currentMajorStateNum + 1 > majorFiniteStatesArrLength - 1) {
            return {
              currentMajorStateNum: 0,
            };
          }

          return { currentMajorStateNum: currentMajorStateNum + 1 };
        }
      ),
      incrementAnimationServiceNum: assign(
        (
          { currentAnimationServiceNumber, animationsServiceArrayLength },
          _
        ) => {
          if (
            currentAnimationServiceNumber + 1 >
            animationsServiceArrayLength - 1
          ) {
            return {
              currentMajorStateNum: 0,
            };
          }

          return {
            currentAnimationServiceNumber: currentAnimationServiceNumber + 1,
          };
        }
      ),
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
