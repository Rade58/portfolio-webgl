import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

// U OVOJ MASINI TI NISU POTREBNE KOMANDE, TO SI DEFINISAO U DRUGIM
// MACHINE-AMA

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
}

export enum EE {
  TO_ANIMATING = "TO_ANIMATING",
  TO_IDLING = "TO_IDLING",
  //
  GIVE_MAJOR_SHOWER = "GIVE_MAJOR_SHOWER",
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export interface MachineContextGenericI {
  majorShower: HTMLDivElement | null;
  major: fseAnim | undefined | "undefined"; // MOZD SAM TREBAO OVO BOLJE DA
  //                TYPE-UJEM JER CU SAMO KORISITI MAJOR STATE-OVE
}
export interface MachineContextGenericIFull {
  majorShower: HTMLDivElement;
  major: fseAnim;
}

export type machineEventsGenericType =
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
      value: fse.idle;
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
  initial: fse.idle,
  context: {
    majorShower: null,
    major: "undefined",
  },
  states: {
    // NA 'IDLE' TREBAS DA POKAZES (UZ ANIMACIJU) NOVI MODAL KOJI CE BITI ASSOCIATED
    // SA MAJOR STATOM
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
    // KADA ANIMACIJA TRAJE MODAL ASSOCIATED SA MAJOR STATEOM BI TREBAO SAKRITI
    // NARAVNO UZ ANIMACIJU
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
