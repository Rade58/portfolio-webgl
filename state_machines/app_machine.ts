import { createMachine, assign, interpret, send } from "xstate";

import { CssClassesEnum } from "../sketch/ui/user_interface";
import {
  fse as animeFse,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/machine/anim_state_machine";

enum fse {
  animation_active = "animation_active",
  idling = "idling",
  mutation_observer_setup = "mutation_observer_setup",
  init = "init",
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
  OBSERVER = "OBSERVER",
  INIT = "INIT",
}

// -------------------------------------------------------------

interface MachineContextGenericI {
  currentFiniteStateAnimeMachine: animeFse | undefined;
  currentMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number] | undefined;
  majorStateHolder: HTMLDivElement;
  animationMachineObserver: MutationObserver | null;
  backButton: HTMLButtonElement;
  forwardButton: HTMLButtonElement;
}

type machineEventGenericType =
  | {
      type: EE.CLICK_BACK;
    }
  | { type: EE.CLICK_FORTH }
  | { type: EE.INIT }
  | {
      type: EE.OBSERVER;
      payload: {
        currentMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number];
        currentFiniteStateAnimeMachine: animeFse;
      };
    };

type machineFiniteStateGenericType =
  | {
      value: fse.idling;
      context: MachineContextGenericI;
    }
  | {
      value: fse.animation_active;
      context: MachineContextGenericI;
    }
  | {
      value: fse.init;
      context: MachineContextGenericI;
    }
  | {
      value: fse.mutation_observer_setup;
      context: MachineContextGenericI;
    };

// -------------------------------------------------------------

// --------------------  MACHINE -------------------------------

const appMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>({
  id: "app_machine",
  initial: fse.init,
  context: {
    majorStateHolder: document.querySelector(
      "div.major_state_holder"
    ) as HTMLDivElement,
    currentFiniteStateAnimeMachine: (document.querySelector(
      "div.major_state_holder"
    ) as HTMLDivElement).dataset.finiteState as animeFse,
    currentMajorState: (document.querySelector(
      "div.major_state_holder"
    ) as HTMLDivElement).dataset.majorState as animeFse,
    animationMachineObserver: null,
    backButton: document.querySelector(
      "section.controls-container button:nth-of-type(1)"
    ),
    forwardButton: document.querySelector(
      "section.controls-container button:nth-of-type(2)"
    ),
  },

  on: {
    [EE.OBSERVER]: {
      actions: [
        assign((_, event) => {
          const {
            payload: { currentFiniteStateAnimeMachine, currentMajorState },
          } = event;

          return { currentFiniteStateAnimeMachine, currentMajorState };
        }),
      ],
    },
  },

  states: {
    [fse.init]: {
      on: {
        [EE.INIT]: {
          target: fse.mutation_observer_setup,
        },
      },
    },
    [fse.mutation_observer_setup]: {
      entry: [
        ({ animationMachineObserver, majorStateHolder }, __) => {
          if (!animationMachineObserver && majorStateHolder) {
            const config = { attributes: true };

            const animationMachineObserver = new MutationObserver(
              (mutationList, observer) => {
                for (const mutation of mutationList) {
                  if (mutation.type === "attributes") {
                    send({
                      type: EE.OBSERVER,
                      payload: {
                        currentFiniteStateAnimeMachine: (mutation.target as HTMLDivElement)
                          .dataset.finiteState,
                        currentMajorState: (mutation.target as HTMLDivElement)
                          .dataset.majorState,
                      },
                    });
                  }
                }
              }
            );

            animationMachineObserver.observe(majorStateHolder, config);
          }
        },
      ],
      always: {
        target: fse.idling,
      },
    },
    [fse.idling]: {
      on: {
        [EE.CLICK_BACK]: {
          actions: [
            ({ backButton }, __) => {
              backButton.dispatchEvent(new Event("click"));
            },
          ],
        },
        [EE.CLICK_FORTH]: {
          actions: [
            ({ forwardButton }, __) => {
              forwardButton.dispatchEvent(new Event("click"));
            },
          ],
        },
      },
    },
  },
});

export const appService = interpret(appMachine);

appService.onTransition((state, event) => {
  console.log(" ------------------------------------- ");
  console.log(state.value);
  console.log(state.context);
});
