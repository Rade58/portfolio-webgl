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

  return (
    <div
      className="project-card"
      css={css`
        background-image: url(${snapshot.asset.url});
        background-size: cover;
        height: 100px;
      `}
    >
      {title}
    </div>
  );

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ProjectCard;
