const moveButton = document.createElement("button");
export const majorStateHolder = document.createElement("div");

const controlsContainer = document.createElement("section");

moveButton.className = "move_button";
majorStateHolder.className = "major_state_holder";

controlsContainer.className = "controls-container";

moveButton.textContent = "&";

// ---------------- STYLES -----------------------------------------

const controlsContainerCss = /* css */ `
  position: fixed;
  top: 10vh;
  left: 2vw;

`;

/* ------------- ADDING STYLES ----------- */
controlsContainer.style.cssText = controlsContainerCss;
/* ---------------------------------------- */

/* APPENDING ELEMENTS */
controlsContainer.append(moveButton, majorStateHolder);
/* ------------------- */

const elements = {
  move_button: moveButton,

  controlsContainer,
  majorStateHolder,
};

export default elements;
