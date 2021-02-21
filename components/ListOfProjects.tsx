/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { backgroundImage1, backgroundImage1Reverse } from "../css_vars";

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
        padding-top: 8px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        align-content: stretch;

        & > div.project-card {
          /* box-shadow:  ;*/

          /* height: fit-content; */
          border: crimson solid 0px;
          flex-basis: 280px;
          flex-shrink: 0;
          flex-grow: 1;

          margin: 8px 6px;
          padding: 0;

          border-radius: 0px 18px 0px 18px;

          box-shadow: 0 2.2px 22.5px rgba(31, 28, 54, 0.226);

          overflow: hidden;

          &:nth-of-type(2n) {
            background-image: ${backgroundImage1};
          }
          &:nth-of-type(2n + 1) {
            background-image: ${backgroundImage1Reverse};
          }

          & > a {
            color: inherit;
            text-decoration-line: none;

            display: flex;

            & > aside.track {
              background-color: rgba(96, 72, 128, 0.637);
              width: 26px;
              /* height: 100%; */
            }

            & > .cont {
              border: pink solid 0px;
              padding: 12px;

              display: flex;
              flex-direction: column;
            }
          }

          &:hover {
            & > a {
              color: #a8a8de;

              & > .cont {
                opacity: 0.6;
              }
            }
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
