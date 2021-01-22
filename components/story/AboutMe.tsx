/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import ArticleStory from "./ArticleStory";
import MyImage from "../MyImage";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

interface PropsI {
  aboutMeArticleRef: RefObject<HTMLElement>;
}

const AboutMe: FunctionComponent<PropsI> = ({ aboutMeArticleRef }) => {
  return (
    <ArticleStory
      articleReference={aboutMeArticleRef}
      majorName={majorFsesEnum.aboutme}
    >
      <MyImage />
    </ArticleStory>
  );
};

export default AboutMe;
