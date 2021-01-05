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
        viewBox="0 0 80 38"
      >
        <title id="go_forward">Next</title>
        <g id="Frame 2">
          <g id="20942180181556280998 7" clipPath="url(#clip0)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.70428 10.1833C4.75714 10.8333 4.75714 11.8833 5.70428 12.5333L15.1271 19L5.70428 25.4667C4.75714 26.1167 4.75714 27.1667 5.70428 27.8167C6.65143 28.4667 8.18143 28.4667 9.12857 27.8167L20.2757 20.1667C21.2229 19.5167 21.2229 18.4667 20.2757 17.8167L9.12857 10.1667C8.20571 9.53334 6.65143 9.53334 5.70428 10.1833Z"
                        fill="#7B6262"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="20942180181556280998 13" clipPath="url(#clip1)">
            <g id="Icons_2">
              <g id="Rounded_2">
                <g id="Navigation_2">
                  <g id="Round / Navigation / chevron right_2">
                    <g id="Group_2">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M44.7043 10.1833C43.7571 10.8333 43.7571 11.8833 44.7043 12.5333L54.1271 19L44.7043 25.4667C43.7571 26.1167 43.7571 27.1667 44.7043 27.8167C45.6514 28.4667 47.1814 28.4667 48.1286 27.8167L59.2757 20.1667C60.2229 19.5167 60.2229 18.4667 59.2757 17.8167L48.1286 10.1667C47.2057 9.53334 45.6514 9.53334 44.7043 10.1833Z"
                        fill="#B05B5B"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="20942180181556280998 8" clipPath="url(#clip2)">
            <g id="Icons_3">
              <g id="Rounded_3">
                <g id="Navigation_3">
                  <g id="Round / Navigation / chevron right_3">
                    <g id="Group_3">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.4143 13.7692C21.8571 14.1917 21.8571 14.8742 22.4143 15.2967L27.9571 19.5L22.4143 23.7033C21.8571 24.1258 21.8571 24.8083 22.4143 25.2308C22.9714 25.6533 23.8714 25.6533 24.4286 25.2308L30.9857 20.2583C31.5429 19.8358 31.5429 19.1533 30.9857 18.7308L24.4286 13.7583C23.8857 13.3467 22.9714 13.3467 22.4143 13.7692Z"
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="20942180181556280998 9" clipPath="url(#clip3)">
            <g id="Icons_4">
              <g id="Rounded_4">
                <g id="Navigation_4">
                  <g id="Round / Navigation / chevron right_4">
                    <g id="Group_4">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32.29 15.5325C31.9 15.825 31.9 16.2975 32.29 16.59L36.17 19.5L32.29 22.41C31.9 22.7025 31.9 23.175 32.29 23.4675C32.68 23.76 33.31 23.76 33.7 23.4675L38.29 20.025C38.68 19.7325 38.68 19.26 38.29 18.9675L33.7 15.525C33.32 15.24 32.68 15.24 32.29 15.5325Z"
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="20942180181556280998 10" clipPath="url(#clip4)">
            <g id="Icons_5">
              <g id="Rounded_5">
                <g id="Navigation_5">
                  <g id="Round / Navigation / chevron right_5">
                    <g id="Group_5">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M39.2071 16.355C38.9286 16.55 38.9286 16.865 39.2071 17.06L41.9786 19L39.2071 20.94C38.9286 21.135 38.9286 21.45 39.2071 21.645C39.4857 21.84 39.9357 21.84 40.2143 21.645L43.4929 19.35C43.7714 19.155 43.7714 18.84 43.4929 18.645L40.2143 16.35C39.9429 16.16 39.4857 16.16 39.2071 16.355Z"
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="20942180181556280998 11" clipPath="url(#clip5)">
            <g id="Icons_6">
              <g id="Rounded_6">
                <g id="Navigation_6">
                  <g id="Round / Navigation / chevron right_6">
                    <g id="Group_6">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_6"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M44.1657 17.2367C43.9429 17.3667 43.9429 17.5767 44.1657 17.7067L46.3829 19L44.1657 20.2933C43.9429 20.4233 43.9429 20.6333 44.1657 20.7633C44.3886 20.8933 44.7486 20.8933 44.9714 20.7633L47.5943 19.2333C47.8171 19.1033 47.8171 18.8933 47.5943 18.7633L44.9714 17.2333C44.7543 17.1067 44.3886 17.1067 44.1657 17.2367Z"
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
          <clipPath id="clip0">
            <rect
              width="17"
              height="20"
              fill="white"
              transform="translate(5 9)"
            />
          </clipPath>
          <clipPath id="clip1">
            <rect
              width="17"
              height="20"
              fill="white"
              transform="translate(44 9)"
            />
          </clipPath>
          <clipPath id="clip2">
            <rect
              width="10"
              height="13"
              fill="white"
              transform="translate(22 13)"
            />
          </clipPath>
          <clipPath id="clip3">
            <rect
              width="7"
              height="9"
              fill="white"
              transform="translate(32 15)"
            />
          </clipPath>
          <clipPath id="clip4">
            <rect
              width="5"
              height="6"
              fill="white"
              transform="translate(39 16)"
            />
          </clipPath>
          <clipPath id="clip5">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(44 17)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Right;
