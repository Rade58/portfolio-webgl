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
    <aside>
      {tags.map((tag) => (
        <div key={tag}>{tag}</div>
      ))}
    </aside>
  );
};

export default Tags;
