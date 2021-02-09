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

  // COMMON ICON NORMALIZATION
  const { commonIcons } = data;

  interface CopyIconDataI {
    name: string;
    url: string;
    color: string;
  }

  let copyIconObjectData: CopyIconDataI;

  for (const ob of commonIcons) {
    if (ob.name === "copy") {
      copyIconObjectData = {
        name: ob.name,
        url: ob.icon.asset.url,
        // DUPLO color JER JE REC O REFERENCI (QUERY-OVAO SI OVO KAO REFERENCU)
        color: ob.color.color,
      };
    }
  }

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
      Icons:
      <section
        className="social-icons-container"
        css={css`
          border: pink solid 1px;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {data.socialIcons.map(({ name, isEmail, email, url, socialImage }) => {
          const {
            asset: { url: socialImageUrl },
          } = socialImage;

          console.log({ name, isEmail, email, url, socialImageUrl });

          if (!isEmail) {
            return (
              <SocialIcon
                key={name}
                socialUrl={url}
                name={name}
                socialImageUrl={socialImageUrl}
              />
            );
          } else {
            return (
              <SocialIcon
                key={name}
                email={email}
                name={name}
                socialImageUrl={socialImageUrl}
                copyIconColor={copyIconObjectData.color}
                copyIconUrl={copyIconObjectData.url}
              />
            );
          }
        })}
      </section>
    </ArticleStory>
  );
};

export default Contact;
