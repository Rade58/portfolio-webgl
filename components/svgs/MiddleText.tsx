/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { appService, EE, fse } from "../../state_machines/app_machine";

const ComponentName: FunctionComponent = () => {
  const [state, send] = useService(appService);

  const {
    currentAnimeMachineFinitestate,
    currentAnimeMachineMajorState,
  } = state.context;

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {state.value} ------ {currentAnimeMachineMajorState} -----{" "}
      {currentAnimeMachineFinitestate}
    </div>
  );
};

export default ComponentName;
