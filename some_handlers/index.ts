import { appService, EE, fse, animfse } from "../state_machines/app_machine";
import {
  storyService,
  EE as EEstory,
  fse as fseStory,
} from "../state_machines/story_machine";
import { isSSR } from "../utils/isSSR";

export const setup = () => {
  if (!isSSR()) {
    window.addEventListener("keydown", (e) => {
      // console.log(storyService.state);

      if (
        appService.state.value === fse.idling &&
        (storyService.state.value === fseStory.idle ||
          storyService.state.value[fseStory.idle])
      ) {
        if (e.key === "ArrowLeft") {
          appService.send({
            type: EE.CLICK_BACK,
          });
        }

        if (e.key === "ArrowRight") {
          appService.send({
            type: EE.CLICK_FORTH,
          });
        }
      }
    });
  }
};
