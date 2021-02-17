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
      rgba(26, 73, 80, 0.163) 18%,
      rgba(158, 90, 106, 1) 80%
    )
  `;

  const rightLinGrad = /* css */ `
    linear-gradient(
      90deg,
      rgba(158, 90, 106, 1) 18%,
      rgba(26, 73, 80, 0.163) 80%
    )
  `;

  // NE ZABORAVI DA STAVIS I DEBLJINU LINIJE

  return (
    <section
      className="sepa"
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > .emoji {
          font-size: 1.4rem;
        }

        & div.separator {
          /* margin-right: 12%; */
          /* margin-left: 12%; */
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
            margin-left: 12vw;

            &.outwards {
              /*  */
              background-image: ${leftLinGrad};
            }
            &.inwards {
              /*  */
              background-image: ${rightLinGrad};
            }
            &.left {
              /*  */
              background-image: ${leftLinGrad};
            }
            &.right {
              /*  */
              background-image: ${rightLinGrad};
            }
          }

          &.separator-2 {
            margin-right: 12vw;

            &.inwards {
              /*  */
              background-image: ${leftLinGrad};
            }
            &.outwards {
              /*  */
              background-image: ${rightLinGrad};
            }
            &.left {
              background-image: ${leftLinGrad};
            }
            &.right {
              /*  */
              background-image: ${rightLinGrad};
            }
          }
        }
      `}
    >
      <div className={`separator separator-1 ${direction}`} />
      {emoji && !clean && <div className="emoji">{emoji}</div>}
      <div className={`separator separator-2 ${direction}`} />
    </section>
  );
};

export default Separator;
