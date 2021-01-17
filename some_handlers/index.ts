import { appService, EE, fse, animfse } from "../state_machines/app_machine";
import { isSSR } from "../utils/isSSR";

export const setup = () => {
  let initialPress = false;

  if (!isSSR()) {
    window.addEventListener("keydown", (e) => {
      if (!initialPress) {
        if (appService.state.value === fse.idling) {
          console.log(e.key);
          console.log(appService.state.value);
          initialPress = true;
        }
      }
    });
  }
};
