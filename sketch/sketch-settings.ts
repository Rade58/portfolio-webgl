import { SettingsI } from "./types/my_types";

export const settingsFunc = (
  settings: SettingsI,
  canvas?: HTMLCanvasElement
): SettingsI => {
  if (canvas) {
    settings.canvas = canvas;
  }

  return settings;
};

const settings: SettingsI = {
  // name: "synth",
  animate: true,
  context: "webgl",
  duration: 28,
  // pixelsPerInch: 4,
  // fps: 24,
  // attributes: { antialis: true },
};

export default settings;
