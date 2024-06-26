/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface IconPropsI {
  color: string;
  width?: number;
}

const IconHolder: FunctionComponent<IconPropsI> = ({
  color,
  width,
    // @ts-expect-error
  children,
}) => {
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
        --iconColor: ${color};
        width: ${iconWidth}px;

        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
    </div>
  );
};

export default IconHolder;
