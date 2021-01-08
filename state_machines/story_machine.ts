import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

// USTVARI KADA RAZMISLIM POTREBNO JE DA
// IMAM SVG-JEVE JER ZELIM I NJIH DA ANIMATE-UJEM

// ALI MOZDA MOGU TO DA URADIM I U APP MACHINE-U
// ALI NE VIDIM KAKO BI  TO URADIO

// ANTICAPATE-OVACU NEKI INITIALIZATION EVENT, KOJI BI
// TREBAO DA MI OSIGURA REFERENCE SVIH SVG-JEVA

// SAMO PITANJE GDE BI TREBALO DA ANTICAPATE-UJEM, TAJ EVENT
// MOZDAABI BILO NAJBOLJE DA TO RADIM IZVAN FINITE STATE-A

// POSTO CE MI SE DESITI DA SE ONI SVG-JEVI UNMOUNT-UJU KADA
// GUBIM NJIHOVU REFERENC

// ZATO SA DVA MESTA UZIMAM REFERENCE TIH SVG-JEVA

// TREBALO BI UPOREDO SA TIM DA I OVDE SALJEM TE REFERENCE,
//  KAKO BI MOGAO ANIMIRATI POMENUTE SVG-JEVE

// I PRVO STA BI TREBAO DA RADIM JE ANIMIRANJE NJIH

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
