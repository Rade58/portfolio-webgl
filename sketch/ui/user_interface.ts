const upButton = document.createElement("button");
export const textDisplay = document.createElement("div");
const downButton = document.createElement("button");
const controlsContainer = document.createElement("section");

upButton.className = "up";
textDisplay.className = "text_display";
downButton.className = "down";
controlsContainer.className = "controls-container";

upButton.textContent = "up";
downButton.textContent = "down";

// ---------------- STYLES -----------------------------------------

const controlsContainerCss = /* css */ `
  position: fixed;
  top: 10vh;
  left: 2vw;

`;

const textDisplayStyles = /* css */ `
  color: crimson;
`;

/* ------------- ADDING STYLES ----------- */
controlsContainer.style.cssText = controlsContainerCss;

/* ---------------------------------------- */

/* APPENDING ELEMENTS */
controlsContainer.append(upButton, textDisplay, downButton);
/* ------------------- */

const elements = {
  up: upButton,
  down: downButton,
  controlsContainer,
  textDisplay,
};

export default elements;
