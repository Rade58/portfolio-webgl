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
  color: string;
}

const Icon: FunctionComponent<IconPropsI> = ({ url, color }) => {
  return (
    <div
      css={css`
        --color: ${color};

        border: var(--color) solid 4px;
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
