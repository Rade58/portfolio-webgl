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
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="120"
        aria-labelledby="go_back"
        id="svg"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 80 38"
      >
        <title id="go_back">Previous</title>
        <g id="fish_left">
          {/* <rect width="72" height="35" fill="white" /> */}
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
                        d="M65.2543 27.7575C66.2571 27.075 66.2571 25.9725 65.2543 25.29L55.2771 18.5L65.2543 11.71C66.2571 11.0275 66.2571 9.925 65.2543 9.2425C64.2514 8.56 62.6314 8.56 61.6286 9.2425L49.8257 17.275C48.8229 17.9575 48.8229 19.06 49.8257 19.7425L61.6286 27.775C62.6057 28.44 64.2514 28.44 65.2543 27.7575Z"
                        fill="#1D1D1D"
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
                        d="M47.8343 20.7633C48.0571 20.6333 48.0571 20.4233 47.8343 20.2933L45.6171 19L47.8343 17.7067C48.0571 17.5767 48.0571 17.3667 47.8343 17.2367C47.6114 17.1067 47.2514 17.1067 47.0286 17.2367L44.4057 18.7667C44.1828 18.8967 44.1828 19.1067 44.4057 19.2367L47.0286 20.7667C47.2457 20.8933 47.6114 20.8933 47.8343 20.7633Z"
                        fill="#D74B5C"
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
                        d="M43.7929 21.645C44.0714 21.45 44.0714 21.135 43.7929 20.94L41.0214 19L43.7929 17.06C44.0714 16.865 44.0714 16.55 43.7929 16.355C43.5143 16.16 43.0643 16.16 42.7857 16.355L39.5071 18.65C39.2286 18.845 39.2286 19.16 39.5071 19.355L42.7857 21.65C43.0571 21.84 43.5143 21.84 43.7929 21.645Z"
                        fill="#1D1D1D"
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
                        d="M38.71 23.4675C39.1 23.175 39.1 22.7025 38.71 22.41L34.83 19.5L38.71 16.59C39.1 16.2975 39.1 15.825 38.71 15.5325C38.32 15.24 37.69 15.24 37.3 15.5325L32.71 18.975C32.32 19.2675 32.32 19.74 32.71 20.0325L37.3 23.475C37.68 23.76 38.32 23.76 38.71 23.4675Z"
                        fill="#D74B5C"
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
                        d="M31.5857 25.2308C32.1429 24.8083 32.1429 24.1258 31.5857 23.7033L26.0429 19.5L31.5857 15.2967C32.1429 14.8742 32.1429 14.1917 31.5857 13.7692C31.0286 13.3467 30.1286 13.3467 29.5714 13.7692L23.0143 18.7417C22.4571 19.1642 22.4571 19.8467 23.0143 20.2692L29.5714 25.2417C30.1143 25.6533 31.0286 25.6533 31.5857 25.2308Z"
                        fill="#1D1D1D"
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
                        d="M24.0886 28.8167C25.3143 28.1667 25.3143 27.1167 24.0886 26.4667L11.8943 20L24.0886 13.5333C25.3143 12.8833 25.3143 11.8333 24.0886 11.1833C22.8629 10.5333 20.8829 10.5333 19.6571 11.1833L5.23143 18.8333C4.00571 19.4833 4.00571 20.5333 5.23143 21.1833L19.6571 28.8333C20.8514 29.4667 22.8629 29.4667 24.0886 28.8167Z"
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
          <clipPath id="clip0">
            <rect
              width="18"
              height="21"
              fill="white"
              transform="translate(66 29) rotate(-180)"
            />
          </clipPath>
          <clipPath id="clip1">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(48 21) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip2">
            <rect
              width="5"
              height="6"
              fill="white"
              transform="translate(44 22) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip3">
            <rect
              width="7"
              height="9"
              fill="white"
              transform="translate(39 24) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip4">
            <rect
              width="10"
              height="13"
              fill="white"
              transform="translate(32 26) rotate(180)"
            />
          </clipPath>
          <clipPath id="clip5">
            <rect
              width="22"
              height="20"
              fill="white"
              transform="translate(25 30) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Back;
