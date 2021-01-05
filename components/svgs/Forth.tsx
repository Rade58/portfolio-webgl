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
        flex-basis: 48%;
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
        id="svg2"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 520 28"
      >
        <title id="go_forward">Next</title>
        {/* <rect width="250" height="35" fill="#E5E5E5" /> */}
        <g id="fish_right">
          {/* <rect width="250" height="35" fill="white" /> */}
          <g id="b6" clipPath="url(#cl0)">
            <g id="i">
              <g id="__Rounded">
                <g id="_Navigation">
                  <g id="ro / nav / chevron_1 ri">
                    <g id="Group">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.87 7.36083C15.7 8.10833 15.7 9.31583 16.87 10.0633L28.51 17.5L16.87 24.9367C15.7 25.6842 15.7 26.8917 16.87 27.6392C18.04 28.3867 19.93 28.3867 21.1 27.6392L34.87 18.8417C36.04 18.0942 36.04 16.8867 34.87 16.1392L21.1 7.34166C19.96 6.61333 18.04 6.61333 16.87 7.36083Z"
                        fill="#F0153C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="b5" clipPath="url(#cl1)">
            <g id="i_2">
              <g id="__Rounded_2">
                <g id="_Navigation_2">
                  <g id="ro / nav / chevron ri_2">
                    <g id="Group_2">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.5386 11.8283C36.8143 12.2833 36.8143 13.0183 37.5386 13.4733L44.7443 18L37.5386 22.5267C36.8143 22.9817 36.8143 23.7167 37.5386 24.1717C38.2629 24.6267 39.4329 24.6267 40.1571 24.1717L48.6814 18.8167C49.4057 18.3617 49.4057 17.6267 48.6814 17.1717L40.1571 11.8167C39.4514 11.3733 38.2629 11.3733 37.5386 11.8283Z"
                        fill="black"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="b4" clipPath="url(#cl2)">
            <g id="i_3">
              <g id="__Rounded_3">
                <g id="_Navigation_3">
                  <g id="ro / nav / chevron ri_3">
                    <g id="Group_3">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M52.4143 13.6508C51.8571 14.0083 51.8571 14.5858 52.4143 14.9433L57.9571 18.5L52.4143 22.0567C51.8571 22.4142 51.8571 22.9917 52.4143 23.3492C52.9714 23.7067 53.8714 23.7067 54.4286 23.3492L60.9857 19.1417C61.5429 18.7842 61.5429 18.2067 60.9857 17.8492L54.4286 13.6417C53.8857 13.2933 52.9714 13.2933 52.4143 13.6508Z"
                        fill="#F0153C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="b3" clipPath="url(#cl3)">
            <g id="i_4">
              <g id="__Rounded_4">
                <g id="_Navigation_4">
                  <g id="ro / nav / chevron ri_4">
                    <g id="Group_4">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63.29 14.4733C62.9 14.7333 62.9 15.1533 63.29 15.4133L67.17 18L63.29 20.5867C62.9 20.8467 62.9 21.2667 63.29 21.5267C63.68 21.7867 64.31 21.7867 64.7 21.5267L69.29 18.4667C69.68 18.2067 69.68 17.7867 69.29 17.5267L64.7 14.4667C64.32 14.2133 63.68 14.2133 63.29 14.4733Z"
                        fill="black"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="b2" clipPath="url(#cl4)">
            <g id="i_5">
              <g id="__Rounded_5">
                <g id="_Navigation_5">
                  <g id="ro / nav / chevron ri_5">
                    <g id="Group_5">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M71.2071 15.355C70.9286 15.55 70.9286 15.865 71.2071 16.06L73.9786 18L71.2071 19.94C70.9286 20.135 70.9286 20.45 71.2071 20.645C71.4857 20.84 71.9357 20.84 72.2143 20.645L75.4929 18.35C75.7714 18.155 75.7714 17.84 75.4929 17.645L72.2143 15.35C71.9429 15.16 71.4857 15.16 71.2071 15.355Z"
                        fill="#F0153C"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="b1" clipPath="url(#cl5)">
            <g id="i_6">
              <g id="__Rounded_6">
                <g id="_Navigation_6">
                  <g id="ro / nav / chevron ri_6">
                    <g id="Group_6">
                      <path
                        id="&#240;&#159;&#148;&#185; Icon Color_6"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M75.9114 8.30167C74.6857 9.01667 74.6857 10.1717 75.9114 10.8867L88.1057 18L75.9114 25.1133C74.6857 25.8283 74.6857 26.9833 75.9114 27.6983C77.1371 28.4133 79.1171 28.4133 80.3429 27.6983L94.7686 19.2833C95.9943 18.5683 95.9943 17.4133 94.7686 16.6983L80.3429 8.28334C79.1486 7.58667 77.1371 7.58667 75.9114 8.30167Z"
                        fill="black"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="cl0">
            <rect
              width="21"
              height="23"
              fill="white"
              transform="translate(16 6)"
            />
          </clipPath>
          <clipPath id="cl1">
            <rect
              width="13"
              height="14"
              fill="white"
              transform="translate(37 11)"
            />
          </clipPath>
          <clipPath id="cl2">
            <rect
              width="10"
              height="11"
              fill="white"
              transform="translate(52 13)"
            />
          </clipPath>
          <clipPath id="cl3">
            <rect
              width="7"
              height="8"
              fill="white"
              transform="translate(63 14)"
            />
          </clipPath>
          <clipPath id="cl4">
            <rect
              width="5"
              height="6"
              fill="white"
              transform="translate(71 15)"
            />
          </clipPath>
          <clipPath id="cl5">
            <rect
              width="22"
              height="22"
              fill="white"
              transform="translate(75 7)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Forth;
