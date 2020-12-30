import { createMachine, assign, interpret } from "xstate";

import { CssClassesEnum } from "../sketch/ui/user_interface";

enum fse {
  animation_active = "animation_active",
  idling = "idling",
}

export enum EE {
  CLICK_BACK = "CLICK_BACK",
  CLICK_FORTH = "CLICK_FORTH",
}
