/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { SinglePostI as SPI } from "./ListOfPosts";

interface SinglePostI {
  data: SPI;
}

const ArticleCard: FunctionComponent<SinglePostI> = ({ data }) => {
  const { date, link, tags, title } = data;

  return <div className="post-card">{title}</div>;

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ArticleCard;
