/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

type directionType = "inwards" | "outwards" | "left" | "right";

interface SeparatorCommonPropsI {
  direction: directionType;
}

interface SeparatorEmojiPropsI extends SeparatorCommonPropsI {
  emoji: string;
  clean?: never;
}

interface SeparatorClenPropsI extends SeparatorCommonPropsI {
  clean: true;
  emoji?: never;
}

type separatorPropsType = SeparatorEmojiPropsI | SeparatorClenPropsI;

const Separator: FunctionComponent<separatorPropsType> = ({
  emoji,
  clean,
  direction,
}) => {
  const leftLinGrad = /* css */ `
    linear-gradient(
      90deg,
      rgba(83, 139, 148, 0.16290266106442575) 18%,
      rgba(158, 90, 106, 1) 80%
    )
  `;

  const rightLinGrad = /* css */ `
    linear-gradient(
      90deg,
      rgba(158, 90, 106, 1) 80%,
      rgba(83, 139, 148, 0.16290266106442575) 18%
    )
  `;

  return (
    <section
      className="sepa"
      css={css`
        display: flex;

        & div.separator {
          margin-right: 12%;
          margin-left: 12%;
          margin-top: 4vh;
          margin-bottom: 4vh;
          height: 2px;
          width: 100%;

          /* ---------------------------------------------- */

          /* &.separator-1 {
            background-image: linear-gradient(
              90deg,
              rgba(158, 90, 106, 1) 18%,
              rgba(83, 139, 148, 0.16290266106442575) 80%
            );
          }
          &.separator-2 {
            background-image: linear-gradient(
              90deg,
              rgba(83, 139, 148, 0.16290266106442575) 18%,
              rgba(158, 90, 106, 1) 80%
            );
          } */

          /* ---------------------------------------------- */

          &.separator-1 {
            &.outwards {
              /*  */
              background-image: ${leftLinGrad};
            }
          }
          &.separator-2 {
            &.outwards {
              /*  */
              background-image: ${rightLinGrad};
            }
          }
          &.separator-1 {
            &.inwards {
              /*  */
              background-image: ${rightLinGrad};
            }
          }
          &.separator-2 {
            &.inwards {
              /*  */
              background-image: ${leftLinGrad};
            }
          }
          &.separator-1 {
            &.left {
              /*  */
              background-image: ${leftLinGrad};
            }
          }
          &.separator-2 {
            &.left {
              background-image: ${leftLinGrad};
            }
          }
          &.separator-1 {
            &.right {
              /*  */
              background-image: ${rightLinGrad};
            }
          }
          &.separator-2 {
            &.right {
              /*  */
              background-image: ${rightLinGrad};
            }
          }
        }
      `}
    >
      <div className={`separator-1 ${direction}`} />
      {emoji && !clean && <div>{emoji}</div>}
      <div className={`separator-2 ${direction}`} />
    </section>
  );
};

export default Separator;
