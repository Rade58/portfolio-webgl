import { Regl } from "regl";

import three from "three";

export type threeType = typeof three;

// DODAOA SAM OVE TYPES, CITAJUCI DOKUMENTACIJU
// https://github.com/mattdesl/canvas-sketch/blob/master/docs/api.md#props
export interface SketchPropsI {
  gl: WebGL2RenderingContext;

  context: CanvasRenderingContext2D | { canvas: HTMLCanvasElement };
  canvas: HTMLCanvasElement;

  time: number;
  playhead: number;

  units: string;
  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;
  stylewWidth: number;
  styleHeight: number;
  scaleX: number;
  scaleY: number;
  pixelRatio: number;
  pixelsPerInch: number;

  frame: number;

  deltaTime: number;
  playing: boolean;
  duration: number;
  totalFrame: number;
  fps: number;

  exporting: boolean;
  recording: boolean;
  settings: SettingsI;
}
// OVO SAM DODAO PRETRZIVAJUCI PO DOKUMNTACIJI DOKUMENTACIJE
// https://github.com/mattdesl/canvas-sketch/blob/master/docs/api.md#settings
export interface SettingsI {
  // SIZE SETTINGS
  dimensions?: string | [number, number];
  units?: "in" | "cm" | "px" | "ft" | "m" | "mm";
  pixelsPerInch?: number;
  orientation?: "landscape" | "portrait";
  scaleToFit?: boolean;
  scaleToView?: boolean;
  bleed?: number;
  pixelRatio?: number;
  exportPixelRatio?: number;
  maxPixelRatio?: number;
  scaleContext?: boolean;
  resizeCanvas?: boolean;
  styleCanvas?: boolean;
  // DOM SETTINGS
  canvas?: undefined | HTMLCanvasElement; // NISAM SIGURAN DA LI JE OVO PRAVI TYPE (verujem da jeste)
  context?: CanvasRenderingContext2D | "webgl";
  attributes?: any;
  parent?: HTMLElement | boolean;
  // EXPORT SETTINGS
  file?: string | (() => void); // MOZDA SE OVA FUNKCIJA TREBA BOLJE TYPE-OVATI
  name?: string;
  prefix?: string;
  suffix?: string | number; // U DOCSIMA STOJI SAMO STRING, ALI JA MISLI MDA SAM KORISTIO BROJ NEGDE
  encoding?: "image/png" | "image/jpeg" | "image/webp";
  encodingQuality?: number;
  // ANIMATION SETTINGS
  animate?: boolean;
  playing?: boolean;
  loop?: boolean;
  duration?: number;
  totalFrames?: number;
  fps?: number;
  playbackRate?: undefined | string | "fixed" | "throttle";
  timeScale?: number;
  frame?: number;
  time?: number;
  // MISC SETTINGS
  flush?: boolean;
  pixelated?: boolean;
  hotkeys?: boolean;
  p5?:
    | boolean
    | "P5Instance KAD JE INSTALIRAS (NADJI SAM OVA JTYPE ALI NE TREBA MI)";
  id?: string;
  data?: any;
}

interface ResizePropsI extends SketchPropsI {
  viewportWidth: number;
  viewportHeight: number;
}

export interface SketchReturnType {
  // ZNAM DA RENDER KORISTI ISTE PROPSE KAO I sketch FUNKCIJA
  render?: (props: SketchPropsI) => void;
  resize?: (props: ResizePropsI) => void;
  unload?: (props: SketchPropsI) => void;
  // OVO CU TYPE-OVATI AS I GO, JER JE DOKUMNTAIJA NEPOTPUNA
  begin?: any;
  end?: any;
  tick?: any;
  preExport?: any;
  postExport?: any;
}

// OVO DOLE JE TYPING ZA FUNKCIJU CIJI SE RETURN-UJE IZ sketch
// FUNKCIJE AKO ZELIS SAMO DA DEVELOP-UJES SHADER

// OVE TYPE-OVE SAM DODAO STO SAM HOVER-OVAO NEKI CODE
// NEPOTPUNO JE ZBOG NEPOTPUNE DOKUMENTACIJE

export type createShaderType = (props: {
  clearColor?: string;

  // OVO SAM KASNIJE DODAO A T OTREBA DA BUDE WEBGL CONTEXT
  gl?: WebGL2RenderingContext;
  // Specify fragment and/or vertex shader strings
  // OVO JESTE ONAJ TEMPLATE STRING GLSL CODE-A
  frag?: string;
  // Specify additional uniforms to pass down to the shaders

  // DAKLE OVO BI TREBALO DA BUDE TYPED KAO RECORD
  // KOJI IMA STRING KAO KLJUC A VALUE      {value: any}

  uniforms?: Record<string, { value: any }>;
}) => {
  render: (props: any) => void;
  regl: Regl;
  drawQuad: (props: any) => void;
  unload: () => void;
};
//

export type shaderType = {
  render: (props: any) => void;
  regl: Regl;
  drawQuad: (props: any) => void;
  unload: () => void;
};
