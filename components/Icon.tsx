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
  name: string;
}

const Icon: FunctionComponent<IconPropsI> = ({ url, color, name }) => {
  return (
    <div
      id={name}
      css={css`
        --color: ${color};

        border: var(--color) solid 4px;
        & * {
          color: var(--color);
        }

        #icon-style {
          fill: var(--color);
        }
      `}
    >
      <svg
        style={{ height: "0px" }}
        /* NO NEED FOR px ON width AND height */
        width=""
        height=""
        aria-labelledby="your title id goes here"
        id="svg"
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 210"
      >
        <title id="reference this id by aria-labelledby">
          Your Title Goes here
        </title>
      </svg>

      <Image layout="responsive" src="/test.svg" width="auto" height="auto" />
      <span>Tekst</span>
    </div>
  );
};

export default Icon;
