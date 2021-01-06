/* eslint jsx-a11y/anchor-is-valid: 1 */
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useService } from "@xstate/react";
import { animfse, appService, EE, fse } from "../state_machines/app_machine";

// import { useContextualState_$ } from "../context_n_reducers/app_context";

const LoadedAnimations: FunctionComponent = () => {
  // const { REDUCER_ACTION_TYPES, appContext } = useContextualState_$;

  // const { dispatchToReducer } = useContext(appContext);

  const [state, send] = useService(appService);

  useEffect(() => {
    import("../mutation_observer").then(async (module) => {
      const {
        config,
        majorStateHolder,
        default: animationMachineMutationObserver,
      } = module;

      console.log(majorStateHolder);

      // const { appService, EE } = await import("../state_machines/app_machine");

      animationMachineMutationObserver.observe(majorStateHolder, config);

      const currentAnimeMachineFinitestate = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.finiteState as animfse;
      const currentAnimeMachineMajorState = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.majorState as animfse;
      const canLoadControls: boolean =
        ((document.querySelector("div.major_state_holder") as HTMLDivElement)
          .dataset.firstRenderHappened as "happened" | "not_happened") ===
        "happened"
          ? true
          : false;

      const backButton = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      ) as HTMLButtonElement;
      const forwardButton = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      ) as HTMLButtonElement;

      send({
        type: EE.INIT,
        payload: {
          backButton,
          currentAnimeMachineFinitestate,
          currentAnimeMachineMajorState,
          forwardButton,
          majorStateHolder,
          canLoadControls,
        },
      });

      /*  dispatchToReducer({
        type: REDUCER_ACTION_TYPES.APP_MACINE_LOADED,
        payload: {
          appService,
        },
      }); */
    });
  }, []);

  /* const effectFlowRef = useRef<number>(0);

  const wheelAllowedRef = useRef<boolean>(true);

  useEffect(() => {
    wheelAllowedRef.current = state.context.wheelAllowed;
  }, [state.context]);

  useEffect(() => {
    // console.log(window);

    if (!window && !window.document && !window.document.body) {
      effectFlowRef.current = effectFlowRef.current + 1;
      return;
    }

    document.body.addEventListener("wheel", (e) => {
      console.log(state.value, state.context);



      if (
        state &&
        state.context &&
        state.context.currentAnimeMachineFinitestate &&
        (state.context.currentAnimeMachineFinitestate === "init" ||
          state.context.currentAnimeMachineFinitestate === "idle")
      ) {
        console.log(state.context.wheelAllowed);

        if (wheelAllowedRef.current) {
          if (e.deltaY > 50) {
            send({ type: EE.CLICK_BACK });
          } else if (e.deltaY < -50) {
            send({ type: EE.CLICK_FORTH });
          }
        }
      }
    });


  }, [effectFlowRef]); */

  return null;
};

export default LoadedAnimations;
