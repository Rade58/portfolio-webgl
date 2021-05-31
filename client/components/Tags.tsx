/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { tagsBackgroundImage } from "../css_vars";

interface TagsPropsI {
  tags: string[];
}

const Tags: FunctionComponent<TagsPropsI> = ({ tags }) => {
  return (
    <aside
      className="tags project-tags"
      css={css`
        --col1: rgba(161, 140, 209, 0.432);
        --col2: rgba(251, 194, 235, 0.479);

        border: pink solid 0px;
        display: flex;
        flex-wrap: wrap;

        width: fit-content;
        margin-top: 4px;
        margin-left: auto;
        margin-right: auto;

        & > * {
          flex-grow: 0;
          flex-shrink: 0;
          border: crimson solid 0px;

          padding: 2px;
          font-size: 0.9rem;
          border-radius: 2px;
          text-shadow: none;
          font-weight: 300;

          margin-left: 2px;
          margin-right: 2px;

          background-image: ${tagsBackgroundImage};

          color: #e9ced9;
        }
      `}
    >
      {tags.map((tag) => (
        <div key={tag}>
          {"#"}
          {tag}
        </div>
      ))}
    </aside>
  );
};

export default Tags;
