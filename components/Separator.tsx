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
  clean: never;
}

interface SeparatorClenPropsI extends SeparatorCommonPropsI {
  clean: true;
  emoji: never;
}

type separatorPropsType = SeparatorEmojiPropsI | SeparatorClenPropsI;

const Separator: FunctionComponent<separatorPropsType> = ({ emoji }) => {
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

          &.separator-1 {
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
          }

          /* ---------------------------------------------- */

          &.separator-1 {
            &.outwards {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(83, 139, 148, 0.16290266106442575) 80%,
                rgba(158, 90, 106, 1) 18%
              );
            }
          }
          &.separator-2 {
            &.outwards {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(158, 90, 106, 1) 80%,
                rgba(83, 139, 148, 0.16290266106442575) 18%
              );
            }
          }
          &.separator-1 {
            &.inwards {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(158, 90, 106, 1) 18%,
                rgba(83, 139, 148, 0.16290266106442575) 80%
              );
            }
          }
          &.separator-2 {
            &.inwards {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(83, 139, 148, 0.16290266106442575) 18%,
                rgba(158, 90, 106, 1) 80%
              );
            }
          }
          &.separator-1 {
            &.left {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(83, 139, 148, 0.16290266106442575) 18%,
                rgba(158, 90, 106, 1) 80%
              );
            }
          }
          &.separator-2 {
            &.left {
              background-image: linear-gradient(
                90deg,
                rgba(83, 139, 148, 0.16290266106442575) 18%,
                rgba(158, 90, 106, 1) 80%
              );
            }
          }
          &.separator-1 {
            &.right {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(158, 90, 106, 1) 80%,
                rgba(83, 139, 148, 0.16290266106442575) 18%
              );
            }
          }
          &.separator-2 {
            &.right {
              /*  */
              background-image: linear-gradient(
                90deg,
                rgba(158, 90, 106, 1) 80%,
                rgba(83, 139, 148, 0.16290266106442575) 18%
              );
            }
          }
        }
      `}
    >
      <div className="separator separator-1" />
      {emoji && <div>{emoji}</div>}
      <div className="separator separator-2" />
    </section>
  );
};

export default Separator;
