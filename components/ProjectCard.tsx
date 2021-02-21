/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import moment from "moment";

import { SingleProjectI as SPI } from "./ListOfProjects";

interface SingleProjectI {
  data: SPI;
  direction: "left" | "right";
}

const ProjectCard: FunctionComponent<SingleProjectI> = ({
  data,
  direction,
}) => {
  const {
    dateTime,
    description,
    emoji,
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
        {direction === "left" && <aside className="track track-left" />}
        <div className="cont">
          <h1>
            {direction === "left" && `${emoji} `}
            {title}
            {direction === "left" && ` ${emoji}`}
          </h1>
          <p className="descr">{description}</p>
          <div className="project-type">
            <h3>
              <span className="project-type">project type: </span>
              {projectType}
            </h3>
          </div>
          <time dateTime={dateTime}>
            {moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")}
          </time>
          {JSON.stringify({ tags })}
        </div>
        {direction === "right" && <aside className="track track-right" />}
      </a>
    </div>
  );

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ProjectCard;
