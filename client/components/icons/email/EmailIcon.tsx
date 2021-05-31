/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import IconHolder from "../IconHolder";

import EmailSvg from "../../../svgs_for_inlining/email/EmailSvg.svg";

interface EmailIconPropsI {
  color: string;
  width?: number;
}

const EmailIcon: FunctionComponent<EmailIconPropsI> = ({ color, width }) => {
  return (
    <IconHolder color={color} width={width}>
      <EmailSvg />
    </IconHolder>
  );
};

export default EmailIcon;
