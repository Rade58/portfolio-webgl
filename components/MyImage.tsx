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
        border: olive solid 1px;
        /* width: 100%; */
        display: flex;
        justify-content: center;
        height: 200px;
      `}
    >
      <Image
        src="/my_image.jpg"
        alt="my image"
        layout="responsive"
        height="100%"
        width="auto"
      />
    </div>
  );
};

export default MyImage;
