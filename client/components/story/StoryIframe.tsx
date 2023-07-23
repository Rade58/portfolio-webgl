/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FunctionComponent, RefObject, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface Props {
  path: string;
  title: string;
}

const StoryIframe: FunctionComponent<Props> = ({
  title,
  path = "https://radedev.com",
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <div
        css={css`
          height: 8vh;
        `}
      ></div>
      {!isLoaded && (
        <div
          css={css`
            color: crimson;
            font-size: 2rem;
            position: absolute;
            top: 20px;
            left: 42%;
          `}
        >
          <div
            css={css`
              & {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
              }
              & div {
                position: absolute;
                top: 33px;
                width: 13px;
                height: 13px;
                border-radius: 50%;
                background: #c0b5c9;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
              }
              & div:nth-of-type(1) {
                left: 8px;
                animation: lds-ellipsis1 0.6s infinite;
              }
              & div:nth-of-type(2) {
                left: 8px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              & div:nth-of-type(3) {
                left: 32px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              & div:nth-of-type(4) {
                left: 56px;
                animation: lds-ellipsis3 0.6s infinite;
              }
              @keyframes lds-ellipsis1 {
                0% {
                  transform: scale(0);
                }
                100% {
                  transform: scale(1);
                }
              }
              @keyframes lds-ellipsis3 {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0);
                }
              }
              @keyframes lds-ellipsis2 {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(24px, 0);
                }
              }
            `}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <iframe
        css={css`
          border: #363132 0px solid;
          border-radius: 24px;
        `}
        // style={{visibility: isLoaded? "visible": "hidden"}}
        src={path}
        width="100%"
        height="86%"
        title={title}
        onLoadStart={() => {
          console.log("loaded");
          setIsLoaded(true);
        }}
        onLoad={() => {
          console.log("loaded");
          setIsLoaded(true);
        }}
      >
        Your browser does not support iframes.
      </iframe>
    </>
  );
};

export default StoryIframe;
