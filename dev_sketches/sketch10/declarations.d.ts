import { threeType } from "./my_types";

// declaration file not working for some reason
// something went wrong
declare namespace NodeJS {
  interface Global {
    THREE: threeType;
  }
}
