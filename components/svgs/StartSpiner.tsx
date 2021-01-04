/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const AccesibleSvg: FunctionComponent = () => {
  return (
    <div
      className="water"
      css={css`
        z-index: 28;
        position: fixed;
        top: 50vh;
        left: 46vw;
        width: 20vh;
        height: 20vh;
        background-color: skyblue;
        border-radius: 50%;
        position: relative;
        box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.5),
          0 4px 10px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;

        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 20vh;
          height: 20vh;
          top: -4vh;
          background-color: #fff;
        }
        &:before {
          border-radius: 45%;
          background: rgba(255, 255, 255, 0.7);
          animation: wave 5s linear infinite;
        }
        &:after {
          border-radius: 35%;
          background: rgba(255, 255, 255, 0.3);
          animation: wave 5s linear infinite;
        }
        @keyframes wave {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    ></div>
  );

  return (
    <svg
      /* NO NEED FOR px ON width AND height */
      width=""
      height=""
      aria-labelledby="start_spiner"
      id="svg"
      role="presentation" /* or role="imge"*/
      lang="en"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 380 210"
    >
      <title id="start_spiner">starting spiner</title>
    </svg>
  );
};

export default AccesibleSvg;
