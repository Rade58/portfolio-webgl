import { createMachine, assign, interpret } from "xstate";

import { CssClassesEnum } from "../sketch/ui/user_interface";
import {
  fse as animeFse,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/machine/anim_state_machine";

import { storyService, EE as SE } from "./story_machine";

export enum fse {
  animation_active = "animation_active",
  idling = "idling",
  modal_active = "modal_active",
  init = "init",
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
  OBSERVER = "OBSERVER",
  INIT = "INIT",
  CLOSE_MODAL = "CLOSE_MODAL",
  BRING_SVG = "BRING_SVG",
}

// -------------------------------------------------------------

export interface MachineContextGenericI {
  leftBSvg: SVGElement | null;
  rightBSvg: SVGElement | null;
  backwardsSvg: SVGElement | null;
  forwardsSvg: SVGElement | null;
  wheelAllowed: boolean;
  currentAnimeMachineFinitestate: animeFse | undefined;
  currentAnimeMachineMajorState:
    | typeof MAJOR_FINITE_STATES_ARRAY[number]
    | undefined
    | "undefined";
  majorStateHolder: HTMLDivElement | null;
  animationMachineObserver: MutationObserver | null;
  backButton: HTMLButtonElement | null;
  forwardButton: HTMLButtonElement | null;
  canLoadControls: boolean;
}

export type machineEventGenericType =
  | {
      type: EE.CLICK_BACK;
    }
  | { type: EE.CLICK_FORTH }
  | { type: EE.CLOSE_MODAL }
  | {
      type: EE.INIT;
      payload: {
        currentAnimeMachineFinitestate: animeFse;
        currentAnimeMachineMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number];
        majorStateHolder: HTMLDivElement;
        backButton: HTMLButtonElement;
        forwardButton: HTMLButtonElement;
        canLoadControls: boolean;
      };
    }
  | {
      type: EE.OBSERVER;
      payload: {
        currentAnimeMachineMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number];
        currentAnimeMachineFinitestate: animeFse;
        canLoadControls: boolean;
      };
    }
  | {
      type: EE.BRING_SVG;
      payload: {
        leftBSvg?: SVGElement;
        rightBSvg?: SVGElement;
        backwardsSvg?: SVGElement;
        forwardsSvg?: SVGElement;
      };
    };

export type machineFiniteStateGenericType =
  | {
      value: fse.idling;
      context: MachineContextGenericI;
    }
  | {
      value: fse.animation_active;
      context: MachineContextGenericI;
    }
  | {
      value: fse.modal_active;
      context: MachineContextGenericI;
    }
  | {
      value: fse.init;
      context: MachineContextGenericI;
    };

// -------------------------------------------------------------

// --------------------  MACHINE -------------------------------

const appMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>(
  {
    id: "app_machine",
    initial: fse.init,
    context: {
      backwardsSvg: null,
      forwardsSvg: null,
      leftBSvg: null,
      rightBSvg: null,
      wheelAllowed: false, // no op
      majorStateHolder: null,
      currentAnimeMachineFinitestate: null,
      currentAnimeMachineMajorState: null,
      animationMachineObserver: null,
      backButton: null, // uzeto iz druge masine (ustvari iz sketch-a)
      forwardButton: null, // iz druge masine
      canLoadControls: false,
    },

    on: {
      [EE.OBSERVER]: {
        actions: [
          assign((context, event) => {
            const {
              payload: {
                currentAnimeMachineFinitestate,
                currentAnimeMachineMajorState,
                canLoadControls,
              },
            } = event;
            // debugger;

            // FROM HERE SENDING EVENT TO STORY MACHINE
            // OVO JE ASSIGN ACTION ZA EVENT KOJI NIJE VEZAN ZA
            // BILO KOJI STATE, STO NE ZELIM DA IMAM U STORY MACHINE-U

            /* console.log("----------------------------------");
            console.log("----------------------------------");
            console.log("----------------------------------");
            console.log("----------------------------------");
            console.log({
              currentAnimeMachineFinitestate,
              currentAnimeMachineMajorState,
              canLoadControls,
            }); */
            //  DAKLE OVO SU OVDE EVENT-OVI KOJE SALJEM PREMA STORY MACHINE-U
            if (
              currentAnimeMachineFinitestate !==
              context.currentAnimeMachineFinitestate
            ) {
              if (currentAnimeMachineFinitestate.includes("anim")) {
                storyService.send({
                  type: SE.TO_ANIMATING,
                  payload: {
                    major: currentAnimeMachineMajorState,
                  },
                });
              } else {
                storyService.send({
                  type: SE.TO_IDLING,
                  payload: {
                    major: currentAnimeMachineMajorState,
                  },
                });
              }
            }
            /*  console.log("----------------------------------");
            console.log("----------------------------------");
            console.log("----------------------------------");
            console.log("----------------------------------"); */

            // ----------------------------------------------

            return {
              currentAnimeMachineFinitestate,
              currentAnimeMachineMajorState,
              canLoadControls,
            };
          }),
        ],
      },
    },

    states: {
      [fse.init]: {
        // entry: ["wheelAllowed"],
        on: {
          [EE.INIT]: {
            actions: [
              assign((_, event) => {
                const { payload } = event;

                // INICIJALIZACIJA STORY MACHINE

                // INICIJALIZOVACU JE SAMO AKO OVDE POSTOJE
                // SVG ELEMENTI

                return payload;
              }),
              assign(({ majorStateHolder }, __) => {
                return {
                  canLoadControls:
                    majorStateHolder.dataset.firstRenderHappened === "happened"
                      ? true
                      : false,
                };
              }),
            ],
            /* cond: ({ canLoadControls }, __) => {
            console.log({ canLoadControls });

            return canLoadControls;
          }, */
            // target: fse.idling,
          },
          [EE.BRING_SVG]: {
            actions: [
              assign((_, { payload }) => {
                // console.log({ payload });

                storyService.send({
                  type: SE.GIVE_SVGS,
                  payload: {
                    fishLeft: payload.backwardsSvg,
                    fishRight: payload.forwardsSvg,
                    left: payload.leftBSvg,
                    right: payload.rightBSvg,
                  },
                });

                return payload;
              }),
            ],
            // cond: "ifSvgsAreHere",
            // target: fse.idling,
          },

          [EE.CLOSE_MODAL]: {
            cond: "ifSvgsAreHere",
            target: fse.idling,
          },
        },
      },
      [fse.idling]: {
        entry: [
          // "wheelAllowed",
          () => {
            console.log("BACK TO IDLE, BACK TO IDLING");
            console.log("BACK TO IDLE, BACK TO IDLING");
            console.log("BACK TO IDLE, BACK TO IDLING");
            console.log("BACK TO IDLE, BACK TO IDLING");
            console.log("BACK TO IDLE, BACK TO IDLING");
            console.log("BACK TO IDLE, BACK TO IDLING");
          },
        ],
        on: {
          [EE.BRING_SVG]: {
            actions: [
              assign((_, { payload }) => {
                // console.log({ payload });
                storyService.send({
                  type: SE.GIVE_SVGS,
                  payload: {
                    fishLeft: payload.backwardsSvg,
                    fishRight: payload.forwardsSvg,
                    left: payload.leftBSvg,
                    right: payload.rightBSvg,
                  },
                });
                return payload;
              }),
            ],
            // cond: "ifSvgsAreHere",
            // target: fse.idling,
          },
          [EE.CLICK_BACK]: {
            actions: [
              ({ backButton }, __) => {
                backButton.dispatchEvent(new Event("click"));
              },
            ],

            target: fse.animation_active,
          },
          [EE.CLICK_FORTH]: {
            actions: [
              ({ forwardButton }, __) => {
                forwardButton.dispatchEvent(new Event("click"));
              },
            ],

            target: fse.animation_active,
          },
          // TREBALLO BI DA DEFINISEM ANIMACIJE KOJE SE DOGADJAJU
          // SAMO U ODNOSU NA STATE IZ ANIME MACHINE-A
        },
      },
      [fse.animation_active]: {
        // POSMATRAJ STATE-OVE KOJE DOLAZE OD ANIME MACHINE
        // JER NA OVO NE MOGU OBRACATI PAZNJU
        // entry: ["wheelNotAllowed"],
        always: {
          target: fse.idling,
          cond: ({ currentAnimeMachineFinitestate }, __) => {
            /* console.log("-------------------------------------");
            console.log("-------------------------------------");
            console.log("-------------------------------------");
            console.log("-------------------------------------");
            console.log("-------------------------------------");
            console.log("-------------------------------------");
            */
            console.log({ currentAnimeMachineFinitestate });
            return !currentAnimeMachineFinitestate.startsWith("anim");
          },
        },
      },
    },
  },
  {
    actions: {
      wheelAllowed: assign((_, __) => {
        return { wheelAllowed: true };
      }),
      wheelNotAllowed: assign((_, __) => {
        return { wheelAllowed: false };
      }),
    },
    guards: {
      ifWheelAllowed: ({ wheelAllowed }, __) => {
        return wheelAllowed;
      },
      ifSvgsAreHere: (
        { backwardsSvg, forwardsSvg, leftBSvg, rightBSvg },
        __
      ) => {
        return backwardsSvg && forwardsSvg && leftBSvg && rightBSvg
          ? true
          : false;
      },
    },
  }
);

export const appService = interpret(appMachine);

appService.onTransition((state, event) => {
  /* console.log(" ------------------------------------- ");
  console.log(state.value);
  console.log({ etype: event.type });
  console.log(state.context); */
});

appService.start();

export type animfse = animeFse;
