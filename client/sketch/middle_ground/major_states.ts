export enum fse {
  init = "init",
  idle = "idle",

  //
  //
  anim_error = "anim_error",
  //---- major -states (all of them shoud have transitions to idle)
  aboutme = "aboutme",
  projects = "projects",
  contact = "contact",
  dashboard = "dashboard",
  // ANIMATION STATES
  animation0 = "animation0",
  animation1 = "animation1",
  animation2 = "animation2",
  animation3 = "animation3",
  animation4 = "animation4",
  anim_back_to_init = "anim_back_to_init",
  //
}

export const MAJOR_FINITE_STATES_ARRAY = [
  fse.aboutme,
  fse.projects,
  fse.contact,
  fse.dashboard,
];
