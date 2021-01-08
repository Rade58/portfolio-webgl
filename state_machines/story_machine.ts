import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

// U OVOJ MASINI TI NISU POTREBNE KOMANDE, TO SI DEFINISAO U DRUGIM
// MACHINE-AMA

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  init = "init",
}

export enum EE {
  BRING_FROM_APP_MACHINE = "BRING_FROM_APP_MACHINE",
  TO_ANIMATING = "TO_ANIMATING",
  TO_IDLING = "TO_IDLING",
  // GIVE_MAJOR = "GIVE_MAJOR",
  //
  GIVE_MAJOR_SHOWER = "GIVE_MAJOR_SHOWER",
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export interface MachineContextGenericI {
  majorShower: HTMLDivElement | null;
  major: fseAnim | undefined; // MOZD SAM TREBAO OVO BOLJE DA
  //                TYPE-UJEM JER CU SAMO KORISITI MAJOR STATE-OVE
}
export interface MachineContextGenericIFull {
  majorShower: HTMLDivElement;
  major: fseAnim;
}

export type machineEventsGenericType =
  | {
      type: EE.BRING_FROM_APP_MACHINE;
      payload: {
        major: fseAnim;
      };
    }
  | {
      type: EE.TO_ANIMATING;
      payload: {
        major: fseAnim;
      };
    }
  | {
      type: EE.TO_IDLING;
      payload: {
        major: fseAnim;
      };
    }
  /* | {
      type: EE.GIVE_MAJOR; // DAKLE OVAJ EVENT BI SLAO ONDA
      //                     KADA IZZ APP MACHINE-A
      //                      SLUSAM OBSERVER EVENT
      //  I VODICU RACUNA DA EVENT NE SALJEM AKO JE U PITANJU ISTI STATE KAO I PREDHODNI
      payload: {
        major: fseAnim;
      };
    } */
  | {
      type: EE.GIVE_MAJOR_SHOWER;
      payload: {
        majorShower: HTMLDivElement;
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
    };
/*  | {
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
    }; */

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
    majorShower: null,
    major: undefined,
  },
  states: {
    [fse.init]: {
      on: {
        [EE.BRING_FROM_APP_MACHINE]: {
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
        /* [EE.GIVE_MAJOR_SHOWER]: {
          actions: [
            assign((_, { payload }) => {
              return payload;
            }),
          ],
          // target: fse.idle,
        }, */
      },
    },
    [fse.idle]: {
      on: {
        [EE.TO_ANIMATING]: {
          target: fse.anim_active,
          actions: assign((_, { payload }) => {
            return payload;
          }),
        },
      },
    },
    [fse.anim_active]: {
      on: {
        [EE.TO_IDLING]: {
          target: fse.idle,
          actions: assign((_, { payload }) => {
            return payload;
          }),
        },
      },
    },
  },
});

export const storyService = interpret(storyMachine);

storyService.onTransition((state, event) => {
  console.log({ stateVlue: state.value });
  console.log({ context: state.context });
});

storyService.start();
