/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, Fragment, createRef, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { TweenMax, Power4 } from "gsap";

import { useService } from "@xstate/react";
import {
  storyService,
  fse,
  fseS,
  EEs,
} from "../../state_machines/story_machine";

import { upDownArrowHeight } from "../../css_vars";

const UpDownButton: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const butContRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (butContRef.current) {
      const arrow = butContRef.current.querySelector("g#arr-up-down");
      console.log({ arrow });
    }
  }, [butContRef]);

  let up: boolean = false;

  up = true;

  return (
    <Fragment>
      {state && state.context && state.context.mediaBellow && (
        <div
          ref={butContRef}
          className="butt-cont"
          css={css`
            border: pink solid 0px;
            position: fixed;
            z-index: 200;
            right: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            height: ${upDownArrowHeight};
            justify-content: center;
          `}
        >
          <svg
            /* NO NEED FOR px ON width AND height */
            width="100%"
            height=""
            aria-labelledby="up_down"
            id="svg_up_down"
            role="button" /* or role="imge"*/
            lang="en"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="1 0 38 28"
            onClick={() => {
              const { mediaBellow } = state.context;

              if (mediaBellow) {
                if (state && state.value && state.value[fse.idle]) {
                  const substate = state.value[fse.idle];

                  if (substate === fseS.partial) {
                    console.log({ substate });
                    console.log("full open sent");

                    send({
                      type: EEs.FULL_OPEN,
                    });
                  }

                  if (substate === fseS.maximal) {
                    console.log({ substate });
                    console.log("narrow it sent");

                    send({
                      type: EEs.NARROW_IT,
                    });
                  }
                }
              }
            }}
          >
            <title id="up_down">Up{"/"}Down</title>
            <g id="up-down">
              <g id="up-down-circle">
                <path
                  id="Vector"
                  d="M20 5C14.4772 5 10 9.47715 10 15C10 20.5228 14.4772 25 20 25C25.5228 25 30 20.5228 30 15C30 9.47715 25.5228 5 20 5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <g id="arr-up-down" clipPath="url(#clip000)">
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
                            fill="#D74B5C"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip000">
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
      )}
    </Fragment>
  );
};

export default UpDownButton;
