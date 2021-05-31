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
      <section
        className="social-icons-container"
        css={css`
          border: pink solid 0px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          & div.social-icon {
            &:first-of-type {
              margin-left: auto;
            }

            &:last-of-type {
              margin-right: auto;
            }
          }
        `}
      >
        {data.socialIcons.map(({ name, url, socialImage }) => {
          const {
            asset: { url: socialImageUrl },
          } = socialImage;

          // console.log({ name, url, socialImageUrl });

          return (
            <SocialIcon
              key={name}
              socialUrl={url}
              name={name}
              socialImageUrl={socialImageUrl}
            />
          );
        })}
      </section>
      <Separator nonEmoji thickness={3} direction="inwards" />
      <MailCopy
        copyIconColor={data.iconColor.color}
        email={data.myEmail}
        copyIconWidth={16}
      />
    </ArticleStory>
  );
};

export default Contact;
