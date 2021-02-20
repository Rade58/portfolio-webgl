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
    <div className="list-of-projects">
      {projects.map((data) => (
        <ProjectCard key={data.title} data={data} />
      ))}
    </div>
  );

  // return <div>{JSON.stringify({ projects }, null, 2)}</div>;
};

export default ListOfProjects;
