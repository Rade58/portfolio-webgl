const upButton = document.createElement("button");
export const majorStateHolder = document.createElement("div");
const downButton = document.createElement("button");
const controlsContainer = document.createElement("section");

upButton.className = "up";
majorStateHolder.className = "text_display";
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
  font-size: 2rem;
  margin: 1.6em;
`;

/* ------------- ADDING STYLES ----------- */
controlsContainer.style.cssText = controlsContainerCss;
majorStateHolder.style.cssText = textDisplayStyles;
/* ---------------------------------------- */

/* APPENDING ELEMENTS */
controlsContainer.append(upButton, majorStateHolder, downButton);
/* ------------------- */

const elements = {
  up: upButton,
  down: downButton,
  controlsContainer,
  majorStateHolder,
};

export default elements;
