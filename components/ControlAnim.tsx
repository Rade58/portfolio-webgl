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
        overflow-y: scroll;
      `}
    >
      <section>8</section>
      <section>8</section>
      {/*  */}
      {appService && (
        <svg
          tabIndex={0}
          onClick={() => {
            if (appService) {
              console.log("click back");
              send({ type: EE.CLICK_BACK });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (appService) {
                send({ type: EE.CLICK_BACK });
              }
            }
          }}
          /* NO NEED FOR px ON width AND height */
          width="200"
          height="120"
          aria-labelledby="go_back"
          id="svg"
          role="button" /*"presentation"*/ /* or role="imge"*/
          lang="en"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 380 210"
        >
          <title id="go_back">Your Title Goes here</title>
          <rect width="200" height="180" x="8" y="8" fill="crimson" />
        </svg>
      )}
      {context.currentAnimeMachineMajorState}
      {appService && (
        <svg
          tabIndex={0}
          onClick={() => {
            if (appService) {
              console.log("click forward");
              send({ type: EE.CLICK_FORTH });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (appService) {
                send({ type: EE.CLICK_FORTH });
              }
            }
          }}
          /* NO NEED FOR px ON width AND height */
          width="200"
          height="120"
          aria-labelledby="go_forward"
          id="svg"
          role="button" /*"presentation"*/ /* or role="imge"*/
          lang="en"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 380 210"
        >
          <title id="go_forward">Your Title Goes here</title>
          <rect width="200" height="180" x="8" y="8" fill="crimson" />
        </svg>
      )}
      {/*  */}
    </section>
  );
};

export default ControlAnim;
