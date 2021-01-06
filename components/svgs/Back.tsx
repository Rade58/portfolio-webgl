/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { appService, EE } from "../../state_machines/app_machine";

const Back: FunctionComponent = () => {
  const [state, send] = useService(appService);

  return (
    <div
      className="back"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        console.log("click back");
        send({ type: EE.CLICK_BACK });
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).blur();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          send({ type: EE.CLICK_BACK });
        }
      }}
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
          width: 108px;
          /* top: 0; */
          right: 0;
          content: "";
          /* border: pink solid 1px; */
        }

        &:hover {
          outline: none;
        }

        & svg {
          position: absolute;
          right: 0;
          width: 598px;
          height: 60px;
        }
      `}
    >
      <svg
        /* NO NEED FOR px ON width AND height */
        // width="100%"
        // height="120"
        aria-labelledby="go_back"
        id="svg1"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-254 0 514 28"
      >
        <title id="go_back">Previous</title>
        {/* <rect width="250" height="35" fill="#E5E5E5" /> */}
        <g id="fish_left____">
          {/* <rect width="250" height="35" fill="white" /> */}
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
                        d="M244.254 26.7575C245.257 26.075 245.257 24.9725 244.254 24.29L234.277 17.5L244.254 10.71C245.257 10.0275 245.257 8.925 244.254 8.2425C243.251 7.56 241.631 7.56 240.629 8.2425L228.826 16.275C227.823 16.9575 227.823 18.06 228.826 18.7425L240.629 26.775C241.606 27.44 243.251 27.44 244.254 26.7575Z"
                        fill="#0e1b35"
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
                        d="M226.834 19.7633C227.057 19.6333 227.057 19.4233 226.834 19.2933L224.617 18L226.834 16.7067C227.057 16.5767 227.057 16.3667 226.834 16.2367C226.611 16.1067 226.251 16.1067 226.029 16.2367L223.406 17.7667C223.183 17.8967 223.183 18.1067 223.406 18.2367L226.029 19.7667C226.246 19.8933 226.611 19.8933 226.834 19.7633Z"
                        fill="#751431"
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
                        d="M222.793 20.645C223.071 20.45 223.071 20.135 222.793 19.94L220.021 18L222.793 16.06C223.071 15.865 223.071 15.55 222.793 15.355C222.514 15.16 222.064 15.16 221.786 15.355L218.507 17.65C218.229 17.845 218.229 18.16 218.507 18.355L221.786 20.65C222.057 20.84 222.514 20.84 222.793 20.645Z"
                        fill="#0e1b35"
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
                        d="M217.71 22.4675C218.1 22.175 218.1 21.7025 217.71 21.41L213.83 18.5L217.71 15.59C218.1 15.2975 218.1 14.825 217.71 14.5325C217.32 14.24 216.69 14.24 216.3 14.5325L211.71 17.975C211.32 18.2675 211.32 18.74 211.71 19.0325L216.3 22.475C216.68 22.76 217.32 22.76 217.71 22.4675Z"
                        fill="#751431"
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
                        d="M210.586 24.2308C211.143 23.8083 211.143 23.1258 210.586 22.7033L205.043 18.5L210.586 14.2967C211.143 13.8742 211.143 13.1917 210.586 12.7692C210.029 12.3467 209.129 12.3467 208.571 12.7692L202.014 17.7417C201.457 18.1642 201.457 18.8467 202.014 19.2692L208.571 24.2417C209.114 24.6533 210.029 24.6533 210.586 24.2308Z"
                        fill="#0e1b35"
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
                        d="M200.089 27.8167C201.314 27.1667 201.314 26.1167 200.089 25.4667L187.894 19L200.089 12.5333C201.314 11.8833 201.314 10.8333 200.089 10.1833C198.863 9.53333 196.883 9.53333 195.657 10.1833L181.231 17.8333C180.006 18.4833 180.006 19.5333 181.231 20.1833L195.657 27.8333C196.851 28.4667 198.863 28.4667 200.089 27.8167Z"
                        fill="#751431"
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
              width="18"
              height="21"
              fill="white"
              transform="translate(245 28) rotate(-180)"
            />
          </clipPath>
          <clipPath id="clip1">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(227 20) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip2">
            <rect
              width="5"
              height="6"
              fill="white"
              transform="translate(223 21) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip3">
            <rect
              width="7"
              height="9"
              fill="white"
              transform="translate(218 23) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip4">
            <rect
              width="10"
              height="13"
              fill="white"
              transform="translate(211 25) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip5">
            <rect
              width="22"
              height="20"
              fill="white"
              transform="translate(201 29) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Back;
