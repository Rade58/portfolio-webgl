/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Separator from "./Separator";
import ProjectCard from "./ProjectCard";

export interface SingleProjectI {
  title: string;
  dateTime: string;
  description: string;
  projectType: string;
  link: string;
  tags: string[];
  snapshot: { asset: { url: string } };
}

interface ListOfProjectsPropsI {
  projects: SingleProjectI[];
}

const ListOfProjects: FunctionComponent<ListOfProjectsPropsI> = ({
  projects,
}) => {
  return (
    <div
      className="list-of-projects"
      css={css`
        border: olive solid 1px;
        width: 100%;
        padding-top: 18px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        & > div.project-card {
          /* box-shadow:  ;*/
          border: crimson solid 0px;
          flex-basis: 288px;
          flex-shrink: 0;
          flex-grow: 1;

          margin-top: 8px;

          border-radius: 8px;

          &:nth-of-type(2n) {
            background-image: linear-gradient(
              to right,
              rgb(63, 44, 56),
              rgb(38, 45, 59)
            );
          }
          &:nth-of-type(2n + 1) {
            background-image: linear-gradient(
              to right,
              rgb(38, 45, 59),
              rgb(63, 44, 56)
            );
          }
        }
      `}
    >
      {projects.map((data) => (
        <ProjectCard key={data.title} data={data} />
      ))}
    </div>
  );

  // return <div>{JSON.stringify({ projects }, null, 2)}</div>;
};

export default ListOfProjects;
