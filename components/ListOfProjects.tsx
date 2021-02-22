/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, Fragment } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import {
  backgroundImage1,
  backgroundImage1Reverse,
  //
  verticalGradient1,
  verticalGradient2,
  verticalGradient3,
  verticalGradient4,
  verticalGradient5,
  verticalGradient6,
  verticalGradient7,
  circularGradient1,
} from "../css_vars";

import Separator from "./Separator";
import ProjectCard from "./ProjectCard";

export interface SingleProjectI {
  title: string;
  dateTime: string;
  description: string;
  emoji: string;
  projectType: string;
  link: string;
  tags: string[];
  snapshot: { asset: { url: string } };
}

interface ListOfProjectsPropsI {
  projects: SingleProjectI[];
  storyIsBellow: boolean;
}

const ListOfProjects: FunctionComponent<ListOfProjectsPropsI> = ({
  projects,
  storyIsBellow,
}) => {
  return (
    <div
      className="list-of-projects"
      css={css`
        --left-padding: 26px;
        --text-color1: #e4809e;
        --text-color2: #848d94;
        --text-color4: #647fbd;
        --text-color5: #c78eaf;
        --text-color3: rgb(223, 236, 234);

        border: olive solid 1px;
        width: 100%;
        padding-top: 8px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        align-content: stretch;

        &.list-of-projects section.sepa.sepa.sepa {
          width: 100%;
          /* border: pink solid 8px; */
          margin-top: 2px;
          margin-bottom: 2px;
          padding-top: 3px;
          padding-bottom: 3px;
          height: 6px;
        }

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

            & > a {
              & > .cont {
                padding-left: var(--left-padding);
              }
            }

            &:hover {
              & > a {
                & .track-right {
                  background-image: ${verticalGradient6};
                }
              }
            }
          }

          &:nth-of-type(2n + 1) {
            background-image: ${backgroundImage1Reverse};

            &:hover {
              & > a {
                & .track-left {
                  background-image: ${verticalGradient7};
                }
              }
            }
          }

          & > a {
            color: inherit;
            text-decoration-line: none;

            display: flex;

            & > aside.track {
              background-color: rgba(96, 72, 128, 0.637);

              width: var(--left-padding);
              /* height: 100%; */

              &.track-left {
                background-image: ${verticalGradient4};
              }

              &.track-right {
                background-image: ${verticalGradient4};
              }
            }

            & > .cont {
              border: pink solid 0px;
              padding: 12px;

              display: flex;
              flex-direction: column;

              & h1 {
                border: pink solid 0px;
                margin: 0;
                padding: 0;
                height: fit-content;
                color: var(--text-color1);
                font-size: 1.2rem;
              }

              & time {
                font-size: 0.9rem;
                color: var(--text-color2);
              }

              & p {
                margin-top: 4px;
                margin-bottom: 4px;
                color: var(--text-color3);
              }

              & h3 {
                font-weight: 400;
                margin: 0;
                color: var(--text-color4);
                font-size: 1.1rem;

                & .project-type {
                  font-weight: 300;
                  font-size: 0.9rem;
                  color: var(--text-color2);
                }
              }
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
      {projects.map((data, index) => (
        <Fragment key={data.title}>
          <ProjectCard
            data={data}
            direction={!(index % 2) ? "left" : "right"}
          />
          {storyIsBellow && (
            <Separator
              nonEmoji
              direction={index % 2 ? "inwards" : "outwards"}
              thickness={1}
            />
          )}
          {!storyIsBellow && index % 2 !== 0 && (
            <Separator nonEmoji direction={"inwards"} thickness={1} />
          )}
        </Fragment>
      ))}
    </div>
  );

  // return <div>{JSON.stringify({ projects }, null, 2)}</div>;
};

export default ListOfProjects;
