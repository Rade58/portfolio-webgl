/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

const ComponentName: FunctionComponent = () => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        border: crimson 1px solid;
        margin: 0px 0px;
      `}
    >
      <svg
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="auto"
        textLength="auto"
        aria-labelledby="some_text"
        id="svg"
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 60"
      >
        <title id="some_text">Hi it{"'"}s a me</title>
        <text fill="#a14a7d" stroke="#32727a" wordSpacing="4.8">
          <tspan fontSize="16" x="24" y="33">
            Hi, My name is Rade and I build things
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default ComponentName;
