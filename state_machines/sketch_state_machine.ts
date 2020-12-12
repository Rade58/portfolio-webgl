import { Console } from "console";
import { createMachine, assign, interpret } from "xstate";

// ---- FINITE STATES  n'   EVENTS ----

export enum fse {
  idle = "idle",
  blah = "blah",
}

export enum EE {
  TOGGLE = "TOGGLE",
  PLACEHOLDER = "PLACEHOLDER",
}

// ----------------------------------

// ---- MACHINES GENERIC TYPRES ----
interface MachineContextGenericI {
  tick: number;
}

type machineEventGenericType =
  | {
      type: EE.TOGGLE;
    }
  | {
      type: EE.PLACEHOLDER;
      payload: {
        placeholder: string;
      };
    };

type machineFiniteStateGenericType =
  | {
      value: fse.idle;
      context: {
        tick: number;
      };
    }
  | {
      value: fse.blah;
      context: {
        tick: number;
      };
    };

// -----------------------------------

// -------------------------------------------------------
// ------------------- MACHINE ---------------------------
// -------------------------------------------------------

const sketchMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>({
  id: "sketch_state_machine",
  initial: fse.idle,
  context: {
    tick: 0,
  },
  states: {
    [fse.idle]: {
      on: {
        [EE.TOGGLE]: {
          target: fse.blah,
        },
      },
    },
    [fse.blah]: {
      on: {
        [EE.TOGGLE]: {
          target: fse.idle,
        },
      },
    },
  },
});

// -----------------------------------------------------
// -----------------------------------------------------

export const sketchService = interpret(sketchMachine);

sketchService.onTransition((state, event) => {
  console.log("SKETCH STATE MACHINE");
  console.log(`TRANSITIONING TO ${state.value} FINITE STATE`);
  console.log(`COSEQUENCE OF ${event.type} EVENT`);
  console.log("-------------------------------------");
});

sketchService.start();
