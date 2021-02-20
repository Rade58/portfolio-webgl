/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { SingleProjectI as SPI } from "./ListOfProjects";

interface SingleProjectI {
  data: SPI;
}

const ProjectCard: FunctionComponent<SingleProjectI> = ({ data }) => {
  const {
    dateTime,
    description,
    title,
    link,
    projectType,
    snapshot,
    tags,
  } = data;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default ProjectCard;
