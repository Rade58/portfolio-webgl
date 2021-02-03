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
  textColor: string;
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
    <span
      className={`devicon-${title}`}
      css={css`
        & > span.devicon-image-container {
          width: 30px;
          display: inline-block;
        }

        & .devicon-title {
          color: ${textColor};
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
    </span>
  );
};

export default DevIcon;
