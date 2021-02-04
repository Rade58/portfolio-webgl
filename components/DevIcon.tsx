/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

interface DeviconPropI {
  title: string;
  devImage: string;
  wikiUrl?: string;
  textColor?: string;
  additionalBracketText?: string;
}

const DevIcon: FunctionComponent<DeviconPropI> = ({
  title,
  devImage,
  wikiUrl,
  textColor,
  additionalBracketText,
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
          margin-right: 8px;
          flex-shrink: 0;
          flex-grow: 0;

          text-decoration: none;
          border: crimson solid 1px;
          width: 30px;
          & .image-wrapper {
            border: crimson solid 1px;
            margin-top: 4px;
            margin-bottom: 4px;
          }
        }

        & > .text-content {
          border: pink solid 1px;
        }

        & .devicon-title {
          color: ${textColor || "#fff"};
        }
      `}
    >
      <span className="devicon-image-container">
        {wikiUrl ? (
          <div className="image-wrapper">
            <a href={wikiUrl} target="_blank" rel="noreferrer">
              <Image
                width="auto"
                height="auto"
                layout="responsive"
                src={devImage}
              />
            </a>
          </div>
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
          <span className="additional-text">({additionalBracketText})</span>
        )}
      </span>
    </div>
  );
};

export default DevIcon;
