/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FC as FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

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
  return (
    <div
      className={`devicon-${title}`}
      css={css`
        display: flex;
        border: crimson solid 1px;
        justify-content: flex-start;
        /* flex-wrap: wrap; */
        width: fit-content;

        & > span.devicon-image-container {
          display: block;
          margin-right: 12px;
          flex-shrink: 0;
          flex-grow: 0;
          margin-left: 8px;

          text-decoration: none;
          border: olive solid 1px;
          width: 48px;
          & .image-wrapper {
            border: crimson solid 0px;
          }
        }

        & > .text-content {
          border: pink solid 1px;
          padding: 2px auto;

          & > a {
            text-decoration-color: #fff;
            color: inherit;
            text-decoration-line: underline;
            text-decoration-style: dashed;

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
            <a href={wikiUrl} target="_blank" rel="noreferrer">
              {emoji ? (
                emoji
              ) : (
                <Image
                  width="auto"
                  height="auto"
                  layout="responsive"
                  src={devImage}
                />
              )}
            </a>
          </div>
        ) : emoji ? (
          emoji
        ) : (
          <Image
            width="auto"
            height="auto"
            layout="responsive"
            src={devImage}
          />
        )}
      </span>
      <span className="text-content">
        {wikiUrl ? (
          <a href={wikiUrl}>
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
