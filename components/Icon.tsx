/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import XStateSvg from "../svgs_for_inlining/common_icons/XState.svg";
//

type nameType = "copy" | "paste";

interface IconPropsI {
  url: string;
  color: string;
  name: nameType;
  width?: number;
}

const Icon: FunctionComponent<IconPropsI> = ({ url, color, name, width }) => {
  let iconWidth: number;

  if (width) {
    iconWidth = width;
  } else {
    iconWidth = 38;
  }

  return (
    <div
      className="common-icon"
      css={css`
        --color: ${color};

        --fillingz: ${color};

        /* U CILJU TEST (UKLONICU KASNIJE) */
        /* border: var(--color) solid 1px; */
        /* & * {
          color: var(--color);
        } */
        /* --------------------------------- */

        width: ${iconWidth}px;

        & svg {
          & .fillingz {
            fill: var(--color);
          }
        }
      `}
    >
      {/* NE POSTOJI VISE OVAJ PAKET */}
      {/* <ReactSVG
        src={url}
        loading={() => {
          console.log({ url });

          return <p>loading...</p>;
        }}
      /> */}
      {/* <Image
        layout="responsive"
        src="/x-state.svg"
        width="auto"
        height="auto"
      /> */}
      <XStateSvg />
    </div>
  );
};

export default Icon;
