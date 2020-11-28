/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { FunctionComponent } from "react";

const Other: FunctionComponent = () => {
  return (
    <div
      css={css`
        border: crimson solid 1px;
        width: 100vw;
        color: #3a3d42;
      `}
    >
      Text
    </div>
  );
};

export default Other;
