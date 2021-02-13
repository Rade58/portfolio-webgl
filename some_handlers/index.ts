import { appService, EE, fse, animfse } from "../state_machines/app_machine";
import {
  storyService,
  EE as EEstory,
  fse as fseStory,
  EEs, //idle substate anticepated events
  fseS,
} from "../state_machines/story_machine";
import { isSSR } from "../utils/isSSR";

export const setup = () => {
  if (!isSSR()) {
    // KEYDOWNS -------------------------------------

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

      const { mediaBellow } = storyService.state.context;

      if (mediaBellow) {
        if (
          storyService.state &&
          storyService.state.value &&
          storyService.state.value[fseStory.idle]
        ) {
          const substate = storyService.state.value[fseStory.idle];

          /*  console.log({ target: e.currentTarget });
          console.log({ target: e.target });

          debugger; */

          if (substate === fseS.partial) {
            // console.log({ substate });
            // console.log("full open sent");
            if (e.key === "ArrowDown") {
              storyService.send({
                type: EEs.FULL_OPEN,
              });
            }
          }

          if (substate === fseS.maximal) {
            // console.log({ substate });
            // console.log("narrow it sent");
            if (e.key === "ArrowUp") {
              // OVO DAKLE IDE
              // -----------_______---------_______
              storyService.send({
                type: EEs.ARROW_UP_PUSHED,
              });
              // -----------_______---------_______
              // UMESTO OVOGA
              storyService.send({
                type: EEs.NARROW_IT,
              });
            }
          }
        }
      }
    });

    // CLICK ON BODY ------------------------------------
    document.body.addEventListener("click", (e) => {
      // debugger;
      // console.log()
    });
  }
};
