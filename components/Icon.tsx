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
  width?: number;
}

const Icon: FunctionComponent<IconPropsI> = ({ url, color, name, width }) => {
  return (
    <div
      className="common-icon"
      css={css`
        --color: ${color};

        /* U CILJU TEST (UKLONICU KASNIJE) */
        border: var(--color) solid 1px;
        /* & * {
          color: var(--color);
        } */
        /* --------------------------------- */

        width: ${width}px;

        & svg {
          & .fillingz {
            fill: var(--color);
          }
        }
      `}
    >
      <ReactSVG
        src={url}
        loading={() => {
          console.log({ url });

          return <p>loading...</p>;
        }}
      />
    </div>
  );
};

export default Icon;
