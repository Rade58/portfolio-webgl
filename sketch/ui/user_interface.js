const upButton = document.createElement("button");
const downButton = document.createElement("button");
const upButtonCss = /* css */ `
  position: fixed;
  top: 10vh;
  left: 2vw;

`;
const downButtonCss = /* css */ `
  position: fixed;
  top: 30vh;
  left: 2vw;

`;
upButton.style.cssText = upButtonCss;
downButton.style.cssText = downButtonCss;
upButton.textContent = "up";
downButton.textContent = "down";
const elements = {
    up: upButton,
    down: downButton,
};
export default elements;
