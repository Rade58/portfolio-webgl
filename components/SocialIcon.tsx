/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { isSSR } from "../utils/isSSR";

import Icon from "./Icon";

interface SocialIconCommonPropsI {
  name: string;
  socialImageUrl: string;
}

interface SocialIconEmailPropsI extends SocialIconCommonPropsI {
  email: string;
  socialUrl?: never;
  copyButtonUrl: string;
}
interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
  copyButtonUrl: string;
  email?: never;
}

type SocialIconPropsI = SocialIconEmailPropsI | SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = (props) => {
  const {
    socialUrl,
    email,
    copyButtonUrl,
    //
    name,
    socialImageUrl,
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
      {!email ? (
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
        <section className="email-section">
          <div className="email-container">
            <Image
              src={socialImageUrl}
              layout="responsive"
              width="auto"
              height="auto"
              alt={`${name}-icon`}
            />
          </div>
          <div className="email-text">{email}</div>
          <button
            className="copy-button"
            onClick={async () => {
              // console.log("click");

              if (!navigator.clipboard) {
                return;
              }

              try {
                await navigator.clipboard.writeText(email);
              } catch (error) {
                console.error("Failed to copy!", error);
              }
            }}
          >
            copy
          </button>
        </section>
      )}
    </div>
  );
};

export default SocialIcon;
