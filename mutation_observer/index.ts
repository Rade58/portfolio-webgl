import { EE, appService } from "../state_machines/app_machine";
import { fse as fseanim } from "../sketch/machine/anim_state_machine";

export const config = { attributes: true };
export const majorStateHolder = document.querySelector(
  "div.major_state_holder"
) as HTMLDivElement;

const animationMachineObserver = new MutationObserver(
  (mutationList, observer) => {
    for (const mutation of mutationList) {
      // debugger;
      if (mutation.type === "attributes") {
        appService.send({
          type: EE.OBSERVER,
          payload: {
            currentAnimeMachineFinitestate: /* (mutation.target as HTMLDivElement)
                        .dataset.finiteState */ majorStateHolder
              .dataset.finiteState as fseanim,
            currentAnimeMachineMajorState: /* (mutation.target as HTMLDivElement)
                        .dataset.majorState */ majorStateHolder
              .dataset.majorState as fseanim,
            canLoadControls:
              (mutation.target as HTMLDivElement).dataset.majorState ===
              "happened"
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
