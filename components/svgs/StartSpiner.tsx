/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const StartSpiner: FunctionComponent = () => {
  return (
    <div
      css={css`
        z-index: 28;
        position: fixed;
        top: 50vh;
        left: 46vw;
      `}
    >
      <div
        className="water"
        css={css`
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
            background-color: #da4174;
          }
          &:before {
            border-radius: 68%;
            background: rgba(255, 255, 255, 0.7);
            animation: wave 5s linear infinite;
          }
          &:after {
            border-radius: 34%;
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
      loading...
    </div>
  );
};

export default StartSpiner;
