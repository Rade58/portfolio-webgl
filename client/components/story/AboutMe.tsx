/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import BlockContent from "@sanity/block-content-to-react";

import { useService } from "@xstate/react";

import { storyService } from "../../state_machines/story_machine";

import ArticleStory from "./ArticleStory";
import MyImage from "../MyImage";
import DevIcon from "../DevIcon";
import Separator from "../Separator";
import InBetweenText from "../InBetweenText";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

import { storyMajorText } from "../../content";

import serializers from "../sanity_serializers";




interface PropsI {
  aboutMeArticleRef: RefObject<HTMLElement>;
  // data: any;
}

const AboutMe: FunctionComponent<PropsI> = ({ aboutMeArticleRef }) => {
  const [state, send] = useService(storyService);

  const [isLoaded, setIsLoaded ] = useState<boolean>(false)

  const { major } = state.context;
  // debugger;
  return (

    <ArticleStory
      articleReference={aboutMeArticleRef}
    // @ts-expect-error
      majorName={"aboutme"}
    >
      <div css={css`
        height: 8vh;
      `}></div>
      {!isLoaded && <div
        css={css`
          color: crimson;
          font-size: 2rem;
          position: absolute;
          top: 20px;
          left: 42%;
        `}
      >
        <div>

        Loading...
        </div>
        
        
        </div>}
      <iframe
        css={css`
          border: #363132 0px solid;
          border-radius: 24px;

          
        `}
        // style={{visibility: isLoaded? "visible": "hidden"}}
        src="https://radedev.com"
        width="100%"
        height="86%"
        title="About Me"
        onLoad={() => {
          console.log("loaded")
          setIsLoaded(true)
        }}
      >
        Your browser does not support iframes.
      </iframe>
      
    </ArticleStory>
  );
};

export default AboutMe;
