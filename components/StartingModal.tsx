/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css } from "@emotion/core";

import Image from "next/image";

import { TweenMax, Power4 } from "gsap";

import { useService } from "@xstate/react";

import { appService, EE } from "../state_machines/app_machine";

import PracticeSvgText from "./practice/svg_text_practice";

import StartSpiner from "./svgs/StartSpiner";

const StartingModal: FunctionComponent<{ imageData: string }> = ({
  imageData,
}) => {
  const [state, send] = useService(appService);
  const { canLoadControls } = state.context;

  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (canLoadControls) {
      if (modalRef.current) {
        TweenMax.to(modalRef.current, 1.78, {
          translateY: "218%",
          ease: Power4.easeIn,
        }).then(() => {
          send({ type: EE.CLOSE_MODAL });
        });
      }
    }
  }, [modalRef, canLoadControls]);

  return (
    <aside
      ref={modalRef}
      css={css`
        background-color: #627aa7;
        position: fixed;
        z-index: 8;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    >
      <StartSpiner />
      {/* spinner */}
      <PracticeSvgText />
      {/* <img alt="modal_image" src={`data:image/png;base64,${imageData}`} /> */}
      <Image
        alt="modal_image"
        src={`data:image/png;base64,${imageData}`}
        // width={100}
        // height={200}
        layout="fill"
      />
    </aside>
  );
};

export default StartingModal;
