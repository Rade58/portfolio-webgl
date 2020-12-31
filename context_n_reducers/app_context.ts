import {
  createContext,
  // types   ==>
  Reducer,
  Context,
  Dispatch,
  SetStateAction,
} from "react";

//  -----------------------------------------
export enum REDUCER_ACTION_TYPES {
  APP_MACINE_LOADED = "APP_MACHINE_LOADED",
}

export interface ReducedStateI {
  app_machine_loaded: boolean;
}

// ------------------------------------------

export const appReducer: Reducer<
  ReducedStateI,
  { type: REDUCER_ACTION_TYPES; payload: any }
> = (state, action) => {
  return state;
};

//  -------

export const defaultState = {
  reducedState: {
    app_machine_loaded: false,
  },
};

export interface ContextStateI {
  reducedState: ReducedStateI;
}

// -----------------

export const appContext: Context<ContextStateI> = createContext(defaultState);

const { Consumer, Provider } = appContext;

export const useContextualState_$ = { appContext, REDUCER_ACTION_TYPES };
export const createContextualState_$ = { Provider, appReducer, defaultState };
