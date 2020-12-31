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
  app_machine_loaded: boolean;
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

export const appReducer: Reducer<
  ReducedStateI,
  { type: REDUCER_ACTION_TYPES; payload: any }
> = (state, action) => {
  if (action.type === REDUCER_ACTION_TYPES.APP_MACINE_LOADED) {
    return { ...state, app_machine_loaded: true };
  }

  return state;
};

//  -------

export const defaultState: AppStateI = {
  reducedState: {
    app_machine_loaded: false,
    appService: null,
  },
  dispatchToReducer: () => {},
};

// -----------------

export const appContext: Context<AppStateI> = createContext(defaultState);

const { Provider } = appContext;

export const useContextualState_$ = { appContext, REDUCER_ACTION_TYPES };
export const createContextualState_$ = { Provider, appReducer, defaultState };
