import { EE, appService } from "../state_machines/app_machine";
import { fse as fseanim } from "../sketch/machine/anim_state_machine";

export const config = { attributes: true };
export const majorStateHolder = document.querySelector(
  "div.major_state_holder"
) as HTMLDivElement;

let state1: fseanim;
let state2: fseanim;

const animationMachineObserver = new MutationObserver(
  (mutationList, observer) => {
    console.log("mutations");

    for (const mutation of mutationList) {
      // debugger;
      if (mutation.type === "attributes") {
        // TREBALO BI DA HANDLE-UJEM D NEMA SLANJE EVENT-OVA AKO JE U PITNJU ISTI STATE
        // KAO I RANIJE

        if (
          state1 !== (majorStateHolder.dataset.finiteState as fseanim) &&
          state2 !== (majorStateHolder.dataset.majorState as fseanim)
        ) {
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
                majorStateHolder.dataset.firstRenderHappened === "happened"
                  ? true
                  : false,
            },
          });

          state1 = majorStateHolder.dataset.finiteState as fseanim;
          state2 = majorStateHolder.dataset.majorState as fseanim;
        }
      }
    }
  }
);

// animationMachineObserver.observe(majorStateHolder, config);

export default animationMachineObserver;
