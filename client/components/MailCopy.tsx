/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, createRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import { storyService } from "../state_machines/story_machine";

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
  const emailTextRef = createRef<HTMLDivElement>();

  const [state, __] = useService(storyService);

  // POPRAVI OUTLINE

  return (
    <section
      className="email-section"
      css={css`
        &.email-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          border: red solid 0px;
          width: fit-content;
          margin-top: 18px;

          margin-left: 18px;

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

            &.outline-disabled {
              &:focus {
                outline: none;
              }
            }

            &::selection {
              color: ${copyIconColor};
              background-color: blanchedalmond;
            }
          }

          & .copy-button {
            height: 38px;
            border: outset 2px ${copyIconColor};
            background-color: #e7acdd;

            &.outline-disabled {
              &:focus {
                outline: none;
              }
            }

            /* &:hover {
              outline: none;
            } */
            &:active {
              outline: none;
            }
          }

          & .text-before {
            width: 100%;
            border: pink solid 0px;
            margin-bottom: 8px;
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
        ref={emailTextRef}
        tabIndex={
          state.context.mediaBellow && state.context.focusingInsideStoryAllowed
            ? 0
            : -1
        }
        role="textbox"
        className={`email-text ${
          !state.context.outlineAllowed ? "outline-disabled" : ""
        }`}
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
        onKeyDown={async (e) => {
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

            if (!navigator.clipboard) {
              return;
            }

            try {
              await navigator.clipboard.writeText(email);
            } catch (error) {
              console.error("Failed to copy", error);
            }
          }
        }}
        onBlur={async (e) => {
          if (document && window && window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
          }
        }}
      >
        {email}
      </div>
      <button
        tabIndex={
          state.context.mediaBellow && state.context.focusingInsideStoryAllowed
            ? 0
            : -1
        }
        className={`copy-button ${
          !state.context.outlineAllowed ? "outline-disabled" : ""
        }`}
        /* onMouseLeave={(e) => {
          e.currentTarget.style.outline = "none";
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.outline = "none";
        }}
        onFocus={(e) => {
          if (e.currentTarget.attributes.getNamedItem("style")) {
            e.currentTarget.attributes.removeNamedItem("style");
          }
        }} */
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
              const nodeToBeSelected: Node = emailTextRef.current;

              if (document && window && window.getSelection) {
                console.log(emailTextRef.current);
                const selection = window.getSelection();
                const range = document.createRange();

                range.selectNodeContents(nodeToBeSelected);

                selection.removeAllRanges();
                selection.addRange(range);
              }

              await navigator.clipboard.writeText(email);
            } catch (error) {
              console.error("Failed to copy!", error);
            }
          }
        }}
        onMouseDown={(e) => {
          // console.log("mousedown");

          if (emailTextRef.current) {
            const nodeToBeSelected: Node = emailTextRef.current;

            if (document && window && window.getSelection) {
              console.log(emailTextRef.current);
              const selection = window.getSelection();
              const range = document.createRange();

              range.selectNodeContents(nodeToBeSelected);

              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }}
        onMouseUp={(e) => {
          // console.log("mouseup");
          if (document && window && window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
          }
        }}
        onKeyUp={(e) => {
          // console.log("mouseup");
          if ((e.key = "Enter")) {
            if (document && window && window.getSelection) {
              const selection = window.getSelection();
              selection.removeAllRanges();
            }
          }
        }}
      >
        <CopyIcon color={copyIconColor} width={copyIconWidth} />
      </button>
    </section>
  );
};

export default MailCopy;
