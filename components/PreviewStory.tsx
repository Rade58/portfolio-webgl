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

import { fse as majorFse } from "../sketch/middle_ground/major_states";

import {
  upDownArrowHeight as bottomMargin,
  previewHeight,
  previewMargin,
  matchMediaMaxWidth,
  aboveMediaArticleMargin,
} from "../css_vars";

interface PropsStoryI {
  data: {
    [majorFse.aboutme]: any;
    [majorFse.projects]: any;
    [majorFse.contact]: any;
    [majorFse.blog]: any;
  };
}

const PreviewStory: FunctionComponent<PropsStoryI> = ({ data }) => {
  const [state, send] = useService(storyService);

  const tekstRef = createRef<HTMLDivElement>();
  const previewRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (tekstRef.current && previewRef.current) {
      console.log(state.value);

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
        // ----------------------------------------------
        TweenMax.fromTo(
          previewRef.current,
          {
            delay: 0.4,

            height: 0,
            marginBottom: 0,
            duration: 0.08,
            ease: Power3.easeIn,
          },
          {
            height: previewHeight,
            marginBottom: bottomMargin,
            delay: 0.4,
          }
        );
      }
      //  -------- <><><><><><><><><><><><><><><><><> --------
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
        // ----------------------------------------------
        TweenMax.fromTo(
          previewRef.current,
          {
            height: previewHeight,
            marginBottom: bottomMargin,
            duration: 0.08,
            ease: Power3.easeIn,
          },
          {
            height: 0,
            marginBottom: 0,
          }
        );
      }
    }
  }, [state]);

  const { mediaBellow } = state.context;

  let height = "0px";
  let margin = "0px";

  if (!mediaBellow) {
    height = "0px";
    margin = "0px";
  } else {
    if (state.value && state.value[fse.idle]) {
      if (state.value[fse.idle] === fseS.partial) {
        height = previewHeight;
        margin = previewMargin;
      }

      if (state.value[fse.idle] === fseS.maximal) {
        height = "0px";
        margin = "0px";
      }
    }
  }

  return (
    <div
      style={{
        // ovo je problem
        height,
        marginBottom: !mediaBellow ? aboveMediaArticleMargin : margin,
      }}
      ref={previewRef}
      className="preview"
      css={css`
        box-sizing: border-box;

        border: pink solid 0px;

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
          {/* {state.context.major !== "undefined" &&
            storyPreview(state.context.major)} */}
          {state.context.major !== "undefined" &&
            data[state.context.major] &&
            data[state.context.major].previewText}
          <span className="three-dots">...</span>
        </div>
      )}
    </div>
  );
};

export default PreviewStory;
