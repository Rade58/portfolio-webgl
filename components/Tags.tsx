/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface TagsPropsI {
  tags: string[];
}

const Tags: FunctionComponent<TagsPropsI> = ({ tags }) => {
  return (
    <aside
      className="tags project-tags"
      css={css`
        border: pink solid 1px;
        display: flex;

        width: fit-content;

        & > * {
          flex-grow: 0;
          flex-shrink: 0;
          border: crimson solid 1px;
          margin: 1px;
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
