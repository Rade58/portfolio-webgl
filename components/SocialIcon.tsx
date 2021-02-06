/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

import { isSSR } from "../utils/isSSR";

interface SocialIconCommonPropsI {
  name: string;
  socialImageUrl: string;
}

interface SocialIconEmailPropsI extends SocialIconCommonPropsI {
  email: string;
  socialUrl?: never;
}
interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
  email?: never;
}

type SocialIconPropsI = SocialIconEmailPropsI | SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = (props) => {
  const {
    socialUrl,
    email,
    //
    name,
    socialImageUrl,
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
          border: red solid 4px;
          width: 100%;
          margin: 8px;

          & .email-section {
            display: flex;

            & .email-container {
              border: purple solid 1px;
              width: 48px;
            }

            & .email-text {
              border: olive solid 1px;
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
                alt="social icon"
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
              alt="social icon"
            />
          </div>
          <div className="email-text">{email}</div>
          <button
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
