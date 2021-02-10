/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { isSSR } from "../utils/isSSR";

import MailCopy from "./MailCopy";

interface SocialIconCommonPropsI {
  name: string;
  socialImageUrl: string;
  copyIconWidth?: number;
}

interface SocialIconEmailPropsI extends SocialIconCommonPropsI {
  email: string;
  copyIconColor: string;
  socialUrl?: never;
}
interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
  email?: never;
  copyIconColor?: never;
}

type SocialIconPropsI = SocialIconEmailPropsI | SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = (props) => {
  const {
    socialUrl,
    email,
    copyIconColor,

    //
    name,
    socialImageUrl,
    copyIconWidth,
    //
  } = props;

  return (
    <div
      className={`social-icon ${!email ? "" : "email"}`}
      css={css`
        border: crimson solid 1px;

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

          & .image-container {
            border: olive solid 1px;
            width: 48px;
          }
        }

        &.email {
          border: red solid 1px;
          width: 100%;
          margin: 8px;
        }
      `}
    >
      {!email && !copyIconColor ? (
        <section className="social-section">
          <a href={socialUrl} target="_blank" rel="noreferrer">
            <div className="image-container">
              <Image
                src={socialImageUrl}
                layout="responsive"
                width="auto"
                height="auto"
                alt={`${name}-icon`}
              />
            </div>
          </a>
        </section>
      ) : (
        <MailCopy
          copyIconColor={copyIconColor}
          email={email}
          socialImageUrl={socialImageUrl}
          copyIconWidth={copyIconWidth}
        />
      )}
    </div>
  );
};

export default SocialIcon;
