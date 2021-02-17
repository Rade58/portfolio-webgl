/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface SeparatorPropsI {
  emoji: string;
}

const Separator: FunctionComponent<SeparatorPropsI> = ({ emoji }) => {
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
        }
      `}
    >
      <div className="separator separator-1" />
      <div>{emoji}</div>
      <div className="separator separator-2" />
    </section>
  );
};

export default Separator;
