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
  copyIconUrl: string;
  copyIconColor: string;
  socialUrl?: never;
}
interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
  email?: never;
  copyIconUrl?: never;
  copyIconColor?: never;
}

type SocialIconPropsI = SocialIconEmailPropsI | SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = (props) => {
  const {
    socialUrl,
    email,
    copyIconColor,
    copyIconUrl,

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

          & .email-section {
            display: flex;
            align-items: center;

            & > * {
              margin-right: 8px;
            }

            & .email-container {
              border: purple solid 0px;
              width: 48px;
            }

            & .email-text {
              border: #bb2fc0 inset 2px;
              user-select: text;
              padding: 3.8px;

              &::selection {
                color: crimson;
                background-color: blanchedalmond;
              }
            }

            & .copy-button {
              height: fit-content;
            }
          }
        }
      `}
    >
      {!email && !copyIconUrl && !copyIconColor ? (
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
