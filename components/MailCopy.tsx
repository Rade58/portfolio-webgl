/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";
import CopyIcon from "./icons/common_icons/CopyIcon";

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
    <section className="email-section">
      <div className="email-container">
        <Image
          src={socialImageUrl}
          layout="responsive"
          width="auto"
          height="auto"
          alt={`email-icon`}
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
        <CopyIcon color={copyIconColor} width={copyIconWidth} />
      </button>
    </section>
  );
};

export default MailCopy;
