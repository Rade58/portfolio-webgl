import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  init = "init",
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
export interface MachineContextGenericIFull {
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
      context: MachineContextGenericIFull;
    }
  | {
      value: fse.init;
      context: MachineContextGenericI;
    }
  | {
      value: fse.idle;
      context: MachineContextGenericIFull;
    }
  | {
      value: fseAnim.aboutme;
      context: MachineContextGenericIFull;
    }
  | {
      value: fseAnim.projects;
      context: MachineContextGenericIFull;
    }
  | {
      value: fseAnim.contact;
      context: MachineContextGenericIFull;
    }
  | {
      value: fseAnim.blog;
      context: MachineContextGenericIFull;
    };

// -------------------------------------------------------------

// --------------------  MACHINE -------------------------------

const storyMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "story_machine",
  initial: fse.init,
  context: {
    rightSvg: null,
    leftSvg: null,
    leftFishSvg: null,
    rightFishSvg: null,
  },
  states: {
    [fse.init]: {
      on: {
        [EE.INITIALIZE]: {
          actions: [
            assign((_, { payload }) => {
              return payload;
            }),
          ],
        },
      },
      always: {
        cond: ({ leftFishSvg, leftSvg, rightFishSvg, rightSvg }, _) => {
          return leftFishSvg && leftSvg && rightFishSvg && rightSvg
            ? true
            : false;
        },
        target: fse.idle,
      },
    },
  },
});
