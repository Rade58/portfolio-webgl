/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
    // @ts-expect-error
const EmoText: FunctionComponent = ({ children }) => {
  return (
    <span
      css={css`
        background-color: crimson;
      `}
    >
      {children}
    </span>
  );
};

export default EmoText;
