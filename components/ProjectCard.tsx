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
    // snapshot CE BITI NO-OP
    // NE SVIDJA MI SE KAKO IZGLEDA
    // snapshot,
    //
    tags,
  } = data;

  return (
    <div className="project-card">
      <a href={link} target="_blank" rel="noreferrer">
        <aside className="track" />
        <div className="cont">
          <h1>{title}</h1>
          <p className="descr">{description}</p>
          <time dateTime={dateTime}>{new Date(dateTime).toLocaleString()}</time>
          <br />
          project type:
          <h3>{projectType}</h3>
        </div>
      </a>
    </div>
  );

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ProjectCard;
