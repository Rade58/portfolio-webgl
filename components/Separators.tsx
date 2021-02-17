/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

interface SeparatorPropsI {
  emoji: string;
}

const Separators: FunctionComponent<SeparatorPropsI> = ({ emoji }) => {
  return (
    <section className="sepa">
      <div className="separator separator-1" />
      <div>{emoji}</div>
      <div className="separator separator-2" />
    </section>
  );
};

export default Separators;
