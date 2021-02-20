/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Separator from "./Separator";
import PostCard from "./PostCard";

export interface SinglePostI {
  title: string;
  date: string;
  link: string;
  tags: string[];
}

interface ListOfPostsPropsI {
  posts: SinglePostI[];
}

const ListOfPosts: FunctionComponent<ListOfPostsPropsI> = ({ posts }) => {
  return (
    <div className="list-of-posts">
      {posts.map((data) => (
        <PostCard key={data.title} data={data} />
      ))}
    </div>
  );

  // return <div>{JSON.stringify({ posts }, null, 2)}</div>;
};

export default ListOfPosts;
