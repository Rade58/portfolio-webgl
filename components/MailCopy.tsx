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
  email: string;
  copyIconColor: string;
  copyIconWidth?: number;
}

const MailCopy: FunctionComponent<MailCopyPropsI> = ({
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

          border: red solid 1px;
          width: 100%;
          margin-top: 8px;

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
      <div className="text-before">Or you can send me an email:</div>
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
      <div
        tabIndex={0}
        role="textbox"
        className="email-text"
        onClick={async (e) => {
          // console.log(e);

          const nodeToBeSelected: Node = e.target as Node;

          if (document && window && window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();

            range.selectNodeContents(nodeToBeSelected);

            selection.removeAllRanges();
            selection.addRange(range);
          }
        }}
        onKeyDown={(e) => {
          // console.log(e);

          if ((e.key = "Enter")) {
            const nodeToBeSelected: Node = e.target as Node;

            if (document && window && window.getSelection) {
              const selection = window.getSelection();
              const range = document.createRange();

              range.selectNodeContents(nodeToBeSelected);

              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }}
        onBlur={async (e) => {
          const nodeToBeSelected: Node = e.target as Node;

          if (document && window && window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
          }
        }}
      >
        {email}
      </div>
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
        onKeyPress={async (e) => {
          // console.log("click");

          if (!navigator.clipboard) {
            return;
          }

          if ((e.key = "Enter")) {
            try {
              await navigator.clipboard.writeText(email);
            } catch (error) {
              console.error("Failed to copy!", error);
            }
          }
        }}
        onMouseDown={(e) => {
          console.log(e);
        }}
        onMouseUp={(e) => {
          console.log(e);
        }}
      >
        <CopyIcon color={copyIconColor} width={copyIconWidth} />
      </button>
    </section>
  );
};

export default MailCopy;
