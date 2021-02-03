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
        align-self: center;
        flex-wrap: wrap;
        width: fit-content;

        & > span.devicon-image-container {
          width: 30px;
          display: inline-block;
          margin-right: 8px;
        }

        & .devicon-title {
          color: ${textColor || "#fff"};
          margin-right: 8px;
        }
      `}
    >
      <span className="devicon-image-container">
        {wikiUrl ? (
          <a href={wikiUrl} target="_blank">
            <Image
              width="auto"
              height="auto"
              layout="responsive"
              src={devImage}
            />
          </a>
        ) : (
          <Image
            width="auto"
            height="auto"
            layout="responsive"
            src={devImage}
          />
        )}
      </span>
      {wikiUrl ? (
        <a href={wikiUrl}>
          <span className="devicon-title">{title}</span>
        </a>
      ) : (
        <span className="devicon-title">{title}</span>
      )}
      {additionalBracketText && (
        <span className="additioanl-text">({additionalBracketText})</span>
      )}
    </div>
  );
};

export default DevIcon;
