/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, useContext, useEffect, useRef } from "react";

import { animfse } from "../state_machines/app_machine";

import { useContextualState_$ } from "../context_n_reducers/app_context";

const LoadedAnimations: FunctionComponent = () => {
  const { REDUCER_ACTION_TYPES, appContext } = useContextualState_$;

  const { dispatchToReducer } = useContext(appContext);

  useEffect(() => {
    import("../mutation_observer").then(async (module) => {
      const {
        config,
        majorStateHolder,
        default: animationMachineMutationObserver,
      } = module;

      const { appService, EE } = await import("../state_machines/app_machine");

      animationMachineMutationObserver.observe(majorStateHolder, config);

      appService.start();
      console.log("loaded");

      const currentAnimeMachineFinitestate = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.finiteState as animfse;
      const currentAnimeMachineMajorState = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.majorState as animfse;

      const backButton = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      ) as HTMLButtonElement;
      const forwardButton = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      ) as HTMLButtonElement;

      appService.send({
        type: EE.INIT,
        payload: {
          backButton,
          currentAnimeMachineFinitestate,
          currentAnimeMachineMajorState,
          forwardButton,
          majorStateHolder,
        },
      });

      dispatchToReducer({
        type: REDUCER_ACTION_TYPES.APP_MACINE_LOADED,
        payload: {
          appService,
        },
      });
    });
  }, []);

  return null;
};

export default LoadedAnimations;
