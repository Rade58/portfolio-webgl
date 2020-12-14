import { createMachine, assign, interpret } from "xstate";

// -----  CONSTANTS  ------
import { THICK_RATE } from "../constants";

// ---- FINITE STATES  n'   EVENTS ----

export enum fse {
  init = "init",
  idle = "idle",
}

export enum EE {
  PLACEHOLDER = "PLACEHOLDER",
}

// ----------------------------------

// ---- MACHINES GENERIC TYPRES ----
interface MachineContextGenericI {
  placeholder: string;
}

type machineEventGenericType = {
  type: EE.PLACEHOLDER;
  payload: {
    placeholder: string;
  };
};

type machineFiniteStateGenericType =
  | {
      value: fse.init;
      context: {
        placeholder: string;
      };
    }
  | {
      value: fse.idle;
      context: {
        placeholder: string;
      };
    };

// -----------------------------------

// -------------------------------------------------------
// ------------------- MACHINE ---------------------------
// -------------------------------------------------------

const sceneMachine = createMachine<
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType
>({
  id: "sketch_state_machine",
  initial: fse.init,
  context: { placeholder: "" },
  states: {},
});

// -----------------------------------------------------
// -----------------------------------------------------

export const sceneService = interpret(sceneMachine);

sceneService.onTransition((state, event) => {
  console.log("SKETCH STATE MACHINE");
  console.log(`TRANSITIONING TO - ${state.value} - FINITE STATE`);
  console.log(`COSEQUENCE OF - ${event.type} - EVENT`);
  console.log("-------------------------------------");
});

sceneService.start();
