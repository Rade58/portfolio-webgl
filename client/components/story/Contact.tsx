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
import StoryIframe from "./StoryIframe";

interface PropsI {
  contactArticleRef: RefObject<HTMLElement>;
  // data: any;
}

const Contact: FunctionComponent<PropsI> = ({ contactArticleRef }) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

  //

  return (
    <ArticleStory
      articleReference={contactArticleRef}
      // @ts-expect-error
      majorName={"contact"}
    >
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
      <StoryIframe title="Contact" path="https://radedev.com/contact" />
    </ArticleStory>
  );
};

export default Contact;
