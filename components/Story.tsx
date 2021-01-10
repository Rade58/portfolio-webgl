/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { fse as fsA } from "../sketch/machine/anim_state_machine";

import { useService } from "@xstate/react";
import { storyService } from "../state_machines/story_machine";

const Story: FunctionComponent = () => {
  // VODI RACUNA DA major MOZE BITI I STRING "undefined"

  const [state, send] = useService(storyService);

  const { major } = state.context;

  return (
    <section
      className="story"
      css={css`
        border: crimson solid 1px;
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <h1>
        {major === "undefined" ? "true" : "false"} major: {major}
      </h1>
    </section>
  );
};

export default Story;
