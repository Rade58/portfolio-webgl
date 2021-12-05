/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { appService, EE, fse } from "../../state_machines/app_machine";

import { storyService } from "../../state_machines/story_machine";

import { isSSR } from "../../utils/isSSR";

const Left: FunctionComponent<{ visible?: boolean }> = ({ visible }) => {
  const [state, send] = useService(appService);
  const [storyState, __] = useService(storyService);

  const leftSvgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftSvgRef.current) {
      send({
        type: EE.BRING_SVG,
        payload: {
          leftBSvg: leftSvgRef.current.querySelector(
            "svg"
          ) as unknown as SVGElement,
        },
      });
    }
  }, [leftSvgRef]);

  return (
    <div
      style={{
        visibility: visible ? "visible" : "hidden",
        height: visible ? "fit-content" : "0px",
        // width: visible ? "auto" : "0px",
        position: visible ? "relative" : "fixed",
      }}
      className="left"
      css={css`
        border: pink solid 0px;
        flex-basis: 90px;
        height: fit-content;
        flex-shrink: 2;

        &:hover {
          outline: none;
        }

        & svg {
          &:hover {
            outline: none;
          }

          /* --------------------------------- */
          /* --------------------------------- */
          &.outline-disallowed {
            &:focus {
              outline: none;
            }
          }
          /* --------------------------------- */
          /* --------------------------------- */

          & > g {
            &:hover {
              cursor: pointer;
            }
          }

          & g {
            &#left {
              & > g {
                &#circle {
                  & path {
                    fill: #0c0c1a;
                  }

                  /* &:hover {
                    & path {
                      fill: #131d3d;
                    }
                  } */
                }

                &#arr-left {
                  & path {
                    fill: #d74b5c;
                  }
                }
              }

              &:hover {
                & > g {
                  &#circle {
                    & path {
                      fill: #1f1f35;
                    }
                  }

                  &#arr-left {
                    & path {
                      fill: #2c5b70;
                    }
                  }
                }
              }

              &:active {
                & path {
                  stroke: #212138;
                }
              }
            }
          }
        }
      `}
      ref={leftSvgRef}
    >
      <svg
        className={`${
          !storyState.context.outlineAllowed ? "outline-disallowed" : ""
        }`}
        tabIndex={0}
        onClick={(e) => {
          // console.log("click back");
          if (
            (state &&
              state.context &&
              state.context.currentAnimeMachineFinitestate === "idle") ||
            state.context.currentAnimeMachineFinitestate === "init"
          ) {
            send({ type: EE.CLICK_BACK });
          }
        }}
        /* onMouseLeave={(e) => {
          (e.target as HTMLElement).blur();
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).blur();
        }}
        onMouseMove={(e) => {
          (e.target as HTMLElement).blur();
        }}
        onMouseOver={(e) => {
          (e.target as HTMLElement).blur();
        }} */
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (
              (state &&
                state.context &&
                state.context.currentAnimeMachineFinitestate === "idle") ||
              state.context.currentAnimeMachineFinitestate === "init"
            ) {
              send({ type: EE.CLICK_BACK });
            }
          }
        }}
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="120"
        aria-labelledby="go_back"
        id="svg3"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="1 0 38 28"
      >
        <title id="go_back">Previous</title>
        {/* <rect width="40" height="30" fill="#E5E5E5" /> */}
        <g id="left">
          <g id="circle">
            <path
              id="Vector"
              d="M20 5C14.4772 5 10 9.47715 10 15C10 20.5228 14.4772 25 20 25C25.5228 25 30 20.5228 30 15C30 9.47715 25.5228 5 20 5Z"
              // stroke="black"
              // fill="crimson"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g id="arr-left" clipPath="url(#clip00)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.71 20.29C23.1 19.9 23.1 19.27 22.71 18.88L18.83 15L22.71 11.12C23.1 10.73 23.1 10.1 22.71 9.71C22.32 9.32 21.69 9.32 21.3 9.71L16.71 14.3C16.32 14.69 16.32 15.32 16.71 15.71L21.3 20.3C21.68 20.68 22.32 20.68 22.71 20.29Z"
                        // fill="#D74B5C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip00">
            <rect
              width="7"
              height="12"
              fill="white"
              transform="translate(23 21) rotate(-180)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Left;
