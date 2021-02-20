/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Separator from "./Separator";
import PostCard from "./PostCard";

interface ListOfPostsPropsI {
  posts: {
    title: string;
    date: string;
    link: string;
    tags: string[];
  }[];
}

const ListOfPosts: FunctionComponent<ListOfPostsPropsI> = ({ posts }) => {
  return null;
};

export default ListOfPosts;
