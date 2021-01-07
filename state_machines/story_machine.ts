import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
}

export enum EE {
  INITIALIZE = "INITIALIZE",
  TO_ANIM = "TO_ANIM",
  TO_MAJOR = "TO_MAJOR",
}

// --------
// --------

export interface MachineContextGenericI {
  leftSvg: SVGElement | null;
  rightSvg: SVGElement | null;
  leftFishSvg: SVGElement | null;
  rightFishSvg: SVGElement | null;
}

export type machineEventsGenericType =
  | {
      type: EE.INITIALIZE;
      payload: {
        leftSvg: SVGElement;
        rightSvg: SVGElement;
        leftFishSvg: SVGElement;
        rightFishSvg: SVGElement;
      };
    }
  | {
      type: EE.TO_ANIM;
    }
  | {
      type: EE.TO_MAJOR;
      payload: {
        majorState: fseAnim;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.anim_active;
      context: MachineContextGenericI;
    }
  | {
      value: fse.idle;
      context: MachineContextGenericI;
    }
  | {
      value: fseAnim.aboutme;
      context: MachineContextGenericI;
    }
  | {
      value: fseAnim.projects;
      context: MachineContextGenericI;
    }
  | {
      value: fseAnim.contact;
      context: MachineContextGenericI;
    }
  | {
      value: fseAnim.blog;
      context: MachineContextGenericI;
    };
