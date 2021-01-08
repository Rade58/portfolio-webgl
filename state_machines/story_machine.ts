import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  init = "init",
}

export enum EE {
  INITIALIZE = "INITIALIZE",
  TO_ANIMATING = "TO_ANIMATING",
  TO_IDLING = "TO_IDLING",
  GIVE_MAJOR = "GIVE_MAJOR",
  //
  GIVE_MAJOR_SHOWER = "GIVE_MAJOR_SHOWER",
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export interface MachineContextGenericI {
  majorShower: HTMLDivElement | null;
  major: fseAnim | undefined; // MOZD SAM TREBAO OVO BOLJE DA
  //                TYPE-UJEM JER CU SAMO KORISITI MAJOR STATE-OVE
  leftSvg: SVGElement | null;
  rightSvg: SVGElement | null;
  leftFishSvg: SVGElement | null;
  rightFishSvg: SVGElement | null;
}
export interface MachineContextGenericIFull {
  majorShower: HTMLElement;
  major: fseAnim;
  leftSvg: SVGElement | null;
  rightSvg: SVGElement | null;
  leftFishSvg: SVGElement | null;
  rightFishSvg: SVGElement | null;
}

export type machineEventsGenericType =
  | {
      type: EE.INITIALIZE;
      payload: {
        major: fseAnim;
        leftSvg: SVGElement;
        rightSvg: SVGElement;
        leftFishSvg: SVGElement;
        rightFishSvg: SVGElement;
      };
    }
  | {
      type: EE.TO_ANIMATING;
    }
  | {
      type: EE.TO_IDLING;
      payload: {
        major: fseAnim;
      };
    }
  | {
      type: EE.GIVE_MAJOR; // DAKLE OVAJ EVENT BI SLAO ONDA
      //                     KADA IZZ APP MACHINE-A
      //                      SLUSAM OBSERVER EVENT
      //  I VODICU RACUNA DA EVENT NE SALJEM AKO JE U PITANJU ISTI STATE KAO I PREDHODNI
      payload: {
        major: fseAnim;
      };
    }
  | {
      type: EE.GIVE_MAJOR_SHOWER;
      payload: {
        majorShower: HTMLElement;
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
    major: undefined,
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
              // POSTARACU SE DA PAYLOAD BUDE VALIDAN KADA
              // BUDEM SLAO EVENT
              return payload;
            }),
          ],
          /* cond: ({ leftFishSvg, leftSvg, rightFishSvg, rightSvg }, _) => {
            return leftFishSvg && leftSvg && rightFishSvg && rightSvg
              ? true
              : false;
          }, */
          target: fse.idle,
        },
        [EE.GIVE_MAJOR_SHOWER]: {},
      },
    },
    [fse.idle]: {
      on: {
        [EE.TO_ANIMATING]: {
          target: fse.anim_active,
        },
      },
    },
    [fse.anim_active]: {},
  },
});
