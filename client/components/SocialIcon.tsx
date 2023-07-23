/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { useService } from "@xstate/react";

import { storyService } from "../state_machines/story_machine";

import { isSSR } from "../utils/isSSR";

import MailCopy from "./MailCopy";

interface SocialIconCommonPropsI {
  name: string;
  socialImageUrl: string;
}

interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
}

type SocialIconPropsI = SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = (props) => {
  const {
    socialUrl,

    //
    name,
    socialImageUrl,

    //
  } = props;

  const [state, __] = useService(storyService);

  return (
    <div
      className={`social-icon`}
      css={css`
        border: crimson solid 0px;

        margin-right: 18px;

        /* &.social-icon {
          &:nth-of-type(2) {
            &::before {
              content: "You can hit me up on:";
              display: block;
              position: relative;
              top: 200;
            }
          }
        } */

        & .social-section {
          margin: 2px 4px;

          &.outline-disabled {
            outline: none;
          }

          & .image-container {
            border: olive solid 0px;
            width: 48px;
          }
        }
      `}
    >
      <section className="social-section">
        <a
          className={`${
            !state.context.outlineAllowed ? "outline-disabled" : ""
          }`}
          tabIndex={state.context.focusingInsideStoryAllowed ? 0 : -1}
          href={socialUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className="image-container">
            <Image
              src={socialImageUrl}
              layout="responsive"
              // width="auto"
              // height="auto"
              alt={`${name}-icon`}
            />
          </div>
        </a>
      </section>
    </div>
  );
};

export default SocialIcon;
