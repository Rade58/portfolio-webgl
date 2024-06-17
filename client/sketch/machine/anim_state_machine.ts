import {
  Vector3,
  Object3D,
  ShaderMaterial,
  Mesh,
  Scene,
  PerspectiveCamera,
  LineSegments,
  WireframeGeometry,
} from "three";
import {
  TimelineMax,
  Elastic,
  Quad,
  Power1,
  Power4,
  Power0,
  Power3,
  Linear,
} from "gsap";
import { createMachine, assign, interpret } from "xstate";
import { majorStateHolder } from "../ui/user_interface";

import { MAJOR_FINITE_STATES_ARRAY, fse } from "../middle_ground/major_states";

/* export enum fse {
  init = "init",
  idle = "idle",

  //
  //
  anim_error = "anim_error",
  //---- major -states (all of them shoud have transitions to idle)
  aboutme = "aboutme",
  projects = "projects",
  contact = "contact",
  blog = "blog",
  // ANIMATION STATES
  animation0 = "animation0",
  animation1 = "animation1",
  animation2 = "animation2",
  animation3 = "animation3",
  animation4 = "animation4",
  anim_back_to_init = "anim_back_to_init",
  //
} */

export enum EE {
  SETUP = "SETUP",
  /* CHANGE_TO_ABOUT_ME = "CHANGE_TO_ABOUT_ME",
  CHANGE_TO_BLOG = "CHANGE_TO_BLOG",
  CHANGE_TO_PROJECTS = "CHANGE_TO_PROJECTS", */
  SWITCH = "SWITCH",
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  // MOVE = "MOVE", // DEPRECATED
  // HELLO = "HELLO", // DEPRECATE
  FIRST_RENDER = "FIRST_RENDER",
}

/* export const MAJOR_FINITE_STATES_ARRAY = [
  fse.aboutme,
  fse.projects,
  fse.contact,
  fse.blog,
]; */
const ANIMATION_SERVICES_STATE_ARRAY = [
  fse.animation0,
  fse.animation1,
  fse.animation2,
  fse.animation3,
  fse.animation4,
  //
  fse.anim_back_to_init,
];

const MAJOR_FS_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

// context HELPER TYPE ---------------------
interface ContextFullI {
  firstRenderHappened: boolean;
  wasInInit: boolean;
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
  scene: Scene;
  camera: PerspectiveCamera;
  // eslint-disable-next-line
  // @ts-ignore
  seaWireframe: LineSegments<WireframeGeometry, ShaderMaterial>;
  sunMesh: Mesh;
  spacehipShaderMaterial: ShaderMaterial;

  controls: {
    target: Vector3;
    object: Object3D;
    update: () => void;
    dispose: () => void;
  };
}

// ------------ GENERIC TYPES FOR MACHINE

