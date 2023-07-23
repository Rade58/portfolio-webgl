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
      <div css={css`
        height: 8vh;
      `}></div>
      <iframe
        src="https://radedev.com/get-in-touch"
        width="100%"
        height="86%"
        title="Get In Touch"
      >
        Your browser does not support iframes.
      </iframe>
      
    </ArticleStory>
  );
};

export default Contact;
