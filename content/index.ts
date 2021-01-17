import {
  MAJOR_FINITE_STATES_ARRAY,
  fse as sketchFse,
} from "../sketch/middle_ground/major_states";
import { fse as appFse } from "../state_machines/app_machine";
import { fse as storyFse } from "../state_machines/story_machine";

export const centralMajor = (major: sketchFse) => {
  if (major === sketchFse.aboutme) {
    return "";
  }
};

// ----
const aboutPreview = "Hello my name Is Rade I am";

// ----

export const storyPreview = (major: sketchFse) => {
  if (major === sketchFse.aboutme) {
    return aboutPreview;
  }
};

export const storyMajor = (major: sketchFse) => {
  if (major === sketchFse.aboutme) {
    return `${aboutPreview} `;
  }
};