interface MachineContextGenericI {
  firstRenderHappened: boolean;
  wasInInit: boolean;
  majorStateAfterIdle: typeof MAJOR_FINITE_STATES_ARRAY[number] | undefined;
  majorFiniteStatesArr: string[];
  majorFiniteStatesArrLength: number;
  currentMajorStateNum: number | undefined;
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
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  // eslint-disable-next-line
  // @ts-ignore
  seaWireframe: LineSegments<WireframeGeometry, ShaderMaterial> | null;
  sunMesh: Mesh | null;
  spacehipShaderMaterial: ShaderMaterial | null;
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
        sunMesh?: Mesh;
        scene?: Scene;
        camera?: PerspectiveCamera;
        seaPlaneShaderMaterial?: ShaderMaterial;
        seaPlaneShaderMaterialWireframed?: ShaderMaterial;
        seaWireframeShaderMaterial?: ShaderMaterial;
        planeMiddleShaderMaterial?: ShaderMaterial;
        seaPlaneMesh?: Mesh;
        cageMesh?: Mesh;
        spaceshipMesh?: Mesh;
        middlePlaneMesh?: Mesh;
        // eslint-disable-next-line
        // @ts-ignore
        seaWireframe?: LineSegments<WireframeGeometry, ShaderMaterial>;
        spacehipShaderMaterial?: ShaderMaterial;
        controls?: {
          target: Vector3;
          object: Object3D;
          update: () => void;
          dispose: () => void;
        };
      };
    }
  /* | {
      type: "*";
      payload: {
        sunMesh: Mesh;
        scene: Scene;
        camera: PerspectiveCamera;
        seaPlaneShaderMaterial: ShaderMaterial;
        seaPlaneShaderMaterialWireframed: ShaderMaterial;
        seaWireframeShaderMaterial: ShaderMaterial;
        planeMiddleShaderMaterial: ShaderMaterial;
        seaPlaneMesh: Mesh;
        cageMesh: Mesh;
        spaceshipMesh: Mesh;
        middlePlaneMesh: Mesh;
        seaWireframe: LineSegments<WireframeGeometry, ShaderMaterial>;
        spacehipShaderMaterial: ShaderMaterial;
        controls: {
          target: Vector3;
          object: Object3D;
          update: () => void;
          dispose: () => void;
        };
      };
    } */
  | {
      type: EE.SWITCH;
    }
  | {
      type: EE.FIRST_RENDER;
    }
  | {
      type: EE.MOVE_DOWN;
      // eslint-disable-next-line
      payload: {};
    }
  | {
      type: EE.MOVE_UP;
      // eslint-disable-next-line
      payload: {};
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
      value: fse.contact;
      context: ContextFullI;
    }
  | {
      value: fse.dashboard;
      context: ContextFullI;
    }
  | { value: fse.animation0; context: ContextFullI }
  | { value: fse.animation1; context: ContextFullI }
  | { value: fse.animation2; context: ContextFullI }
  | { value: fse.animation3; context: ContextFullI }
  | { value: fse.animation4; context: ContextFullI }
  | { value: fse.anim_back_to_init; context: ContextFullI }
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
      firstRenderHappened: false,
      wasInInit: false,
      majorStateAfterIdle: undefined /* MAJOR_FINITE_STATES_ARRAY[0] */,
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
      scene: null,
      camera: null,
      seaWireframe: null,
      sunMesh: null,
      spacehipShaderMaterial: null,
    },
    on: {
      [EE.MOVE_DOWN]: {
        actions: [
          assign((_, __) => {
            return { up: false };
          }),
        ],
      },
      [EE.MOVE_UP]: {
        actions: [
          assign((_, __) => {
            return { up: true };
          }),
        ],
      },
      [EE.FIRST_RENDER]: {
        actions: [
          assign((_, __) => {
            majorStateHolder.dataset.firstRenderHappened = "happened";

            return { firstRenderHappened: true };
          }),
        ],
      },
    },
    states: {
      [fse.init]: {
        entry: [
          assign((_, __) => {
            return { wasInInit: true };
          }),
          assign((_, __) => {
            return {
              currentAnimationServiceNumber: 0,
            };
          }),
        ], // eslint-disable-next-line
        // @ts-ignore

        on: {
          [EE.SETUP /* "*" */]: {
            actions: assign(
              (
                {
                  cageMesh: cageMeshOld,
                  // currentMajorStateNum,
                  /* controls: controlsOld,
                  middlePlaneMesh: middlePlaneMeshOld,
                  planeMiddleShaderMaterial: planeMiddleShaderMaterialOld,
                  seaPlaneMesh: seaPlaneMeshOld,
                  seaPlaneShaderMaterial: seaPlaneShaderMaterialOld,
                  seaPlaneShaderMaterialWireframed: seaPlaneShaderMaterialWireframedOld,
                  seaWireframeShaderMaterial: seaWireframeShaderMaterialOld,
                  spaceshipMesh: spaceshipMeshOld,
                  scene: sceneOld,
                  camera: cameraOld,
                  seaWireframe: seaWireframeOld,
                  sunMesh: sunMeshOld,
                  spacehipShaderMaterial: spacehipShaderMaterialOld, */
                },
                {
                  // eslint-disable-next-line
                  // @ts-ignore
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
                    scene,
                    camera,
                    seaWireframe,
                    sunMesh,
                    spacehipShaderMaterial,
                  },
                }
              ) => {
                if (!cageMesh) {
                  return {
                    cageMesh: cageMeshOld,
                    // currentMajorStateNum: currentMajorStateNum + 1,
                    /* controls: controlsOld,
                    middlePlaneMesh: middlePlaneMeshOld,
                    planeMiddleShaderMaterial: planeMiddleShaderMaterialOld,
                    seaPlaneMesh: seaPlaneMeshOld,
                    seaPlaneShaderMaterial: seaPlaneShaderMaterialOld,
                    seaPlaneShaderMaterialWireframed: seaPlaneShaderMaterialWireframedOld,
                    seaWireframeShaderMaterial: seaWireframeShaderMaterialOld,
                    spaceshipMesh: spaceshipMeshOld,
                    scene: sceneOld,
                    camera: cameraOld,
                    seaWireframe: seaWireframeOld,
                    sunMesh: sunMeshOld,
                    spacehipShaderMaterial: spacehipShaderMaterialOld, */
                  };
                }

                return {
                  cageMesh,
                  controls,
                  middlePlaneMesh,
                  planeMiddleShaderMaterial,
                  seaPlaneMesh,
                  seaPlaneShaderMaterial,
                  seaPlaneShaderMaterialWireframed,
                  seaWireframeShaderMaterial,
                  spaceshipMesh,
                  scene,
                  camera,
                  seaWireframe,
                  sunMesh,
                  spacehipShaderMaterial,
                };
              }
            ),
            // target: fse.idle,
          },
          [EE.SWITCH]: {
            actions: [
              assign(({ up }, __) => {
                if (up) {
                  return { currentMajorStateNum: MAJOR_FS_ARR_LENGTH - 1 };
                }
                return { currentMajorStateNum: 0 };
              }),
            ],

            target: fse.idle,
          },
        },
        exit: [],
      },
      [fse.idle]: {
        exit: [
          assign((_, __) => {
            return { wasInInit: false };
          }),
        ],
        always: [
          {
            cond: ({ wasInInit }, __) => {
              return wasInInit;
            },
            target: ANIMATION_SERVICES_STATE_ARRAY[0],
          },
        ],
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
            {
              cond: ({ currentAnimationServiceNumber }) => {
                return currentAnimationServiceNumber === 3;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[3],
            },
            {
              cond: ({ currentAnimationServiceNumber }) => {
                return currentAnimationServiceNumber === 4;
              },
              //
              target: ANIMATION_SERVICES_STATE_ARRAY[4],
            },
            {
              cond: ({ currentAnimationServiceNumber }) => {
                return (
                  currentAnimationServiceNumber ===
                  ANIMATION_SERVICES_STATE_ARRAY.length - 1
                );
              },
              //
              target:
                ANIMATION_SERVICES_STATE_ARRAY[
                  ANIMATION_SERVICES_STATE_ARRAY.length - 1
                ],
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

            tl.to(controls.object.position, { x: 0, duration: 0.5 });
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
              },
              "-=0.2"
            )
              .to(
                cageMesh.position,
                {
                  y: 148,
                  ease: Quad.easeOut,
                  duration: 2.4,
                },
                "-=1.9"
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
                  y: 18,
                  ease: Quad.easeOut,
                  duration: 2,
                },
                `-=${0.1 + 0.1 + 2}`
              )
              .to(
                controls.object.position,
                {
                  y: 20.2,
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
              seaPlaneMesh,
              scene,
              middlePlaneMesh,
              camera,
            },
            __
          ) => {
            controls.target = new global.THREE.Vector3(
              ...spaceshipMesh.position.toArray()
            );
            controls.update();
            seaPlaneMesh.material = seaPlaneShaderMaterial;
            seaPlaneMesh.material.needsUpdate = true;
            scene.remove(middlePlaneMesh);

            tl.play()

              .to(camera.position, {
                x: 1,
                z: -1,
                duration: 0.2,
                ease: Quad.easeOut,
              })
              .to(
                spaceshipMesh.scale,
                {
                  x: 1.6,
                  y: 1.6,
                  z: 1.6,
                  duration: 1.2,
                  ease: Power4.easeInOut,
                },
                "-=0.4"
              )

              .to(
                spaceshipMesh.position,
                {
                  y: 1.2,
                  duration: 1.1,
                  ease: Power0.easeInOut,
                },
                `-=${0.2}`
              )

              .to(
                camera.position,
                {
                  z: -78,
                  x: 78,
                  y: 34,
                  duration: 1.2,
                  ease: Quad.easeIn,
                },
                "-=0.4"
              )
              .to(
                spaceshipMesh.position,
                {
                  y: 169,
                  duration: 1.2,
                  ease: Quad.easeOut,
                },
                "-=0.4"
              );

            //
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
          src: (
            {
              tl,
              cageMesh,
              controls,
              camera,
              seaPlaneMesh,
              seaPlaneShaderMaterial,
              scene,
              seaWireframe,
              spaceshipMesh,
            },
            __
          ) => {
            const cagePosArr = cageMesh.position.toArray();

            tl.play()
              .to(controls.object.position, { z: 0, x: 8, duration: 0.4 })
              .to(
                controls.target,
                {
                  x: cagePosArr[0],
                  y: cagePosArr[1],
                  z: cagePosArr[2],
                  duration: 2,
                }
                // "-=0.2"
              )
              .call(() => {
                seaPlaneMesh.add(seaWireframe);
              })
              .to(
                camera.position,
                {
                  x: cagePosArr[0] + 50,
                  y: cagePosArr[1] - 7.4,
                  z: cagePosArr[2],
                  duration: 2,
                },
                "-=2"
              )
              .to(
                spaceshipMesh.position,
                {
                  x: cagePosArr[0],
                  y: cagePosArr[1],
                  z: cagePosArr[2],
                  duration: 1.2,
                  ease: Power0.easeOut,
                },
                "-=1.4"
              )
              .to(
                spaceshipMesh.scale,
                {
                  x: 5.8,
                  y: 5.8,
                  z: 5.8,
                  duration: 3.1,
                  ease: Elastic.easeOut,
                },
                "-=0.2"
              );

            return tl.then(() => {
              tl.pause();
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
      [ANIMATION_SERVICES_STATE_ARRAY[3]]: {
        entry: ["disableMovingToIdle"],
        invoke: {
          id: "__3__",
          src: (
            {
              tl,
              camera,
              controls,
              spaceshipMesh,
              cageMesh,
              sunMesh,
              spacehipShaderMaterial,
            },
            __
          ) => {
            const sunMeshCoords = sunMesh.position.toArray();
            const sunMeshScaleCoords = sunMesh.scale.toArray();

            sunMesh.scale.setScalar(0.1);

            tl.play()
              .to([cageMesh.position], {
                y: 282,
                duration: 2,
                ease: Linear.easeIn,
              })
              .to(
                controls.target,
                {
                  z: 168,
                  x: 168,
                  duration: 0.4,
                  ease: Linear.easeInOut,
                },
                "-=0.3"
              )
              .to(
                [camera.position, controls.object.position],
                { y: 22, z: -48, duration: 1, ease: Power1.easeIn },
                "-=0.8"
              )
              .to(
                [controls.target, spaceshipMesh.position],
                {
                  x: sunMeshCoords[0],
                  y: sunMeshCoords[1],
                  z: sunMeshCoords[2],
                  duration: 2,
                  ease: Linear.easeInOut,
                },
                "-=0.6"
              )
              .to(
                spaceshipMesh.scale,
                {
                  x: sunMesh.scale.x - 30,
                  y: sunMesh.scale.y - 30,
                  z: sunMesh.scale.z - 30,
                  ease: Elastic.easeOut,
                  duration: 2,
                },
                "-=1.1"
              )
              .to(
                camera.position,
                { x: -20, z: 0, duration: 3, ease: Linear.easeInOut },
                "-=1"
              )
              .to(
                spaceshipMesh.scale,
                {
                  x: 0,
                  y: 0,
                  z: 0,
                  ease: Power4.easeOut,
                  duration: 1,
                },
                "-=1.1"
              )
              .to(
                sunMesh.scale,
                {
                  x: sunMeshScaleCoords[0],
                  y: sunMeshScaleCoords[1],
                  z: sunMeshScaleCoords[2],
                  ease: Power4.easeOut,
                  duration: 1,
                },
                "-=0.6"
              );

            return tl.then(() => {
              tl.pause();
            });
          },
          onDone: {
            target: MAJOR_FINITE_STATES_ARRAY[3],
            actions: ["enableMovingToIdle"],
          },
          onError: {
            target: fse.anim_error,
          },
        },
        exit: ["incrementAnimationServiceNum"],
      },
      [ANIMATION_SERVICES_STATE_ARRAY[4]]: {
        entry: ["disableMovingToIdle"],
        invoke: {
          id: "__4__",
          src: (
            {
              tl,
              cageMesh,
              controls,
              spaceshipMesh,
              seaPlaneShaderMaterial,
              seaPlaneShaderMaterialWireframed,
              planeMiddleShaderMaterial,
              seaWireframeShaderMaterial,
            },
            __
          ) => {
            (cageMesh.position.z = 200),
              tl
                .play()
                .to(controls.target, { x: 12, y: 0, z: 0, duration: 2 })
                .to(
                  controls.object.position,
                  {
                    // y: 300,
                    x: -98,
                    y: 42,
                    duration: 1.8,
                    ease: Power0.easeOut,
                  },
                  "-=0.4"
                )

                .to(
                  [spaceshipMesh.position, cageMesh.position],
                  {
                    y: 12,
                    x: 0,
                    z: 0,
                    // y: -22,
                    duration: 1.4,
                    ease: Power4.easeInOut,
                  },
                  "-=0.4"
                )
                .to(
                  [spaceshipMesh.position, cageMesh.position],
                  {
                    y: -22,
                    // y: -22,
                    duration: 0.4,
                    ease: Power4.easeInOut,
                  },
                  "-=0.4"
                )
                .to(
                  [
                    seaPlaneShaderMaterial.uniforms.circleSize,
                    seaPlaneShaderMaterialWireframed.uniforms.circleSize,
                    planeMiddleShaderMaterial.uniforms.circleSize,
                    seaWireframeShaderMaterial.uniforms.circleSize,
                  ],
                  {
                    value: 0,
                    ease: Power3.easeOut,
                    duration: 2,
                  },
                  "-=0.1"
                )
                .to(
                  controls.object.position,
                  { y: 28, z: -38, duration: 1.4, ease: Quad.easeOut },
                  "-=0.4"
                );

            return tl.then(() => {
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
      [ANIMATION_SERVICES_STATE_ARRAY[
        ANIMATION_SERVICES_STATE_ARRAY.length - 1
      ]]: {
        entry: ["disableMovingToIdle"],

        invoke: {
          id: "__back_to_init__",
          src: ({
            tl,
            seaPlaneMesh,
            middlePlaneMesh,
            sunMesh,
            spaceshipMesh,
            cageMesh,
            controls,
            seaPlaneShaderMaterialWireframed,
            seaPlaneShaderMaterial,
            scene,
            seaWireframe,
            planeMiddleShaderMaterial,
            seaWireframeShaderMaterial,
          }) => {
            tl.play();
            tl.to(controls.target, { y: 100, x: 64, duration: 2 })
              .to(
                controls.object.position,
                {
                  y: 20,
                  x: 80,
                  z: 80,
                  duration: 0.5,
                  ease: Linear.easeIn,
                },
                "-=0.2"
              )
              .call(() => {
                scene.add(middlePlaneMesh);
                seaPlaneMesh.material = seaPlaneShaderMaterialWireframed;
                seaPlaneMesh.material.needsUpdate = true;
                seaPlaneMesh.remove(seaWireframe);
                cageMesh.position.z = 0;
                spaceshipMesh.position.z = 0;
                spaceshipMesh.position.x = 0;
                cageMesh.scale.setScalar(14.4);
                spaceshipMesh.scale.setScalar(0.1);
              })
              .to(
                controls.target,
                {
                  y: 0,
                  z: 20,
                  x: 20,
                  duration: 1,
                  ease: Power0.easeOut,
                }
                // "-=1.2"
              )

              .to(
                controls.object.position,
                {
                  x: 0,
                  z: 0,
                  y: 104,
                  duration: 1.2,
                  ease: Power0.easeOut,
                },
                "-=1"
              )
              .to(controls.target, { x: 1, y: 1, z: 0, duration: 2 }, "-=1");

            return tl.then(() => {
              tl.pause();
            });
          },
          onDone: {
            // back to            init
            target: MAJOR_FINITE_STATES_ARRAY[1],
            // target: MAJOR_FINITE_STATES_ARRAY[4],
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
        entry: ["incrementMajorStateNum", "setLastMajorState"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            // debugger;

            return canMoveToIdleAgain /* && currentMajorStateNum !== 0 */;
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[1] /* projects */]: {
        entry: ["incrementMajorStateNum", "setLastMajorState"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain /* && currentMajorStateNum !== 1 */;
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[2] /* contact */]: {
        entry: ["incrementMajorStateNum", "setLastMajorState"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain /* && currentMajorStateNum !== 2 */;
          },
        },
      },
      [MAJOR_FINITE_STATES_ARRAY[MAJOR_FS_ARR_LENGTH - 1] /* blog */]: {
        entry: ["incrementMajorStateNum", "setLastMajorState"],

        always: {
          target: fse.idle,
          cond: ({ canMoveToIdleAgain, currentMajorStateNum }, __) => {
            return canMoveToIdleAgain /* &&
              currentMajorStateNum !== MAJOR_FS_ARR_LENGTH - 1 */;
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
      setLastMajorState: assign(
        ({ currentMajorStateNum, majorStateAfterIdle }, __) => {
          /* if (!currentMajorStateNum) {
            return {
              majorStateAfterIdle,
            };
          } */

          return {
            majorStateAfterIdle:
              MAJOR_FINITE_STATES_ARRAY[currentMajorStateNum],
          };
        }
      ),
      enableMovingToIdle: assign((_, __) => ({ canMoveToIdleAgain: true })),
      disableMovingToIdle: assign((_, __) => ({ canMoveToIdleAgain: false })),
      incrementMajorStateNum: assign(
        (
          {
            currentMajorStateNum,
            majorFiniteStatesArrLength,
            majorFiniteStatesArr,
            up,
          },
          _
        ) => {
          if (up) {
            if (currentMajorStateNum + 1 >= majorFiniteStatesArrLength) {
              return {
                currentMajorStateNum: 0,
                // majorStateAfterIdle: (majorFiniteStatesArr as fse[])[0],
              };
            }

            return {
              currentMajorStateNum: currentMajorStateNum + 1,
              /* majorStateAfterIdle: (majorFiniteStatesArr as fse[])[
                currentMajorStateNum + 1
              ], */
            };
          }

          if (currentMajorStateNum - 1 < 0) {
            return {
              currentMajorStateNum: majorFiniteStatesArrLength - 1,
              /* majorStateAfterIdle: (majorFiniteStatesArr as fse[])[
                majorFiniteStatesArrLength - 1
              ], */
            };
          }

          return {
            currentMajorStateNum: currentMajorStateNum - 1,
            /* majorStateAfterIdle: (majorFiniteStatesArr as fse[])[
              currentMajorStateNum - 1
            ], */
          };
        }
      ),
      incrementAnimationServiceNum: assign(
        (
          { currentAnimationServiceNumber, animationsServiceArrayLength },
          _
        ) => {
          if (
            currentAnimationServiceNumber + 1 >=
            animationsServiceArrayLength
          ) {
            return {
              currentAnimationServiceNumber: 0,
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
  /* console.log("ANIM MACHINE STATE MACHINE");
  console.log(`COSEQUENCE OF - ${event.type} - EVENT`);

  console.log(`TRANSITIONED TO - ${state.value} - FINITE STATE`);
  console.log("CONTEXT:");
  console.log(state.context);
  console.log("-------------------------------------"); */
  // majorStateHolder.textContent = state.value as string;
  // if (majorStateHolder.dataset.finiteState !== state.value) {
  /* if (state.context.majorStateAfterIdle === undefined) {
      majorStateHolder.dataset.finiteState = fse.init;
    } else {
      majorStateHolder.dataset.finiteState = state.context.majorStateAfterIdle;
    } */
  majorStateHolder.dataset.finiteState = state.value as fse;
  majorStateHolder.dataset.majorState = state.context.majorStateAfterIdle;
  majorStateHolder.dataset.firstRenderHappened = state.context
    .firstRenderHappened
    ? "happened"
    : "not_happened";
  // console.log(majorStateHolder.dataset.firstRenderHappened);
  // }
});

animMachineService.start();
