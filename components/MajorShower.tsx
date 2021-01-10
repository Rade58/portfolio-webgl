/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { useService } from "@xstate/react";
import { storyService } from "../state_machines/story_machine";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const MajorShowers: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  const prevRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLHeadingElement>(null);

  if (!major || major === "undefined") {
    return null;
  }

  const currIndex: number = MAJOR_FINITE_STATES_ARRAY.indexOf(major);

  const nextIndex: number =
    currIndex + 1 > MAJOR_ARR_LENGTH - 1 ? 0 : currIndex + 1;
  const prevIndex: number =
    currIndex - 1 < 0 ? MAJOR_ARR_LENGTH - 1 : currIndex - 1;

  return (
    <section
      className="story"
      css={css`
        border: crimson solid 1px;
        position: fixed;
        top: 60vh;
        left: center;
        bottom: 68px;

        display: flex;
        width: 348px;
        justify-content: space-between;

        overflow: hidden;

        & h1 {
          font-size: 2.8rem;
        }

        & h4 {
          align-self: flex-end;

          &:hover {
            transform: translateY(10px) translateX(10px);
          }
        }
      `}
    >
      <h4 ref={prevRef}>{MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
      <h1>{major}</h1>
      <h4 ref={nextRef}>{MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
    </section>
  );
};

export default MajorShowers;
