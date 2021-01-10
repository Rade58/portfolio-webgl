/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { fse as fsA } from "../sketch/machine/anim_state_machine";

const Story: FunctionComponent<{ major: fsA | undefined | "undefined" }> = ({
  major,
}) => {
  return <h1>{major === "undefined" ? "true" : "false"}</h1>;
};

export default Story;
