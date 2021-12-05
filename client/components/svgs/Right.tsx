/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService, EE } from "../../state_machines/app_machine";
import { storyService } from "../../state_machines/story_machine";

const Right: FunctionComponent<{ visible?: boolean }> = ({ visible }) => {
  const [state, send] = useService(appService);
  const [storyState, __] = useService(storyService);

  const rightSvgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightSvgRef.current) {
      send({
        type: EE.BRING_SVG,
        payload: {
          rightBSvg: rightSvgRef.current.querySelector(
            "svg"
          ) as unknown as SVGElement,
        },
      });
    }
  }, [rightSvgRef]);

  return (
    <div
      style={{
        visibility: visible ? "visible" : "hidden",
        height: visible ? "fit-content" : "0px",
        width: visible ? "auto" : "0px",
        position: visible ? "relative" : "fixed",
      }}
      className="right"
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
            &#right2 {
              & > g {
                &#circle {
                  & path {
                    fill: #0c0c1a;
                  }

                  /* &:active {
                    & path {
                      stroke: #212138;
                    }
                  } */

                  /* &:hover {
                    & path {
                      fill: #131d3d;
                    }
                  } */
                }

                &#arr-right {
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

                  &#arr-right {
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
      ref={rightSvgRef}
    >
      <svg
        className={`${
          !storyState.context.outlineAllowed ? "outline-disallowed" : ""
        }`}
        tabIndex={0}
        onClick={() => {
          // console.log("click forward");
          if (
            (state &&
              state.context &&
              state.context.currentAnimeMachineFinitestate === "idle") ||
            state.context.currentAnimeMachineFinitestate === "init"
          ) {
            send({ type: EE.CLICK_FORTH });
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
              send({ type: EE.CLICK_FORTH });
            }
          }
        }}
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="120"
        aria-labelledby="go_forward"
        id="svg4"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 38 28"
      >
        <title id="go_forward">Next</title>
        <g id="right2">
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
          <g id="arr-right" clipPath="url(#clip01)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.29 9.71C15.9 10.1 15.9 10.73 16.29 11.12L20.17 15L16.29 18.88C15.9 19.27 15.9 19.9 16.29 20.29C16.68 20.68 17.31 20.68 17.7 20.29L22.29 15.7C22.68 15.31 22.68 14.68 22.29 14.29L17.7 9.7C17.32 9.32 16.68 9.32 16.29 9.71Z"
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
          <clipPath id="clip01">
            <rect
              width="7"
              height="12"
              fill="white"
              transform="translate(16 9)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Right;
