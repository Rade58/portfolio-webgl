import { Vector3, Object3D, ShaderMaterial, Mesh } from "three";
import { TweenMax } from "gsap";
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
  CHANGE = "CHANGE",
}

// context HELPER TYPE ---------------------
interface ContextFullI {
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
      type: EE.CHANGE;
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
>({
  id: "sketch_anim_machine",
  initial: fse.init,
  context: {
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
          target: fse.init,
        },
      },
    },
  },
});
