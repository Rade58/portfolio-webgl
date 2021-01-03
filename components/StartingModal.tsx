/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService } from "../state_machines/app_machine";

const StartingModal: FunctionComponent = () => {
  const [state, send] = useService(appService);
  const { canLoadControls } = state.context;
  return (
    !canLoadControls && (
      <aside
        css={css`
          background-color: #207c88;
          position: fixed;
          z-index: 8;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
      >
        spinner
      </aside>
    )
  );
};

export default StartingModal;
