/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FunctionComponent, RefObject, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Picture from "../imgz/Picture";

interface Props {
  path: string;
  title: string;
}

const StoryIframe: FunctionComponent<Props> = ({
  title,
  path = "https://radedev.com",
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const isAboutMe = title === "About Me";

  return (
    <>
      {isAboutMe && (
        <>
          {!isLoaded && (
            <div
              css={css`
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border: crimson solid 0px;

                & .imgz-hold {
                  display: flex;
                  justify-content: center;
                  overflow: hidden;
                  border-radius: 50% 50%;
                }

                & .content-hold {
                  display: flex;
                  justify-content: center;
                }

                & .about-content {
                  margin-top: 10px;
                  padding: 0px 26px;
                }
                & .hdngz {
                  height: 46px;
                }
              `}
            >
              <div className="hdngz"></div>
              <h1 className="">Hey I'm Rade</h1>
              <div className="imgz-hold">
                <Picture
                  url="https://res.cloudinary.com/radedev/image/upload/v1680297299/1.%20radedev/fourteen_dyhc0f.jpg"
                  alt="Rade"
                />
              </div>
              <div className="content-hold">
                <p className="about-content">
                  I'm a web developer focused on building high-quality,
                  user-friendly applications using the latest technologies. I
                  primarily love using Node.js ecosystem to develop applications
                  with Typescript, Next.js, and Prisma ORM with PostgreSQL
                  database, which allows me to create efficient and powerful
                  applications. I thrive on solving complex technical challenges
                  and finding innovative solutions to difficult problems. author
                  My passion for development is fueled by the drive to provide
                  top-notch solutions that meet the needs of my clients. I am
                  constantly striving to improve my skills and stay up-to-date
                  with the latest technologies. Outside of work, I enjoy
                  spending my free time listening to music, taking long walks,
                  and exploring new podcasts. These activities help me relax and
                  clear my mind, allowing me to approach my work with fresh
                  ideas and renewed focus. I'm excited to see where my career in
                  web development will take me and I'm always looking for new
                  opportunities to grow and expand my skills.
                </p>
              </div>
            </div>
          )}
          <div
            css={css`
              height: 8vh;
            `}
          ></div>
          <iframe
            css={css`
              border: #363132 0px solid;
              border-radius: 24px;
            `}
            style={{ visibility: isLoaded ? "visible" : "hidden" }}
            src={path}
            width="100%"
            height="86%"
            title={title}
            onLoadStart={() => {
              console.log("loaded");
              setIsLoaded(true);
            }}
            onLoad={() => {
              console.log("loaded");
              setIsLoaded(true);
            }}
          >
            Your browser does not support iframes.
          </iframe>
        </>
      )}

      {!isAboutMe && (
        <>
          <div
            css={css`
              height: 8vh;
            `}
          ></div>
          {!isLoaded && (
            <div
              css={css`
                color: crimson;
                font-size: 2rem;
                position: absolute;
                top: 20px;
                left: 42%;
              `}
            >
              <div
                css={css`
                  & {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                  }
                  & div {
                    position: absolute;
                    top: 33px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #c0b5c9;
                    animation-timing-function: cubic-bezier(0, 1, 1, 0);
                  }
                  & div:nth-of-type(1) {
                    left: 8px;
                    animation: lds-ellipsis1 0.6s infinite;
                  }
                  & div:nth-of-type(2) {
                    left: 8px;
                    animation: lds-ellipsis2 0.6s infinite;
                  }
                  & div:nth-of-type(3) {
                    left: 32px;
                    animation: lds-ellipsis2 0.6s infinite;
                  }
                  & div:nth-of-type(4) {
                    left: 56px;
                    animation: lds-ellipsis3 0.6s infinite;
                  }
                  @keyframes lds-ellipsis1 {
                    0% {
                      transform: scale(0);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                  @keyframes lds-ellipsis3 {
                    0% {
                      transform: scale(1);
                    }
                    100% {
                      transform: scale(0);
                    }
                  }
                  @keyframes lds-ellipsis2 {
                    0% {
                      transform: translate(0, 0);
                    }
                    100% {
                      transform: translate(24px, 0);
                    }
                  }
                `}
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <iframe
            css={css`
              border: #363132 0px solid;
              border-radius: 24px;
            `}
            // style={{visibility: isLoaded? "visible": "hidden"}}
            src={path}
            width="100%"
            height="86%"
            title={title}
            onLoadStart={() => {
              console.log("loaded");
              setIsLoaded(true);
            }}
            onLoad={() => {
              console.log("loaded");
              setIsLoaded(true);
            }}
          >
            Your browser does not support iframes.
          </iframe>
        </>
      )}
    </>
  );
};

export default StoryIframe;
