/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const InBetweenText: FunctionComponent = ({ children }) => {
  return (
    <div
      css={css`
        border: pink solid 1px;
      `}
      className="in-between-text"
    >
      {children}
    </div>
  );
};

export default InBetweenText;
