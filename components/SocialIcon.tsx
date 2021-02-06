/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface SocialIconCommonPropsI {
  name: string;
  isEmail: boolean;
  socialImageUrl: string;
}

interface SocialIconEmailPropsI extends SocialIconCommonPropsI {
  email: string;
  imageUrl?: never;
}
interface SocialIconUsualPropsI extends SocialIconCommonPropsI {
  socialUrl: string;
  emmail?: never;
}

type SocialIconPropsI = SocialIconEmailPropsI | SocialIconUsualPropsI;

const SocialIcon: FunctionComponent<SocialIconPropsI> = () => {
  return null;
};

export default SocialIcon;
