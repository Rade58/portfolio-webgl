import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

import { TimelineMax } from "gsap";

// ---- TREBA MI INIT STATE, A TREBACE MI I VISIBILITI SVEGA
// A MANIPULISACU I HEIGHT-OM

// --------

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

// I PRVO STA BI TREBAO DA RADIM JE ANIMIRANJE TIH SVG-JEVA

// ALI ANIMAIJE SVG-JEVA TREBAJU DA BUDU VEZANE UZ DVA
// FINITE STATE-A KOJA IMAM

// AKO JE idle SVG-TREBA DA SE POJAVI UZ ANIMACIJU

// AKO JE U PITANJU anim-active; SVG-JEVI TREBA DA SE POJAVE UZ ANIMACIJU

//  ISTO TAKO TOKOM idlle-a, ONI FISH SVG-JEVI TREBAJU DA KONSTANTNO
//  IMAJJU MOVEMENT

// MORAM UPDATE-OVATI I CONTEXT

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  init = "init",
}

export enum EE {
  TO_ANIMATING = "TO_ANIMATING",
  TO_IDLING = "TO_IDLING",
  //
  GIVE_MAJOR_SHOWER = "GIVE_MAJOR_SHOWER",
  //
  GIVE_SVGS = "GIVE_SVGS",
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export interface MachineContextGenericI {
  bTl: TimelineMax;
  fTl: TimelineMax;
  majorShower: HTMLDivElement | null;
  major: fseAnim | undefined | "undefined"; // MOZD SAM TREBAO OVO BOLJE DA
  //                TYPE-UJEM JER CU SAMO KORISITI MAJOR STATE-OVE

  left: SVGElement | null;
  right: SVGElement | null;
  fishLeft: SVGElement | null;
  fishRight: SVGElement | null;
}
export interface MachineContextGenericIFull {
  bTl: TimelineMax;
  fTl: TimelineMax;
  majorShower: HTMLDivElement;
  major: fseAnim;
  left: SVGElement;
  right: SVGElement;
  fishLeft: SVGElement;
  fishRight: SVGElement;
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
    }
  | {
      type: EE.GIVE_SVGS;
      payload: {
        left?: SVGElement;
        right?: SVGElement;
        fishLeft?: SVGElement;
        fishRight?: SVGElement;
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
    }
  | {
      value: fse.init;
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
    bTl: new TimelineMax(),
    fTl: new TimelineMax(),
    majorShower: null,
    major: "undefined",
    fishLeft: null,
    fishRight: null,
    left: null,
    right: null,
  },
  on: {
    [EE.GIVE_SVGS]: {
      actions: [
        assign((_, { payload }) => {
          const { fishLeft } = payload;

          if (fishLeft) {
            return { fishLeft };
          }
        }),
        assign((_, { payload }) => {
          const { fishRight } = payload;

          if (fishRight) {
            return { fishRight };
          }
        }),
        assign((_, { payload }) => {
          const { left } = payload;

          if (left) {
            return { left };
          }
        }),
        assign((_, { payload }) => {
          const { right } = payload;

          if (right) {
            return { right };
          }
        }),
      ],
      /* target: fse.idle,
      cond: ({ fishLeft, fishRight, left, right }) => {


        return fishLeft && fishRight && left && right ? true : false;
      }, */
    },
  },
  states: {
    // [fse.init]: {
    // },

    // NA 'IDLE' TREBAS DA POKAZES (UZ ANIMACIJU) NOVI MODAL KOJI CE BITI ASSOCIATED
    // SA MAJOR STATOM
    [fse.idle]: {
      entry: [
        // -------- left right BUTTONS ANIMATIONS --------
        ({ bTl, left, right }, __) => {
          console.log({ left, right });
        },
        // -----------------------------------------------
      ],
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
