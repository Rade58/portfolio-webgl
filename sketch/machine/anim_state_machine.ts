import { Vector3, Object3D, ShaderMaterial, Mesh } from "three";
import { TweenMax, TimelineLite } from "gsap";
import { createMachine, assign, interpret } from "xstate";

export enum fse {
  init = "init",
  idle = "idle",
  aboutme = "aboutme",
  blog = "blog",
  projects = "projects",
}

export enum EE {
  SETUP = "SETUP",
  CHANGE_TO_ABOUT_ME = "CHANGE_TO_ABOUT_ME",
  CHANGE_TO_BLOG = "CHANGE_TO_BLOG",
  CHANGE_TO_PROJECTS = "CHANGE_TO_PROJECTS",
  SWITCH = "SWITCH",
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
}

// context HELPER TYPE ---------------------
interface ContextFullI {
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
      type: EE.CHANGE_TO_ABOUT_ME;
    }
  | {
      type: EE.CHANGE_TO_PROJECTS;
    }
  | {
      type: EE.CHANGE_TO_BLOG;
    }
  | {
      type: EE.SWITCH;
    }
  | {
      type: EE.MOVE_UP;
    }
  | {
      type: EE.MOVE_DOWN;
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
    initial: fse.init,
    context: {
      tl: new TimelineLite(),
      up: false,
      canMoveToIdle: false,
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
    on: {
      [EE.MOVE_UP]: {
        actions: assign((_, __) => ({ up: true })),
      },
      [EE.MOVE_DOWN]: {
        actions: assign((_, __) => ({ up: false })),
      },
    },
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
        //
        on: {
          [EE.CHANGE_TO_ABOUT_ME]: {
            //
            actions: [],
            target: fse.aboutme,
          },
          [EE.CHANGE_TO_PROJECTS]: {
            //
            target: fse.projects,
          },
          [EE.CHANGE_TO_BLOG]: {
            //
            target: fse.blog,
          },
        },
      },
      [fse.aboutme]: {
        //
        on: {
          "*": {
            cond: "moveToIdle",
            target: fse.idle,
          },
        },
      },
      [fse.projects]: {
        //
        on: {
          "*": {
            cond: "moveToIdle",
            target: fse.idle,
          },
        },
      },
      [fse.blog]: {
        //
        on: {
          "*": {
            cond: "moveToIdle",
            target: fse.idle,
          },
        },
      },
    },
  },
  {
    guards: {
      moveToIdle: (context, event) => {
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
});

animMachineService.start();
