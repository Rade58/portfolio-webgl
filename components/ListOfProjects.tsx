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
      /* css={css`
        border: olive solid 1px;
        width: 100%;
        padding-top: 18px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        & > * {
          border: crimson solid 1px;
          flex-basis: 288px;
          flex-shrink: 0;
          flex-grow: 1;

          margin-top: 8px;

          border-radius: 8px;
        }
      `} */

      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, 100%);
        grid-template-rows: auto;
        justify-content: center;
        /* ---------------------- */
        /* ---------------------- */
        width: 100%;
        @media screen and (min-width: 700px) {
          width: 88vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 520px));
        }
        @media screen and (min-width: 910px) {
          width: 78vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 460px));
        }
        @media screen and (min-width: 1086px) {
          width: 68vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
        }
        margin-right: auto;
        margin-left: auto;
        & div.project-card {
          background-color: linear-gradient(
            to right,
            rgb(63, 44, 56),
            rgb(38, 45, 59)
          );
          border: olive solid 0px;
          margin-left: 4px;
          margin-right: 4px;
          margin-bottom: 8px;
          border-radius: 2px;
          @media screen and (max-width: 680px) {
            margin-left: 8px;
            margin-right: 8px;
            /* ------------------------------------------- */
            box-shadow: 0 0px 15px -22px rgba(0, 0, 0, 0.157),
              0 0px 16.9px -22px rgba(0, 0, 0, 0.225),
              0 0px 18.2px -22px rgba(0, 0, 0, 0.293),
              0 0px 30px -22px rgba(0, 0, 0, 0.45);
            /* ------------------------------------------- */
          }
          display: flex;
          flex-direction: column;
          position: relative;
          & div.group-icon {
            position: absolute;
            /* margin-left: auto; */
            right: 4px;
            width: 10%;
            border: pink solid 0px;
            margin-right: 6px;
            margin-top: 6px;
            & a {
              & img {
                height: 2rem;
                &:hover {
                  transform: scale3d(1.1, 1.1, 1.1);
                }
              }
            }
          }
          & h1 {
            width: 78%;
            margin-top: 5px;
            margin-left: 6px;
            & a {
              color: blanchedalmond;
              text-decoration-line: none;
              font-weight: 400;
              &:hover {
                text-decoration-line: underline;
                text-decoration-color: blanchedalmond;
              }
              @media screen and (max-width: 680px) {
                text-decoration-line: underline;
              }
            }
          }
          & div.separ-post {
            height: 2px;
            width: 80%;
            background-color: blanchedalmond;
            background-image: linear-gradient(
              to right,
              rgb(63, 44, 56),
              rgb(38, 45, 59)
            );
            margin-top: auto;
            margin-right: auto;
            margin-left: auto;
          }
          & p.descr {
            margin: 10px;
            text-align: center;
          }
          & div.times {
            margin-top: 8px;
            margin-bottom: 4px;
            margin-left: 6px;
            margin-right: 6px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            border: olive solid 0px;
            & time {
              font-size: 0.85rem;
              text-decoration-line: underline;
              color: blanchedalmond;
              @media screen and (max-width: 680px) {
                text-decoration-line: none;
                color: #dd8ab8;
              }
            }
            & > div {
              width: max-content;
              font-size: 0.85rem;
            }
            & > div:nth-of-type(1) {
              margin-right: auto;
            }
            & > div:not(:nth-of-type(1)) {
              margin-left: auto;
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
