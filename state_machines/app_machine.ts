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
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
  OBSERVER = "OBSERVER",
}

// -------------------------------------------------------------

interface MachineContextGenericI {
  currentFiniteStateAnimeMachine: animeFse | undefined;
  currentMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number] | undefined;
  majorStateHolder: HTMLDivElement;
  mutationObserver: MutationObserver | null;
}

type machineEventGenericType =
  | {
      type: EE.CLICK_BACK;
    }
  | { type: EE.CLICK_FORTH }
  | { type: EE.OBSERVER };

type machineFiniteStateGenericType =
  | {
      value: fse.idling;
      context: MachineContextGenericI;
    }
  | {
      value: fse.animation_active;
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
  initial: fse.mutation_observer_setup,
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
    mutationObserver: null,
  },

  on: {
    [EE.OBSERVER]: {
      actions,
    },
  },

  states: {
    [fse.mutation_observer_setup]: {
      entry: [
        assign(({}, __) => {
          const config = { attributes: true };
        }),
      ],
    },
  },
});
