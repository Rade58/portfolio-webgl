/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { TweenMax, Power3 } from "gsap";
import { useService } from "@xstate/react";

import { storyService, fse, fseS } from "../state_machines/story_machine";

import { storyPreview } from "../content";

import { upDownArrowHeight } from "../css_vars";

const PreviewStory: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const tekstRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (tekstRef.current) {
      if (state.value[fse.idle] && state.value[fse.idle] === fseS.partial) {
        TweenMax.fromTo(
          tekstRef.current,
          {
            delay: 0.4,
            opacity: 0,
            duration: 0.08,
            ease: Power3.easeIn,
          },
          {
            opacity: 1,
            delay: 0.4,
          }
        );
      }

      if (state.value[fse.idle] && state.value[fse.idle] === fseS.maximal) {
        TweenMax.fromTo(
          tekstRef.current,
          {
            opacity: 1,
            duration: 0.08,
            ease: Power3.easeIn,
          },
          {
            opacity: 0,
          }
        );
      }
    }
  }, [tekstRef]);

  return (
    <div
      className="preview"
      css={css`
        margin-bottom: ${upDownArrowHeight};

        & .tekst {
          & .three-dots {
            color: crimson;
            font-size: 1.2rem;
          }
        }
      `}
    >
      {state && state.context && state.context.mediaBellow && state.value && (
        <div className="tekst" ref={tekstRef}>
          {state.context.major !== "undefined" &&
            storyPreview(state.context.major)}
          <span className="three-dots">...</span>
        </div>
      )}
    </div>
  );
};

export default PreviewStory;
