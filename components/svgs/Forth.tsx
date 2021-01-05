/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService, EE } from "../../state_machines/app_machine";

const Forth: FunctionComponent = () => {
  const [state, send] = useService(appService);

  return (
    <div
      className="forth"
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
        <g id="fish_right">
          <rect width="74" height="37" fill="white" />
          <g id="bone6" clipPath="url(#clip0)">
            <g id="Icons">
              <g id="Rounded">
                <g id="Navigation">
                  <g id="Round / Navigation / chevron right">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.70428 9.18334C5.75714 9.83334 5.75714 10.8833 6.70428 11.5333L16.1271 18L6.70428 24.4667C5.75714 25.1167 5.75714 26.1667 6.70428 26.8167C7.65143 27.4667 9.18143 27.4667 10.1286 26.8167L21.2757 19.1667C22.2229 18.5167 22.2229 17.4667 21.2757 16.8167L10.1286 9.16667C9.20571 8.53334 7.65143 8.53334 6.70428 9.18334Z"
                        fill="#D74B5C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone5" clipPath="url(#clip1)">
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
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone4" clipPath="url(#clip2)">
            <g id="Icons_3">
              <g id="Rounded_3">
                <g id="Navigation_3">
                  <g id="Round / Navigation / chevron right_3">
                    <g id="Group_3">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33.29 14.5325C32.9 14.825 32.9 15.2975 33.29 15.59L37.17 18.5L33.29 21.41C32.9 21.7025 32.9 22.175 33.29 22.4675C33.68 22.76 34.31 22.76 34.7 22.4675L39.29 19.025C39.68 18.7325 39.68 18.26 39.29 17.9675L34.7 14.525C34.32 14.24 33.68 14.24 33.29 14.5325Z"
                        fill="#D74B5C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone3" clipPath="url(#clip3)">
            <g id="Icons_4">
              <g id="Rounded_4">
                <g id="Navigation_4">
                  <g id="Round / Navigation / chevron right_4">
                    <g id="Group_4">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M40.2071 15.355C39.9286 15.55 39.9286 15.865 40.2071 16.06L42.9786 18L40.2071 19.94C39.9286 20.135 39.9286 20.45 40.2071 20.645C40.4857 20.84 40.9357 20.84 41.2143 20.645L44.4929 18.35C44.7714 18.155 44.7714 17.84 44.4929 17.645L41.2143 15.35C40.9429 15.16 40.4857 15.16 40.2071 15.355Z"
                        fill="#1D1D1D"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone2" clipPath="url(#clip4)">
            <g id="Icons_5">
              <g id="Rounded_5">
                <g id="Navigation_5">
                  <g id="Round / Navigation / chevron right_5">
                    <g id="Group_5">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M45.1657 16.2367C44.9429 16.3667 44.9429 16.5767 45.1657 16.7067L47.3829 18L45.1657 19.2933C44.9429 19.4233 44.9429 19.6333 45.1657 19.7633C45.3886 19.8933 45.7486 19.8933 45.9714 19.7633L48.5943 18.2333C48.8171 18.1033 48.8171 17.8933 48.5943 17.7633L45.9714 16.2333C45.7543 16.1067 45.3886 16.1067 45.1657 16.2367Z"
                        fill="#D74B5C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bone1" clipPath="url(#clip5)">
            <g id="Icons_6">
              <g id="Rounded_6">
                <g id="Navigation_6">
                  <g id="Round / Navigation / chevron right_6">
                    <g id="Group_6">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_6"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M45.9932 9.18334C44.6561 9.83334 44.6561 10.8833 45.9932 11.5333L59.2961 18L45.9932 24.4667C44.6561 25.1167 44.6561 26.1667 45.9932 26.8167C47.3304 27.4667 49.4904 27.4667 50.8275 26.8167L66.5646 19.1667C67.9018 18.5167 67.9018 17.4667 66.5646 16.8167L50.8275 9.16667C49.5246 8.53334 47.3304 8.53334 45.9932 9.18334Z"
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
              transform="translate(6 8)"
            />
          </clipPath>
          <clipPath id="clip1">
            <rect
              width="10"
              height="13"
              fill="white"
              transform="translate(23 12)"
            />
          </clipPath>
          <clipPath id="clip2">
            <rect
              width="7"
              height="9"
              fill="white"
              transform="translate(33 14)"
            />
          </clipPath>
          <clipPath id="clip3">
            <rect
              width="5"
              height="6"
              fill="white"
              transform="translate(40 15)"
            />
          </clipPath>
          <clipPath id="clip4">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(45 16)"
            />
          </clipPath>
          <clipPath id="clip5">
            <rect
              width="24"
              height="20"
              fill="white"
              transform="translate(45 8)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Forth;
