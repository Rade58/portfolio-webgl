/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, RefObject } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface PropsI {
  articleReference: RefObject<HTMLElement>;
}

const ArticleStory: FunctionComponent<PropsI> = ({
  children,
  articleReference,
}) => {
  return <article ref={articleReference}>{children}</article>;
};

export default ArticleStory;
