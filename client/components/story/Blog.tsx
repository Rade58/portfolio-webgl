/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import BlockContent from "@sanity/block-content-to-react";

import { storyService } from "../../state_machines/story_machine";

import ArticleStory from "./ArticleStory";
import ListOfPosts from "../ListOfPosts";
import Separator from "../Separator";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

import serializers from "../sanity_serializers";
import StoryIframe from "./StoryIframe";

interface PropsI {
  blogArticleRef: RefObject<HTMLElement>;
  // data: any;
}

const Blog: FunctionComponent<PropsI> = ({ blogArticleRef }) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  // console.log({ blogData: data });

  return (
    <ArticleStory
      articleReference={blogArticleRef}
    // @ts-expect-error
      majorName={"blog"}
    >
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
      {/* <BlockContent
        blocks={data.bogati}
        dataset="production"
        projectId="4mpb3bwc"
        serializers={serializers}
      /> */}
      <StoryIframe 
        path="https://radedev.com/digital-garden"
      />
      
      {/* ----------------------------- */}
      {/* <ListOfPosts posts={data.articles} /> */}
    </ArticleStory>
  );
};

export default Blog;
