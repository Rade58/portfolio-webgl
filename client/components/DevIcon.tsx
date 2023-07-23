/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FC as FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { useService } from "@xstate/react";
import { storyService } from "../state_machines/story_machine";

interface BaseDeviconPropsI {
  title: string;
  textDecorColor: string;
  wikiUrl: string;
  additionalBracketText?: string;
}

interface DeviconPropsSvgI extends BaseDeviconPropsI {
  devImage: string;
  emoji?: never;
}

interface DeviconPropsEmojiI extends BaseDeviconPropsI {
  emoji: string;
  devImage?: never;
}

type deviconProps = DeviconPropsEmojiI | DeviconPropsSvgI;

/* const devicon: deviconProps = {
  emoji: "",
  textDecorColor: "",
  title: "",
  wikiUrl: "",
}; */

/**
 *
 * @description emoji or devImage (can't do both)
 */
const DevIcon: FunctionComponent<deviconProps> = ({
  additionalBracketText,
  devImage,
  emoji,
  textDecorColor,
  title,
  wikiUrl,
}) => {
  const [state, send] = useService(storyService);

  return (
    <div
      className={`devicon-${title}`}
      css={css`
        display: flex;
        border: crimson solid 0px;
        justify-content: flex-start;
        /* flex-wrap: wrap; */
        width: fit-content;
        margin-top: 8px;
        margin-left: 14px;

        & > span.devicon-image-container {
          display: flex;
          align-items: center;
          margin-right: 12px;
          flex-shrink: 0;
          flex-grow: 0;
          margin-left: 8px;

          text-decoration: none;
          border: olive solid 0px;
          width: 38px;

          & .emoji-holder {
            display: flex;
            font-size: 1.8rem;
            justify-content: center;
            align-items: center;
          }

          & .image-wrapper {
            border: crimson solid 0px;
            width: 100%;
            height: fit-content;
            & a {
              /* display: flex; */
              & > div {
                /* */
                margin: auto 0;
                border: pink solid 0px;
                /* margin-top: 6px; */
              }
            }
          }
        }

        & > .text-content {
          border: pink solid 0px;
          padding: 2px auto;
          display: flex;
          align-items: center;

          & .additional-text {
            /* align-self: center; */
            margin-left: 12px;
            line-height: 1.2;
            font-size: 0.9rem;
          }

          & > a {
            text-decoration-color: #fff;
            color: inherit;
            text-decoration-line: underline;
            text-decoration-style: dashed;

            border: crimson solid 0px;
            /* margin-top: 25px; */

            /* FOCUS DISABLE ON partial STATE */

            /* ------------------------------ */

            &:hover {
              text-decoration-style: solid;
              text-decoration-color: ${textDecorColor};
              text-decoration-thickness: 2.2px;
            }
          }
        }
      `}
    >
      <span className="devicon-image-container">
        {wikiUrl ? (
          <div className="image-wrapper">
            <a
              tabIndex={
                state.context.mediaBellow &&
                state.context.focusingInsideStoryAllowed
                  ? 0
                  : -1
              }
              href={wikiUrl}
              target="_blank"
              rel="noreferrer"
            >
              {emoji ? (
                <span className="emoji-holder">{emoji}</span>
              ) : (
                <Image
                  // width="auto"
                  // height="auto"
                  layout="responsive"
                  src={devImage}
                  alt={`${title}-icon`}
                />
              )}
            </a>
          </div>
        ) : emoji ? (
          <span className="emoji-holder">{emoji}</span>
        ) : (
          <Image
            // width="auto"
            // height="auto"
            layout="responsive"
            src={devImage}
            alt={`${title}-icon`}
          />
        )}
      </span>
      <span className="text-content">
        {wikiUrl ? (
          <a
            tabIndex={
              state.context.mediaBellow &&
              state.context.focusingInsideStoryAllowed
                ? 0
                : -1
            }
            href={wikiUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="devicon-title">{title}</span>
          </a>
        ) : (
          <span className="devicon-title">{title}</span>
        )}
        {additionalBracketText && (
          <span className="additional-text"> ({additionalBracketText})</span>
        )}
      </span>
    </div>
  );
};

export default DevIcon;
