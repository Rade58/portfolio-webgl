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
import ListOfProjects from "../ListOfProjects";
import Separator from "../Separator";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

import serializers from "../sanity_serializers";

interface PropsI {
  projectsArticleRef: RefObject<HTMLElement>;
  data: any;
  storyIsBellow: boolean;
}

const Projects: FunctionComponent<PropsI> = ({
  projectsArticleRef,
  storyIsBellow,
  data,
}) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  // console.log({ projectsData: data });

  return (
    <ArticleStory
      articleReference={projectsArticleRef}
      majorName={majorFsesEnum.projects}
    >
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
      <BlockContent
        blocks={data.bogati}
        dataset="production"
        projectId="4mpb3bwc"
        serializers={serializers}
      />
      {/* SAMO U CILJU PROBE, UKLONICU KASNIJE */}

      {/* ------------------------------ */}
      <Separator nonEmoji direction="outwards" thickness={4} />

      <ListOfProjects storyIsBellow={storyIsBellow} projects={data.projects} />
    </ArticleStory>
  );
};

export default Projects;
