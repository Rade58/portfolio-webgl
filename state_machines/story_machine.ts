import { createMachine, assign, interpret } from "xstate";
import { fse as fseAnim } from "../sketch/machine/anim_state_machine";

export enum fse {
  anim_active = "anim_active",
  idle = "idle",
  aboutme = "aboutme",
}

export enum EE {
  INITIALIZE = "INITIALIZE",
  TO_ANIM = "TO_ANIM",
  TO_MAJOR = "TO_MAJOR",
}
