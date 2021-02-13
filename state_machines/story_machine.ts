import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/middle_ground/major_states";

import { TimelineMax, TweenMax, Sine, Power2, Power4, Elastic } from "gsap";

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  init = "init",
}

export enum fseS {
  partial = "partial", // OVO JE INICIJELNO
  maximal = "maximal", // KADA SE PROSIRI
  non_visible = "non_visible", // KADA SE PREDJE U AIMATION STATE
  //                            MORA DA POSTOJI NON VISIBLE
}

export enum EE {
  TO_ANIMATING = "TO_ANIMATING",
  TO_IDLING = "TO_IDLING",
  //
  GIVE_MAJOR_SHOWER = "GIVE_MAJOR_SHOWER",
  //
  GIVE_SVGS = "GIVE_SVGS",
  GIVE_MEDIA = "GIVE_MEDIA",
}

export enum EEs {
  // OVI CE SE MNJATI IZMEDJU SEBE
  NARROW_IT = "NARROW_IT",
  FULL_OPEN = "FULL_OPEN", // OTVARA SAMO DO KONTROLA
  // OVAJ CE ZATVORITI PRED ANIMACIJU
  SLIDE_TO_INVISIBLE = "SLIDE_TO_INVISIBLE",
  // EVENT SAMO ZA ARROW UP
  ARROW_UP_PUSHED = "ARROW_UP_PUSHED",
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export interface MachineContextGenericI {
  // TEST CONTEXT (UKLONICU KASNIJE)
  test: number;
  //

  // ARROW UP PUSHED COUNT
  arrowUpPushedCount: number;
  //

  mediaBellow: boolean;
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
  // TEST CONTEXT (UKLONICU KASNIJE)
  test: number;
  //

  // ARROW UP PUSHED COUNT
  arrowUpPushedCount: number;
  //

  mediaBellow: boolean;
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
    }
  | {
      type: EE.GIVE_MEDIA;
      payload: {
        isBellow: boolean;
      };
    }
  // ------------ EVENTS FOR IDLE SUBSTATES  ----------------------------
  | { type: EEs.NARROW_IT }
  | { type: EEs.FULL_OPEN }
  | { type: EEs.SLIDE_TO_INVISIBLE }
  | { type: EEs.ARROW_UP_PUSHED };

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
    }

  //  Story STATES (NESTED STATES)
  | { value: fseS.non_visible; context: MachineContextGenericIFull }
  | { value: fseS.partial; context: MachineContextGenericIFull }
  | { value: fseS.maximal; context: MachineContextGenericIFull };

// -------------------------------------------------------------

// --------------------  MACHINE -------------------------------

const storyMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    id: "story_machine",
    initial: fse.idle,
    context: {
      // TEST CONTEXT
      test: 0,
      //

      // ARROW UP PUSHED COUNT
      arrowUpPushedCount: 0,
      //

      mediaBellow: true,
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
      [EE.GIVE_MEDIA]: {
        actions: assign(({ mediaBellow }, { payload: { isBellow } }) => {
          // console.log({ isBellow });

          return { mediaBellow: isBellow };
        }),
      },
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
        // NESTED STATES FOR MAJOR SHOWER
        // -----------------------------------------------------
        // -----------------------------------------------------
        id: "idle_submachine",
        initial: fseS.partial,
        exit: ["animateOnExitFromIdle"], // FISH DISPURSE
        on: {
          [EE.TO_ANIMATING]: {
            target: fse.anim_active,
            actions: [
              () => {
                // console.log("-------from idle to animating--------");
                // console.log("------- ---- ---- ---- --------");
              },
              // -------- left right BUTTONS ANIMATIONS --------
              assign((_, { payload }) => {
                return payload;
              }),
              "executeSetupsAndAnimations",
            ],
          },
        },
        states: {
          // OVDE DEFINISI SAMO TRANZICIJE
          // A U SAMOJ     `components/Story.tsx`
          // DEFINISI ANIMACIJE U ODNOOSU NA OVA TRI STATE-A

          [fseS.partial]: {
            //
            on: {
              [EEs.FULL_OPEN]: {
                actions: [
                  // SAMO test UKLONI KASNIJE --------
                  assign({
                    test: ({ test }, __) => {
                      return test + 1;
                    },
                  }),
                  // ---------------------------------
                ],
                //
                //
                target: fseS.maximal,
              },
              [EEs.SLIDE_TO_INVISIBLE]: {
                //
                // OVO CE SAMO SAKRITI ELEMENT
                target: fseS.non_visible,
              },
            },
          },
          [fseS.maximal]: {
            //
            on: {
              [EEs.NARROW_IT]: {
                actions: [
                  // SAMO test UKLONI KASNIJE --------
                  assign({
                    test: ({ test }, __) => {
                      return test + 1;
                    },
                  }),
                  // ---------------------------------
                ],
                //
                target: fseS.partial,
              },
              //  -------------_________-------------
              //  -------------_________-------------
              [EEs.ARROW_UP_PUSHED]: {
                actions: [
                  assign({
                    arrowUpPushedCount: ({ arrowUpPushedCount }, __) => {
                      return arrowUpPushedCount + 1;
                    },
                  }),
                ],
              },
              //  -------------_________-------------
              //  -------------_________-------------
              [EEs.SLIDE_TO_INVISIBLE]: {
                //
                // OVO CE SAMO SAKRITI ELEMENT
                target: fseS.non_visible,
              },
            },
          },
          // PRED ANIMACIJU TREBA DA PREDJE U OVAJ STATE
          // MOZDA BI OVO TREBAL OA BUDE INICIJALNO
          [fseS.non_visible]: {
            //

            type: "final",
          },
        },

        // -----------------------------------------------------
        // -----------------------------------------------------
      },
      // -------- KADA ANIMACIJA TRAJE MODAL ASSOCIATED SA MAJOR STATEOM BI TREBAO SAKRITI
      // NARAVNO UZ ANIMACIJU ---------
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
                }
                // "-=0.01"
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
                `-=${6 * 0.1 + 0.01 * 2}`
              )
              .to(
                gs,
                { rotateZ: 0, stagger: 0.06, ease: Sine.easeIn },
                `-=${6 * 0.01}`
              );
          }
        },
      },
    },
  },
  {
    actions: {
      /* takePayloadOnAnimating: assign((_, { payload }) => {
        return payload;
      }), */
      executeSetupsAndAnimations: (
        { bTl, left, right, major, fishLeft, fishRight },
        __
      ) => {
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
              yoyoEase: Sine.easeInOut,
              repeat: -1,
              repeatDelay: 1,
              duration: 0.08,
              stagger: 0.08,
              // reversed: true,
            });
            TweenMax.to(gs, {
              translateY: 2.8,
              yoyo: true,
              yoyoEase: Sine.easeInOut,
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

            // console.log({ circle, arrow });
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
      //
      animateOnExitFromIdle: ({ fTl, fishLeft, fishRight }) => {
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
              }
              // "-=0.01"
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
              `-=${6 * 0.1 + 0.01 * 2}`
            )
            .to(
              gs,
              { rotateZ: 180, stagger: 0.06, ease: Sine.easeIn },
              `-=${6 * 0.01}`
            );
        }
      },
    },
    //
  }
);

export const storyService = interpret(storyMachine);

storyService.onTransition((state, event) => {
  // console.log({ stateVlue: state.value });
  // console.log({ context: state.context });
  console.log(state.context.test);
  console.log({ arrowUpPushedCount: state.context.arrowUpPushedCount });
});

storyService.start();
