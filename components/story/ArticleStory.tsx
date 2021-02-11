/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import {
  storyService,
  EE,
  fse,
  fseS,
  EEs,
} from "../../state_machines/story_machine";

import { isSSR } from "../../utils/isSSR";

import { fse as majorFsesEnum } from "../../sketch/middle_ground/major_states";

interface PropsI {
  articleReference: RefObject<HTMLElement>;
  majorName: majorFsesEnum;
}

const ArticleStory: FunctionComponent<PropsI> = ({
  children,
  articleReference,
  majorName,
}) => {
  const [state, __] = useService(storyService);

  const { major, mediaBellow } = state.context;
  // ZA style ATRIBUTE
  /*
      visibility: hidden;
      height: 0;
      margin: 0;
  */
  //  mediaBellow

  //
  if (major === "undefined") {
    return null;
  }

  return (
    <article
      id={majorName}
      className={`story-article ${
        mediaBellow ? "media-bellow" : "media-above"
      } ${majorName === major ? "presented" : "not-presented"}`}
      css={css`
        margin-top: 0;

        &#${majorName} {
          &.media-bellow {
            height: 100%;

            &.not-presented {
              visibility: hidden;
              height: 0;
              margin: 0;
            }

            &.presented {
              visibility: visible;
              height: 100%;
            }

            & > p:first-of-type {
              margin-top: 0;
            }

            & > div:first-of-type {
              & > p:first-of-type {
                margin-top: 0;
              }
            }
          }

          &.media-above {
            height: 95vh;

            &.not-presented {
              visibility: hidden;
              height: 0;
              margin-bottom: 0;
            }

            &.presented {
              visibility: visible;
              height: 100%;
              margin-bottom: 8px;
            }
          }
          /* mozda ne treba */
          /* & > div {
            &.content-holder {
              margin: 0;
            }
          } */
        }
      `}
      ref={articleReference}
    >
      {children}
    </article>
  );
};

export default ArticleStory;
