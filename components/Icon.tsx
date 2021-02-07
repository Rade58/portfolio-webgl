/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

interface IconPropsI {
  url: string;
}

const Icon: FunctionComponent<IconPropsI> = ({ url }) => {
  return (
    <div
      css={css`
        border: crimson solid 1px;
      `}
    >
      <Image
        layout="responsive"
        src={url}
        width="auto"
        height="auto"
        loading="eager"
      />
    </div>
  );
};

export default Icon;
