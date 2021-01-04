/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { appService, EE } from "../../state_machines/app_machine";

const ComponentName: FunctionComponent = () => {
  const [state, send] = useService(appService);

  /* const effectFlowRef = useRef<number>(0);

  useEffect(() => {
    console.log(window);
    document.body.addEventListener("wheel", (e) => {
      console.log(e.deltaY);
      console.log("wheel");

      if (e.deltaY > 0) {
        send({ type: EE.CLICK_BACK });
      } else {
        send({ type: EE.CLICK_FORTH });
      }
    });
  }, [effectFlowRef]); */

  const {
    currentAnimeMachineFinitestate,
    currentAnimeMachineMajorState,
  } = state.context;

  return (
    <div>
      {state.value} ------ {currentAnimeMachineMajorState} -----{" "}
      {currentAnimeMachineFinitestate}
    </div>
  );
};

export default ComponentName;
