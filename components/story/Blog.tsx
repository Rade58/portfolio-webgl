/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { storyService } from "../../state_machines/story_machine";

import ArticleStory from "./ArticleStory";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

interface PropsI {
  blogArticleRef: RefObject<HTMLElement>;
}

const Blog: FunctionComponent<PropsI> = ({ blogArticleRef }) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  return (
    <ArticleStory
      articleReference={blogArticleRef}
      majorName={majorFsesEnum.blog}
    >
      {major !== "undefined" ? storyMajorText(major, "") : ""}
    </ArticleStory>
  );
};

export default Blog;
