/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import BlockContent from "@sanity/block-content-to-react";

import { useService } from "@xstate/react";

import { storyService } from "../../state_machines/story_machine";

import ArticleStory from "./ArticleStory";
import MyImage from "../MyImage";
import DevIcon from "../DevIcon";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

import serializers from "../sanity_serializers";

interface PropsI {
  aboutMeArticleRef: RefObject<HTMLElement>;
  data: any;
}

const AboutMe: FunctionComponent<PropsI> = ({ data, aboutMeArticleRef }) => {
  const [state, send] = useService(storyService);

  const { major } = state.context;
  // debugger;
  return (
    <ArticleStory
      articleReference={aboutMeArticleRef}
      majorName={majorFsesEnum.aboutme}
    >
      <BlockContent
        blocks={data.bogati}
        dataset="production"
        projectId="4mpb3bwc"
        serializers={serializers}
      />
      {/* PRIMER KAKO BI PREDSTAVIO IKONU ZA TYPESCRIPT */}
      {/* <DevIcon
        title={data.devSvgs[0].title}
        devImage={data.devSvgs[0].devImage.asset.url}
        wikiUrl="https://en.wikipedia.org/wiki/TypeScript"
        textDecorColor="#3178c6"
        additionalBracketText="open source language which builds on JavaScript"
      /> */}
      {/* MAPPING THROU ALL DEVICONS */}
      {data.devSvgs.map(
        ({
          isEmoji,
          emoji,
          title,
          devImage,
          additionalBracketText,
          textDecorColor,
          wikiUrl,
        }) => {
          // debugger;

          let url: string;

          if (devImage && devImage.asset && devImage.asset.url) {
            url = devImage.asset.url;
          }

          return isEmoji ? (
            <DevIcon
              //
              emoji={emoji}
              title={title}
              wikiUrl={wikiUrl}
              textDecorColor={textDecorColor}
              additionalBracketText={additionalBracketText}
              key={title}
            />
          ) : (
            <DevIcon
              //
              devImage={url}
              title={title}
              wikiUrl={wikiUrl}
              textDecorColor={textDecorColor}
              additionalBracketText={additionalBracketText}
              key={title}
            />
          );
        }
      )}
      {/* --------------------------------------------- */}
      These are some other skills I picked up so far: {"\n"}I would like to
      learn these: looking like a 100$
      <MyImage url={data.myImage.asset.url} />
      {/* {major !== "undefined" ? storyMajorText(major, "") : ""} */}
    </ArticleStory>
  );
};

export default AboutMe;
