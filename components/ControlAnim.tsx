/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useContext } from "react";
import { css } from "@emotion/core";

// import { animfse } from "../state_machines/app_machine";
// import { EE } from "../state_machines/app_machine";

import BackNForth from "./svgs/BackNForth";

const ControlAnim: FunctionComponent = () => {
  return (
    <section
      className="anim_control"
      css={css`
        border: crimson solid 2px;
        position: fixed;
        /* top: 0; */
        left: 0;
        bottom: 0;
        width: 100vw;
        /* overflow-y: scroll; */
        display: flex;
        justify-content: space-space-evenly;
      `}
    >
      {/* <section>8</section> */}
      {/* <section>8</section> */}
      {/*  */}
      <BackNForth />
      {/*  */}
    </section>
  );
};

export default ControlAnim;
