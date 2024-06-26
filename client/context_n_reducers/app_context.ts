import {
  createContext,
  // types   ==>
  Reducer,
  Context,
  Dispatch,
  // SetStateAction,
} from "react";
import { Interpreter } from "xstate";
import {
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType,
} from "../state_machines/app_machine";

//  -----------------------------------------
export enum REDUCER_ACTION_TYPES {
  APP_MACINE_LOADED = "APP_MACHINE_LOADED",
}

export interface ReducedStateI {
  appService: Interpreter<
    MachineContextGenericI,
    any,
    machineEventGenericType,
    machineFiniteStateGenericType
  > | null;
}

interface AppStateI {
  reducedState: ReducedStateI;
  dispatchToReducer: Dispatch<{
    type: REDUCER_ACTION_TYPES;
    payload: any;
  }>;
}

// ------------------------------------------
// no-op
export const appReducer: Reducer<
  ReducedStateI,
  { type: REDUCER_ACTION_TYPES; payload: any }
> = (state, action) => {
  /* if (action.type === REDUCER_ACTION_TYPES.APP_MACINE_LOADED) {
    const { appService } = action.payload as {
      appService: Interpreter<
        MachineContextGenericI,
        any,
        machineEventGenericType,
        machineFiniteStateGenericType
      >;
    };

    return { ...state, appService };
  } */

  return state;
};

//  -------

export const defaultState: AppStateI = {
  reducedState: {
    appService: null,
  },
  dispatchToReducer: () => {},
};

// -----------------

export const appContext: Context<AppStateI> = createContext(defaultState);

const { Provider } = appContext;

export const useContextualState_$ = { appContext, REDUCER_ACTION_TYPES };
export const createContextualState_$ = { Provider, appReducer, defaultState };
