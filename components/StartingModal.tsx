/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css } from "@emotion/core";

import { TweenMax, Power4 } from "gsap";

import { useService } from "@xstate/react";

import { appService } from "../state_machines/app_machine";

const StartingModal: FunctionComponent<{ imageData: string }> = ({
  imageData,
}) => {
  const [state, send] = useService(appService);
  const { canLoadControls } = state.context;

  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (canLoadControls) {
      if (modalRef.current) {
        TweenMax.to(modalRef.current, 0.58, {
          translateY: "218%",
          ease: Power4.easeIn,
        });
      }
    }
  }, [modalRef, canLoadControls]);

  return (
    <aside
      ref={modalRef}
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
      {/* spinner */}
      <img alt="modal_image" src={`data:image/png;base64,${imageData}`} />
    </aside>
  );
};

export default StartingModal;
