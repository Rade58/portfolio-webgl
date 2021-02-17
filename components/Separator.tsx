/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

type directionType = "inwards" | "outwards" | "left" | "right";

interface SeparatorCommonPropsI {
  direction?: directionType;
  thickness?: number;
}

interface SeparatorEmojiPropsI extends SeparatorCommonPropsI {
  emoji: string;
  nonEmoji?: never;
}

interface SeparatorClenPropsI extends SeparatorCommonPropsI {
  nonEmoji: true;
  emoji?: never;
}

type separatorPropsType = SeparatorEmojiPropsI | SeparatorClenPropsI;

const Separator: FunctionComponent<separatorPropsType> = ({
  emoji,
  nonEmoji,
  direction: directionValue,
  thickness: separatorThickness,
}) => {
  const direction: directionType = directionValue ? directionValue : "outwards";

  const thickness: number = separatorThickness ? separatorThickness : 2;

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
          font-size: 1.6rem;
        }

        & div.separator {
          /* margin-right: 12%; */
          /* margin-left: 12%; */
          margin-top: 4vh;
          margin-bottom: 4vh;
          height: ${thickness}px;
          width: 100%;

          /* ---------------------------------------------- */

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
              background-image: ${leftLinGrad};
            }
            &.outwards {
              background-image: ${rightLinGrad};
            }
            &.left {
              background-image: ${leftLinGrad};
            }
            &.right {
              background-image: ${rightLinGrad};
            }
          }
        }
      `}
    >
      <div className={`separator separator-1 ${direction}`} />
      {emoji && !nonEmoji && <div className="emoji">{emoji}</div>}
      <div className={`separator separator-2 ${direction}`} />
    </section>
  );
};

export default Separator;
