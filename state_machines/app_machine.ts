import { createMachine, assign, interpret } from "xstate";

import { CssClassesEnum } from "../sketch/ui/user_interface";
import {
  fse as animeFse,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/machine/anim_state_machine";

enum fse {
  animation_active = "animation_active",
  idling = "idling",
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
}

interface ContextI {
  currentFiniteStateAnimeMachine: animeFse | undefined;
  currentMajorState: typeof MAJOR_FINITE_STATES_ARRAY[number] | undefined;
  majorStateHolder: HTMLDivElement | null;
}
