/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

// OVO MI NE TREBA
// import Image from "next/image";

// KORISTIM react-svg
import { ReactSVG } from "react-svg";
//

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

        & svg {
          & .fillingz {
            fill: var(--color);
          }
        }
      `}
    >
      <ReactSVG src={url} />
    </div>
  );
};

export default Icon;
