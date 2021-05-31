/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { SanityDataI } from "../sanity/data_types";

import { fse } from "../sketch/middle_ground/major_states";

interface PropsHeadingI {
  data: SanityDataI;
  currentMajor: fse;
}

const HeadingStory: FunctionComponent<PropsHeadingI> = ({
  data,
  currentMajor,
}) => {
  const majorData = data[currentMajor];

  return <h1>{majorData.title}</h1>;
};

export default HeadingStory;
