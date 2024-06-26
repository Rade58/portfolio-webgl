import {
  MAJOR_FINITE_STATES_ARRAY,
  fse as sketchFse,
} from "../sketch/middle_ground/major_states";
import { fse as appFse } from "../state_machines/app_machine";
import { fse as storyFse } from "../state_machines/story_machine";

// -----
const loremipsum: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nulla eros mi, lobortis vitae velit viverra, elementum efficitur diam.
  Suspendisse id porttitor tellus. Nulla facilisi. Praesent pulvinar maximus magna sit amet gravida.
  Curabitur scelerisque nibh maximus justo condimentum, non feugiat quam aliquet.
  Nulla aliquam turpis nec tristique laoreet. Curabitur fermentum eget nisl vel semper.
  Nunc ornare efficitur ante ac consequat. Praesent ornare pharetra lectus, ac commodo urna viverra sed.
  Vivamus in ultricies neque. Nunc at elementum justo, sit amet sollicitudin neque.
  Donec ornare tincidunt lectus, at aliquet enim fringilla vel. Morbi et dolor nisl.
  Cras bibendum eget lacus eu gravida. Integer efficitur facilisis vehicula. Morbi ut blandit arcu.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eros mi, lobortis vitae velit viverra, elementum efficitur diam.
  Suspendisse id porttitor tellus. Nulla facilisi. Praesent pulvinar maximus magna sit amet gravida.
  Curabitur scelerisque nibh maximus justo condimentum, non feugiat quam aliquet.
  Nulla aliquam turpis nec tristique laoreet. Curabitur fermentum eget nisl vel semper.
  Nunc ornare efficitur ante ac consequat. Praesent ornare pharetra lectus, ac commodo urna viverra sed.
  Vivamus in ultricies neque. Nunc at elementum justo, sit amet sollicitudin neque. Donec ornare tincidunt lectus, at aliquet enim fringilla vel.
  Morbi et dolor nisl. Cras bibendum eget lacus eu gravida. Integer efficitur facilisis vehicula. Morbi ut blandit arcu.`;
// ----

export const centralMajor = (major: sketchFse): string => {
  if (major === sketchFse.aboutme) {
    return "me";
  }
  if (major === sketchFse.projects) {
    return "projects";
  }
  if (major === sketchFse.contact) {
    return "contact";
  }
  if (major === sketchFse.dashboard) {
    return "dashboard";
  }
};

export const headingStory = (major: sketchFse): string => {
  if (major === sketchFse.aboutme) {
    return "Hey I'm Rade";
  }
  if (major === sketchFse.projects) {
    return "Work";
  }
  if (major === sketchFse.contact) {
    return "Contact";
  }
  if (major === sketchFse.dashboard) {
    return "Dashboard";
  }
};

// ----
const aboutPreview = "Hello my name Is Rade I am";
const projectsPreview = "Here are some of my";
const contactPreview = "You can contact me by";
const blogPreview = "Dashboard";

// ----

export const currentMajor = (major: sketchFse): string => {
  if (major === sketchFse.aboutme) {
    return sketchFse.aboutme;
  }
  if (major === sketchFse.projects) {
    return sketchFse.projects;
  }
  if (major === sketchFse.contact) {
    return sketchFse.contact;
  }
  if (major === sketchFse.dashboard) {
    return sketchFse.dashboard;
  }
};

export const storyMajorText = (
  major: sketchFse,
  lorem: string | undefined,
): string => {
  if (typeof lorem === "string") {
    lorem = loremipsum;
  }

  if (major === sketchFse.aboutme) {
    return lorem || `${aboutPreview} `; // u nastavku template stringa dodajem dalji tekst
  }
  if (major === sketchFse.projects) {
    return lorem || `${projectsPreview} `;
  }
  if (major === sketchFse.contact) {
    return lorem || `${contactPreview} `;
  }
  if (major === sketchFse.dashboard) {
    return lorem || `${blogPreview} `;
  }
};
