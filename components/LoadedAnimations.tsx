/* eslint jsx-a11y/anchor-is-valid: 1 */
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { animfse } from "../state_machines/app_machine";

const LoadedAnimations: FunctionComponent = () => {
  const [animeMachineReady, setAnimeMachineReady] = useState(0);

  useEffect(() => {
    import("../mutation_observer").then(async (module) => {
      const {
        config,
        majorStateHolder,
        default: animationMachineMutationObserver,
      } = module;

      const { appService, EE } = await import("../state_machines/app_machine");

      animationMachineMutationObserver.observe(majorStateHolder, config);

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

      if (majorStateHolder.dataset.firstRenderHappened === "happened") {
        appService.start();
        console.log("app service started");

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

        return;
      }

      setAnimeMachineReady((old) => old + 1);

      /* dispatchToReducer({
        type: REDUCER_ACTION_TYPES.APP_MACINE_LOADED,
        payload: {
          appService,
        },
      }); */
    });
  }, [animeMachineReady]);

  return null;
};

export default LoadedAnimations;
