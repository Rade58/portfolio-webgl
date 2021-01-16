/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { storyService, fse, fseS } from "../state_machines/story_machine";

const PreviewStory: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  return (
    <div
      className="preview"
      css={css`
        & .tekst {
          & .three-dots {
            color: crimson;
            font-size: 1.2rem;
          }
        }
      `}
    >
      {state &&
        state.context &&
        state.context.mediaBellow &&
        state.value &&
        state.value[fse.idle] &&
        state.value[fse.idle] === fseS.partial && (
          <div className="tekst">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry <span className="three-dots">...</span>
          </div>
        )}
    </div>
  );
};

export default PreviewStory;
