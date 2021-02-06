/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

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

  return <div>{JSON.stringify({ props })}</div>;
};

export default SocialIcon;
