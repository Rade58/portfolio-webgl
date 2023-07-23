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
import MailCopy from "../MailCopy";
import Separator from "../Separator";

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

  //

  return (
    // @ts-expect-error
    <ArticleStory
      articleReference={contactArticleRef}
      majorName={"contact"}
    >
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
      <h1>Contact</h1>
      
    </ArticleStory>
  );
};

export default Contact;
