/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { useService } from "@xstate/react";
import { storyService } from "../state_machines/story_machine";

const MyImage: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const { mediaBellow } = state.context;

  return (
    <div
      className="image-cont"
      css={css`
        border: blanchedalmond 0px solid;
        display: flex;
        flex-direction: row;
        justify-content: center;
      `}
    >
      <div
        style={{ width: !mediaBellow ? "74%" : "62%" }}
        className={`my-image`}
        css={css`
          border: olive solid 0px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-content: center;
          height: fit-content;
          width: 50%;

          & div.holder {
            width: 100%;
            height: 100%;
          }
        `}
      >
        <div className="holder">
          <Image
            src="/my_image.jpg"
            alt="picture of the author"
            layout="responsive"
            height="auto"
            width="auto"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MyImage;
