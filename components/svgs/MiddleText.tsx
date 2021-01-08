/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { appService, EE, fse } from "../../state_machines/app_machine";

import { storyService } from "../../state_machines/story_machine";

const ComponentName: FunctionComponent = () => {
  const [appState, sentToAppMachine] = useService(appService);

  const [storyState, sendToStoeyMachine] = useService(storyService);

  const {
    currentAnimeMachineFinitestate,
    currentAnimeMachineMajorState,
  } = appState.context;

  const { major } = storyState.context;

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {storyState.value} ------ {major} -----{" "}
      {/* {currentAnimeMachineFinitestate} */}
    </div>
  );
};

export default ComponentName;

// {
/* <div
      css={css`
        width: 100%;
      `}
    >
      {appState.value} ------ {currentAnimeMachineMajorState} -----{" "}
      {currentAnimeMachineFinitestate}
    </div> */
// }
