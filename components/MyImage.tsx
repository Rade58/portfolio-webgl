/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

const MyImage: FunctionComponent = () => {
  return (
    <div
      className="my-image"
      css={css`
        border: olive solid 3px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-content: center;
        /* height: fit-content; */
        /* height: 382px; */
        height: 342px;
        width: 100%;

        & div.holder {
          border: tomato solid 4px;
          width: 50%;
        }

        @media (max-width: 1034px) {
          & {
            height: 200px;
          }
        }

        @media (max-width: 918px) {
          & {
            height: 200px;
          }
        }

        @media (max-width: 738px) {
          & {
            height: 200vh;
          }

          & div.holder {
            width: 42%;
          }
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
  );
};

export default MyImage;
