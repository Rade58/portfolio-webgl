import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/middle_ground/major_states";

import { TimelineMax, TweenMax, Sine, Power2, Power4, Elastic } from "gsap";

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
      /* entry: [

      ], */
      // DOING ACTIONS ON TRANSITIONS
      on: {
        [EE.TO_ANIMATING]: {
          target: fse.anim_active,
          actions: [
            assign((_, { payload }) => {
              return payload;
            }), // -------- left right BUTTONS ANIMATIONS --------
            ({ bTl, left, right, major, fishLeft, fishRight }, __) => {
              console.log({ left, right });

              if (major === "undefined") {
                if (fishLeft) {
                  const gs = fishLeft.querySelectorAll("g#fish_left____ > g");

                  // console.log({ gs });

                  TweenMax.set(gs, {
                    transformOrigin: "50%",
                    rotateZ: 180,
                    translateX: -688,
                  });

                  TweenMax.to(gs, {
                    translateY: -2.8,
                    yoyo: true,
                    yoyoEase: Power2.easeIn,
                    repeat: -1,
                    repeatDelay: 1,
                    duration: 0.08,
                    stagger: 0.08,
                    // reversed: true,
                  });
                  TweenMax.to(gs, {
                    translateY: 2.8,
                    yoyo: true,
                    yoyoEase: Power2.easeIn,
                    repeat: -1,
                    repeatDelay: 1,
                    duration: 0.08,
                    stagger: 0.08,
                  });
                }

                if (fishRight) {
                  const gs = fishRight.querySelectorAll("g#fish_right____ > g");

                  // console.log({ gs });

                  TweenMax.set(gs, {
                    transformOrigin: "50%",
                    rotateZ: 180,
                    translateX: 688,
                  });

                  TweenMax.to(gs, {
                    translateY: 2.8,
                    yoyo: true,
                    yoyoEase: Sine.easeIn,
                    repeat: -1,
                    repeatDelay: 1,
                    duration: 0.08,
                    stagger: 0.08,
                    // reversed: true,
                  });
                  TweenMax.to(gs, {
                    translateY: -2.8,
                    yoyo: true,
                    yoyoEase: Sine.easeIn,
                    repeat: -1,
                    repeatDelay: 1,
                    duration: 0.08,
                    stagger: 0.08,
                  });
                }

                if (left) {
                  // -------- fish SETUP --------

                  //  LEFT AND RIGHT -------

                  const circle = left.querySelector("g#left g#circle");
                  const arrow = left.querySelector("g#left g#arr-left");

                  bTl
                    .to(arrow, {
                      transformOrigin: "50%",
                      rotateZ: 180,
                      duration: 0.6,
                      // scale: 0,
                      ease: Sine.easeIn,
                    })
                    .to(circle, {
                      transformOrigin: "50%",
                      scale: 0,
                      duration: 0.2,
                      ease: Power2.easeOut,
                    })
                    .to(arrow, { duration: 0.2, x: 160, ease: Sine.easeIn });

                  console.log({ circle, arrow });
                }

                if (right) {
                  const circle = right.querySelector("g#right2 g#circle");
                  const arrow = right.querySelector("g#right2 g#arr-right");

                  bTl
                    .to(
                      arrow,
                      {
                        transformOrigin: "50%",
                        rotateZ: 180,
                        duration: 0.6,
                        // scale: 0,
                        ease: Sine.easeIn,
                      },
                      "-=0.6"
                    )
                    .to(circle, {
                      transformOrigin: "50%",
                      scale: 0,
                      duration: 0.2,
                      ease: Power2.easeOut,
                    })
                    .to(arrow, { duration: 0.2, x: -160, ease: Sine.easeIn });
                }
              }
            },
          ],
          // -----------------------------------------------],
        },
      },
      exit: [
        ({ fTl, fishLeft, fishRight }) => {
          if (fishLeft) {
            const gs = fishLeft.querySelectorAll("g#fish_left____ > g");

            fTl
              .to(
                gs,
                {
                  translateX: -688,
                  duration: 0.1,
                  ease: Power2.easeIn,
                  stagger: 0.08,
                },
                "-=0.01"
              )
              .to(gs, { rotateZ: 180, stagger: 0.06, ease: Sine.easeIn });
          }

          if (fishRight) {
            const gs = fishRight.querySelectorAll("g#fish_right____ > g");

            fTl
              .to(
                gs,
                {
                  translateX: 688,
                  duration: 0.1,
                  ease: Power4.easeOut,
                  stagger: 0.08,
                },
                `-=${4 * 0.1 + 0.01 * 2}`
              )
              .to(
                gs,
                { rotateZ: 180, stagger: 0.06, ease: Sine.easeIn },
                `-=${2 * 0.01}`
              );
          }
        },
      ],
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
      exit: ({ fTl, fishLeft, fishRight }, __) => {
        if (fishLeft) {
          const gs = fishLeft.querySelectorAll("g#fish_left____ > g");

          fTl
            .to(
              gs,
              {
                translateX: 0,
                duration: 0.1,
                ease: Power2.easeIn,
                stagger: 0.08,
              },
              "-=0.01"
            )
            .to(gs, { rotateZ: 0, stagger: 0.06, ease: Sine.easeIn });
        }

        if (fishRight) {
          const gs = fishRight.querySelectorAll("g#fish_right____ > g");

          fTl
            .to(
              gs,
              {
                translateX: 0,
                duration: 0.1,
                ease: Power4.easeOut,
                stagger: 0.08,
              },
              `-=${4 * 0.1 + 0.01 * 2}`
            )
            .to(
              gs,
              { rotateZ: 0, stagger: 0.06, ease: Sine.easeIn },
              `-=${2 * 0.01}`
            );
        }
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
