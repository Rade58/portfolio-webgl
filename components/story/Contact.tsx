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

import SocialIcon from "../SocialIcon";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

import serializers from "../sanity_serializers";

interface PropsI {
  contactArticleRef: RefObject<HTMLElement>;
  data: any;
}

const Contact: FunctionComponent<PropsI> = ({ contactArticleRef, data }) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  return (
    <ArticleStory
      articleReference={contactArticleRef}
      majorName={majorFsesEnum.contact}
    >
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
      <BlockContent
        blocks={data.bogati}
        dataset="production"
        projectId="4mpb3bwc"
        serializers={serializers}
      />
      Icons:
      {data.socialIcons.map(({ name, isEmail, email, url, socialImage }) => {
        const {
          asset: { url: socialImageUrl },
        } = socialImage;

        console.log({ name, isEmail, email, url, socialImageUrl });

        return null;
      })}
    </ArticleStory>
  );
};

export default Contact;
