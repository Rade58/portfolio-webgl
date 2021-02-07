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
      css={css`
        --color: ${color};

        border: var(--color) solid 4px;
        & * {
          color: var(--color);
        }

        #${name} {
          fill: var(--color);
        }
      `}
    >
      <svg
        style={{ height: "0px", visibility: "hidden" }}
        /* NO NEED FOR px ON width AND height */
        width="0"
        height="0"
        aria-labelledby="external-icon"
        id={`${name}-svgz`}
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 210"
      >
        <title id="external-icon">External Icon</title>

        <path fill={color} id={`${name}`} d="M199.1,142" />
      </svg>

      <Image layout="responsive" src="/test.svg" width="auto" height="auto" />
      <span>Tekst</span>
    </div>
  );
};

export default Icon;
