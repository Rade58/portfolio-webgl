/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import CopySvg from "../../../svgs_for_inlining/common_icons/Copy.svg";
import Iconholder from "../IconHolder";

interface CopyIconPropsI {
  color: string;
  width?: number;
}

const CopyIcon: FunctionComponent<CopyIconPropsI> = ({ color, width }) => {
  return (
    // @ts-expect-error
    <Iconholder color={color} width={width}>
      <CopySvg />
    </Iconholder>
  );
};

export default CopyIcon;
