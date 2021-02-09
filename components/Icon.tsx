/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

// BOLJE DA UNAPRED DEFINISEM DOZVOLJENA IMANA
// KOJA CU KORISTITI I U SANITY-JU, PRI POHRANJIVANJU
type nameType = "copy" | "paste";

interface IconPropsI {
  url: string;
  color: string;
  name: nameType;
}

const Icon: FunctionComponent<IconPropsI> = ({ url, color, name }) => {
  return (
    <div
      css={css`
        --color: ${color};

        /* U CILJU TEST (UKLONICU KASNIJE) */
        border: var(--color) solid 4px;
        & * {
          color: var(--color);
        }
        /* --------------------------------- */
      `}
    >
      <svg
        tabIndex={-1}
        /* NO NEED FOR px ON width AND height */
        style={{ visibility: "hidden" }}
        width="0px"
        height="0px"
        aria-labelledby="svg_style_holder"
        id={`svg-style-holder-${name}`}
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 210"
      >
        <title id="svg_style_holder">Your Title Goes here</title>
        <style>
          {
            /* css */ `
            .fillingz {
              fill: var(--color);
            }
          `
          }
        </style>
      </svg>

      <Image layout="responsive" src="/test.svg" width="auto" height="auto" />
      <span>Tekst</span>
    </div>
  );
};

export default Icon;
