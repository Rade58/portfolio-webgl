/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useService } from "@xstate/react";

// import { animfse } from "../state_machines/app_machine";
import { EE, appService } from "../state_machines/app_machine";

import Back from "./svgs/Back";
import Forth from "./svgs/Forth";
import MiddleText from "./svgs/MiddleText";

const ControlAnim: FunctionComponent = () => {
  const [state, send] = useService(appService);

  const { context } = state;

  if (!state) {
    return null;
  }

  if (!state.value) {
    return null;
  }

  if (!context && !context.canLoadControls) {
    return null;
  }

  return (
    <section
      className="anim_control"
      css={css`
        border: crimson solid 2px;
        position: fixed;
        /* top: 0; */
        left: 0;
        bottom: 0;
        width: 100vw;
        /* overflow-y: scroll; */
        display: flex;
        justify-content: space-between;
      `}
    >
      <Back />
      <MiddleText />
      <Forth />
    </section>
  );
};

export default ControlAnim;
