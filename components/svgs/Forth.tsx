/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";

import { appService, EE } from "../../state_machines/app_machine";

const Forth: FunctionComponent = () => {
  const [state, send] = useService(appService);

  return (
    <svg
      tabIndex={0}
      onClick={() => {
        console.log("click forward");
        send({ type: EE.CLICK_FORTH });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          send({ type: EE.CLICK_FORTH });
        }
      }}
      /* NO NEED FOR px ON width AND height */
      width="200"
      height="120"
      aria-labelledby="go_forward"
      id="svg"
      role="button" /*"presentation"*/ /* or role="imge"*/
      lang="en"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 380 210"
    >
      <title id="go_forward">Next</title>
      <rect width="200" height="180" x="8" y="8" fill="crimson" />
    </svg>
  );
};

export default Forth;
