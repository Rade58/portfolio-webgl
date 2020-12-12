/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";

const StyledDiv = styled.div`
  border: crimson solid 2px;
`;

const OtherSec: FunctionComponent = () => {
  return <StyledDiv>text</StyledDiv>;
};

export default OtherSec;
