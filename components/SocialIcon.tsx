/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

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
    <div className="social-icon">
      <a href={socialUrl} target="_blank" rel="noreferrer">
        <div className="image-container">
          <Image
            src={socialImageUrl}
            layout="responsive"
            width="auto"
            height="auto"
          />
        </div>
      </a>
    </div>
  );

  if (email) {
  } else {
    return null;
  }

  return <div>{JSON.stringify({ props })}</div>;
};

export default SocialIcon;
