/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { useService } from "@xstate/react";
import { storyService, fse } from "../state_machines/story_machine";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const MajorShowers: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  const prevRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLHeadingElement>(null);
  const currRef = useRef<HTMLHeadingElement>(null);
  const currFiniteStateRef = useRef<fse | "undefined">("undefined");

  useEffect(() => {
    console.log({ STATE_VALUE: state.value });
  }, [state]);

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
        flex-basis: 348px;
        max-width: 100vw;
        flex-grow: 1;
        flex-shrink: 1;
        justify-content: space-between;
        flex-wrap: wrap;

        overflow: hidden;

        & h1 {
          font-size: 2.8rem;
          width: 100%;
          text-align: center;
          border: tomato inset 2px;
          align-self: flex-start;
          justify-self: center;
          margin: 0px auto;
        }

        & h4 {
          align-self: flex-end;
          border: pink solid 1px;

          &:hover {
            transform: translateY(10px) translateX(10px);
          }
        }
      `}
    >
      <h1 ref={currRef}>{major}</h1>
      <h4 ref={prevRef}>{MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
      <h4 ref={nextRef}>{MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
    </section>
  );
};

export default MajorShowers;
