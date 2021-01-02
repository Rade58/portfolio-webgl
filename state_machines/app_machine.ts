import { createMachine, assign, interpret, send, actions } from "xstate";

import { CssClassesEnum } from "../sketch/ui/user_interface";
import {
  fse as animeFse,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/machine/anim_state_machine";

enum fse {
  animation_active = "animation_active",
  idling = "idling",

  init = "init",
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
  OBSERVER = "OBSERVER",
  INIT = "INIT",
}

// -------------------------------------------------------------

export interface MachineContextGenericI {
  currentAnimeMachineFinitestate: animeFse | undefined;
  currentAnimeMachineMajorState:
    | typeof MAJOR_FINITE_STATES_ARRAY[number]
    | undefined;
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
  | {
      type: EE.INIT;
      payload: {
        currentAnimeMachineFinitestate: animeFse;
        currentAnimeMachineMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number];
        majorStateHolder: HTMLDivElement;
        backButton: HTMLButtonElement;
        forwardButton: HTMLButtonElement;
      };
    }
  | {
      type: EE.OBSERVER;
      payload: {
        currentAnimeMachineMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number];
        currentAnimeMachineFinitestate: animeFse;
        canLoadControls: boolean;
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
      value: fse.init;
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
    majorStateHolder: null,
    currentAnimeMachineFinitestate: null,
    currentAnimeMachineMajorState: null,
    animationMachineObserver: null,
    backButton: null,
    forwardButton: null,
    canLoadControls: false,
  },

  on: {
    [EE.OBSERVER]: {
      actions: [
        assign((_, event) => {
          const {
            payload: {
              currentAnimeMachineFinitestate,
              currentAnimeMachineMajorState,
              canLoadControls,
            },
          } = event;
          // debugger;
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
      on: {
        [EE.INIT]: {
          actions: [
            assign((_, event) => {
              const { payload } = event;

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
          target: fse.idling,
        },
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

appService.start();

export type animfse = animeFse;
