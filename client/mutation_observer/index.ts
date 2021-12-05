import { EE, appService } from "../state_machines/app_machine";
import { fse as fseAnim } from "../sketch/middle_ground/major_states";

export const config = { attributes: true };
export const majorStateHolder = document.querySelector(
  "div.major_state_holder"
) as HTMLDivElement;

const animationMachineObserver = new MutationObserver(
  (mutationList, observer) => {
    // console.log("mutations");

    for (const mutation of mutationList) {
      // debugger;
      if (mutation.type === "attributes") {
        appService.send({
          type: EE.OBSERVER,
          payload: {
            currentAnimeMachineFinitestate:
              /* (mutation.target as HTMLDivElement)
                        .dataset.finiteState */ majorStateHolder.dataset
                .finiteState as fseAnim,
            currentAnimeMachineMajorState:
              /* (mutation.target as HTMLDivElement)
                        .dataset.majorState */ majorStateHolder.dataset
                .majorState as fseAnim,
            canLoadControls:
              majorStateHolder.dataset.firstRenderHappened === "happened"
                ? true
                : false,
          },
        });
      }
    }
  }
);

// animationMachineObserver.observe(majorStateHolder, config);

export default animationMachineObserver;
