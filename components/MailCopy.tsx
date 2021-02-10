/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";
import CopyIcon from "./icons/common_icons/CopyIcon";

import EmailIcon from "./icons/email/EmailIcon";

interface MailCopyPropsI {
  socialImageUrl: string;
  email: string;
  copyIconColor: string;
  copyIconWidth?: number;
}

const MailCopy: FunctionComponent<MailCopyPropsI> = ({
  socialImageUrl,
  copyIconColor,
  email,
  copyIconWidth,
}) => {
  return (
    <section
      className="email-section"
      css={css`
        &.email-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          & > * {
            margin-right: 8px;
          }

          & .email-container {
            border: ${copyIconColor} solid 0px;
            width: ${copyIconWidth + 12}px;
            display: flex;
            justify-content: center;
          }

          & .email-text {
            border: ${copyIconColor} inset 2px;
            height: 38px;
            user-select: text;
            padding: 4.8px;
            margin-right: 0px;
            font-weight: 300;

            &::selection {
              color: ${copyIconColor};
              background-color: blanchedalmond;
            }
          }

          & .copy-button {
            height: 38px;
            border: outset 2px ${copyIconColor};
            background-color: #e7acdd;
          }

          & .text-before {
            width: 100%;
            border: pink solid 0px;
          }
        }
      `}
    >
      <div className="text-before">You can conatact me via email:</div>
      <div className="email-container">
        {/* <Image
          src={socialImageUrl}
          layout="responsive"
          width="auto"
          height="auto"
          alt={`email-icon`}
        /> */}
        <EmailIcon color={copyIconColor} width={28} />
        {/*  */}
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
        <CopyIcon color={copyIconColor} width={copyIconWidth} />
      </button>
    </section>
  );
};

export default MailCopy;
