/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService, EE } from "../../state_machines/app_machine";

const Right: FunctionComponent = () => {
  const [state, send] = useService(appService);

  return (
    <div
      className="right"
      css={css`
        border: pink solid 1px;
        flex-basis: 120px;
        height: fit-content;
        flex-shrink: 2;

        & svg:hover {
          outline: none;
        }
      `}
    >
      <svg
        tabIndex={0}
        onClick={() => {
          console.log("click forward");
          send({ type: EE.CLICK_FORTH });
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).blur();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send({ type: EE.CLICK_FORTH });
          }
        }}
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="120"
        aria-labelledby="go_forward"
        id="svg"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="1 0 38 28"
      >
        <title id="go_forward">Next</title>
        <g id="right">
          <g id="circle" filter="url(#filter0_d)">
            <path
              id="Vector"
              d="M22 25C27.5228 25 32 20.5228 32 15C32 9.47715 27.5228 5 22 5C16.4772 5 12 9.47715 12 15C12 20.5228 16.4772 25 22 25Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="arr-right" clipPath="url(#clip0)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.29 9.71C18.9 10.1 18.9 10.73 19.29 11.12L23.17 15L19.29 18.88C18.9 19.27 18.9 19.9 19.29 20.29C19.68 20.68 20.31 20.68 20.7 20.29L25.29 15.7C25.68 15.31 25.68 14.68 25.29 14.29L20.7 9.7C20.32 9.32 19.68 9.32 19.29 9.71Z"
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="10"
            y="3"
            width="26"
            height="26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <clipPath id="clip0">
            <rect
              width="7"
              height="12"
              fill="white"
              transform="translate(19 9)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Right;
