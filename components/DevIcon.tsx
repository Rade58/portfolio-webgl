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
}

const DevIcon: FunctionComponent<DeviconPropI> = ({
  title,
  devImage,
  wikiUrl,
}) => {
  return (
    <span
      className={`devicon-${title}`}
      css={css`
        & > span.devicon-image-container {
          width: 30px;
          display: inline-block;
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
      <span className="devicon-title">{title}</span>
    </span>
  );
};

export default DevIcon;
