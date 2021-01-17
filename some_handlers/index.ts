import { appService, EE, fse, animfse } from "../state_machines/app_machine";
import { isSSR } from "../utils/isSSR";

export const setup = () => {
  if (isSSR()) {
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
    });
  }
};
