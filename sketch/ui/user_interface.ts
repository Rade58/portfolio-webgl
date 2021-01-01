const moveButtonUp = document.createElement("button");
const moveButtonDown = document.createElement("button");
export const majorStateHolder = document.createElement("div");

const controlsContainer = document.createElement("section");

moveButtonUp.className = "move_button_up";
moveButtonDown.className = "move_button_down";
majorStateHolder.className = "major_state_holder";

controlsContainer.className = "controls-container";

moveButtonUp.textContent = "&";
moveButtonDown.textContent = "$";

// ---------------- STYLES -----------------------------------------

const controlsContainerCss = /* css */ `
  position: fixed;
  top: 10vh;
  left: 2vw;

`;

const buttonsCss = /* css */ `
  /* visibility: hidden; */
`;

/* ------------- ADDING STYLES ----------- */
controlsContainer.style.cssText = controlsContainerCss;
moveButtonDown.style.cssText = moveButtonUp.style.cssText = buttonsCss;
/* ---------------------------------------- */

/* APPENDING ELEMENTS */
controlsContainer.append(moveButtonUp, moveButtonDown, majorStateHolder);
/* ------------------- */

const elements = {
  moveButtonUp,
  moveButtonDown,
  controlsContainer,
  majorStateHolder,
};

export enum CssClassesEnum {
  controlscontainer = "controls-container",
  major_state_holder = "controls-container",
  move_button_up = "move_button_up",
  move_button_down = "move_button_down",
}

export default elements;
