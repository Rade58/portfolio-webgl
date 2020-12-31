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

export interface ReducerStateI {
  app_machine_loaded: boolean;
}

// ------------------------------------------

export const appReducer: Reducer<
  ReducerStateI,
  { type: REDUCER_ACTION_TYPES; payload: any }
> = (state, action) => {
  return state;
};
