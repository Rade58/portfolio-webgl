/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FunctionComponent, RefObject, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { blured } from "./blured_image";
import Image from "next/image";
// import pictureStyle from "./Picture.module.css";

export default function Picture({ url, alt }: { url: string; alt: string }) {
  return (
    <span
      className={`picture relative hidden nav-br-2:inline-block float float-left ml-2 mr-6 mt-4 h-[236px] w-[236px] overflow-hidden border-primary`}
      css={css`
        position: relative;
        display: inline-block;
        height: 236px;
        width: 236px;
      `}
    >
      <Image
        width="236"
        height="236"
        className="relative"
        src={url}
        alt={alt}
        placeholder="blur"
        blurDataURL={blured}
        quality={100}
        objectFit="cover"
      />
    </span>
  );
}
