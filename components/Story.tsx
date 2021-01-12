/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { useService } from "@xstate/react";
import { storyService, EE } from "../state_machines/story_machine";

import { isSSR } from "../utils/isSSR";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const Story: FunctionComponent = () => {
  // VODI RACUNA DA major MOZE BITI I STRING "undefined"

  const [state, send] = useService(storyService);

  const { major } = state.context;

  const [width, setWidth] = useState<"36vw" | "100%">("100%");
  const [height, setHeight] = useState<"24vh" | "100vh">("24vh");

  //
  useEffect(() => {
    if (!isSSR()) {
      const mqList = window.matchMedia("(max-width: 758px)");

      console.log({ matches: mqList.matches });

      if (mqList.matches) {
        setWidth("100%");
        setHeight("24vh");
      } else {
        setWidth("36vw");
        setHeight("100vh");
      }

      mqList.onchange = (e) => {
        console.log(e.media);
        console.log(e.matches);

        if (e.matches) {
          send({ type: EE.GIVE_MEDIA, payload: { isBellow: true } });
          setWidth("100%");
          setHeight("24vh");
        } else {
          send({ type: EE.GIVE_MEDIA, payload: { isBellow: false } });
          setWidth("36vw");
          setHeight("100vh");
        }
      };
    }
  }, []);

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
      style={{ width, height }}
      css={css`
        border: crimson solid 1px;
        position: fixed;
        top: 0;
        left: 0;
        /* height: 22vh; */
        /* height: 100vh; */
        /* width: 220px; */
        overflow: hidden;
      `}
    >
      <h4>prev: {MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
      <h1>major: {major}</h1>
      <h4>next: {MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
    </section>
  );
};

export default Story;
