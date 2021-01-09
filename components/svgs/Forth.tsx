/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect, DOMElement } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService, EE } from "../../state_machines/app_machine";

const Forth: FunctionComponent<{ visible: boolean }> = ({ visible }) => {
  const [state, send] = useService(appService);

  const forwrdSvgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(forwrdSvgRef.current);
    if (forwrdSvgRef.current) {
      send({
        type: EE.BRING_SVG,
        payload: {
          forwardsSvg: (forwrdSvgRef.current.querySelector(
            "svg"
          ) as unknown) as SVGElement,
        },
      });
    }
  }, [forwrdSvgRef]);

  return (
    <div
      style={{ visibility: visible ? "visible" : "hidden" }}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        /* console.log(e.clientX, e.clientY);
        console.log(
          (e.target as HTMLElement).offsetLeft,
          (e.target as HTMLElement).offsetLeft
        ); */
        console.log("click forward");
        if (
          (state &&
            state.context &&
            state.context.currentAnimeMachineFinitestate === "idle") ||
          state.context.currentAnimeMachineFinitestate === "init"
        ) {
          send({ type: EE.CLICK_FORTH });
        }
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).blur();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (
            (state &&
              state.context &&
              state.context.currentAnimeMachineFinitestate === "idle") ||
            state.context.currentAnimeMachineFinitestate === "init"
          ) {
            send({ type: EE.CLICK_FORTH });
          }
        }
      }}
      className="forth"
      css={css`
        border: pink solid 1px;
        flex-basis: 46vw;
        /* flex-grow: 1; */
        height: 60px;
        /* flex-shrink: 2; */
        position: relative;
        &::after {
          cursor: pointer;
          position: absolute;
          height: 100%;
          width: 88px;
          /* top: 0; */
          left: 0;
          content: "";
          /* border: pink solid 4px; */
        }

        &:hover {
          outline: none;
        }

        & svg {
          position: absolute;
          left: 0;
          width: 598px;
          height: 60px;
        }
      `}
      ref={forwrdSvgRef}
    >
      <svg
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="120"
        aria-labelledby="go_forward"
        id="svg2"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 520 28"
      >
        <title id="go_forward">Next</title>
        {/* <rect width="250" height="35" fill="#E5E5E5" /> */}
        <g id="fish_right____">
          {/* <rect
            width="250"
            height="35"
            transform="translate(250 35) rotate(-180)"
            fill="white"
          /> */}
          <g id="bone66" clipPath="url(#cli0)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.74571 8.2425C4.74285 8.925 4.74285 10.0275 5.74571 10.71L15.7229 17.5L5.74571 24.29C4.74285 24.9725 4.74285 26.075 5.74571 26.7575C6.74857 27.44 8.36857 27.44 9.37143 26.7575L21.1743 18.725C22.1771 18.0425 22.1771 16.94 21.1743 16.2575L9.37143 8.225C8.39428 7.56 6.74857 7.56 5.74571 8.2425Z"
                        fill="#751431"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone55" clipPath="url(#cli1)">
            <g id="Icons_2">
              <g id="Rounded_2">
                <g id="Navigation_2">
                  <g id="Round / Navigation / chevron right_2">
                    <g id="Group_2">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.4143 12.7692C22.8571 13.1917 22.8571 13.8742 23.4143 14.2967L28.9571 18.5L23.4143 22.7033C22.8571 23.1258 22.8571 23.8083 23.4143 24.2308C23.9714 24.6533 24.8714 24.6533 25.4286 24.2308L31.9857 19.2583C32.5429 18.8358 32.5429 18.1533 31.9857 17.7308L25.4286 12.7583C24.8857 12.3467 23.9714 12.3467 23.4143 12.7692Z"
                        fill="#0e1b35"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone33">
            <g id="Icons_3">
              <g id="Rounded_3">
                <g id="Navigation_3">
                  <g id="Round / Navigation / chevron right_3">
                    <g id="Group_3">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M40.2089 15.1469C39.9304 15.3419 39.9304 15.6569 40.2089 15.8519L42.9804 17.7919L40.2089 19.7319C39.9304 19.9269 39.9304 20.2419 40.2089 20.4369C40.4875 20.6319 40.9375 20.6319 41.2161 20.4369L44.4946 18.1419C44.7732 17.9469 44.7732 17.6319 44.4946 17.4369L41.2161 15.1419C40.9446 14.9519 40.4875 14.9519 40.2089 15.1469Z"
                        fill="#0e1b35"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone22" clipPath="url(#cli2)">
            <g id="Icons_4">
              <g id="Rounded_4">
                <g id="Navigation_4">
                  <g id="Round / Navigation / chevron right_4">
                    <g id="Group_4">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.1657 16.2367C45.9429 16.3667 45.9429 16.5767 46.1657 16.7067L48.3829 18L46.1657 19.2933C45.9429 19.4233 45.9429 19.6333 46.1657 19.7633C46.3886 19.8933 46.7486 19.8933 46.9714 19.7633L49.5943 18.2333C49.8171 18.1033 49.8171 17.8933 49.5943 17.7633L46.9714 16.2333C46.7543 16.1067 46.3886 16.1067 46.1657 16.2367Z"
                        fill="#751431"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone11" clipPath="url(#cli3)">
            <g id="Icons_5">
              <g id="Rounded_5">
                <g id="Navigation_5">
                  <g id="Round / Navigation / chevron right_5">
                    <g id="Group_5">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.9114 9.18334C49.6857 9.83334 49.6857 10.8833 50.9114 11.5333L63.1057 18L50.9114 24.4667C49.6857 25.1167 49.6857 26.1667 50.9114 26.8167C52.1371 27.4667 54.1171 27.4667 55.3429 26.8167L69.7686 19.1667C70.9943 18.5167 70.9943 17.4667 69.7686 16.8167L55.3429 9.16667C54.1486 8.53334 52.1371 8.53334 50.9114 9.18334Z"
                        fill="#0e1b35"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="Frame" clipPath="url(#cli4)">
            <g id="Group_6">
              <path
                id="Vector"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.29 14.5325C32.9 14.825 32.9 15.2975 33.29 15.59L37.17 18.5L33.29 21.41C32.9 21.7025 32.9 22.175 33.29 22.4675C33.68 22.76 34.31 22.76 34.7 22.4675L39.29 19.025C39.68 18.7325 39.68 18.26 39.29 17.9675L34.7 14.525C34.32 14.24 33.68 14.24 33.29 14.5325Z"
                fill="#751431"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="cli0">
            <rect
              width="18"
              height="21"
              fill="white"
              transform="translate(5 7)"
            />
          </clipPath>
          <clipPath id="cli1">
            <rect
              width="10"
              height="13"
              fill="white"
              transform="translate(23 12)"
            />
          </clipPath>
          <clipPath id="cli2">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(46 16)"
            />
          </clipPath>
          <clipPath id="cli3">
            <rect
              width="22"
              height="20"
              fill="white"
              transform="translate(50 8)"
            />
          </clipPath>
          <clipPath id="cli4">
            <rect
              width="7"
              height="9"
              fill="white"
              transform="translate(40 23) rotate(-180)"
            />
          </clipPath>
        </defs>{" "}
      </svg>
    </div>
  );
};

export default Forth;
