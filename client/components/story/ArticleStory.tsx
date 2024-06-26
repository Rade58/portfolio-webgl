/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject, useEffect } from "react";
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
  // @ts-expect-error
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

  useEffect(() => {
    if (!mediaBellow) {
      if (majorName === major) {
        articleReference.current.focus();
      }
    }
  }, [major, mediaBellow]);

  //
  if (major === "undefined") {
    return null;
  }

  return (
    <article
      id={majorName}
      // eslint-disable-next-line
      tabIndex={0}
      className={`story-article ${
        mediaBellow ? "media-bellow" : "media-above"
      } ${majorName === major ? "presented" : "not-presented"} ${
        !state.context.outlineAllowed ? "outline-disabled" : ""
      }`}
      css={css`
        margin-top: 0;
        margin-left: 0;

        &#${majorName} {
          /* &:focus {
            outline: none;
          } */
          &.outline-disabled {
            &:focus {
              outline: none;
            }
          }

          /* width: 100%; */

          &.media-bellow {
            height: 100%;

            &.not-presented {
              visibility: hidden;
              display: none;
              height: 0;
              margin: 0;
            }

            &.presented {
              visibility: visible;
              display: block;
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
              display: none;
              height: 0;
              margin-bottom: 0;
            }

            &.presented {
              visibility: visible;
              display: block;
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
