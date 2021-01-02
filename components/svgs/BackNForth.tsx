/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  FunctionComponent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { appService, EE } from "../../state_machines/app_machine";

const BackNForth: FunctionComponent = () => {
  return (
    <Fragment>
      <svg
        tabIndex={0}
        onClick={() => {
          if (appService) {
            console.log("click back");
            appService.send({ type: EE.CLICK_BACK });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (appService) {
              appService.send({ type: EE.CLICK_BACK });
            }
          }
        }}
        /* NO NEED FOR px ON width AND height */
        width="200"
        height="120"
        aria-labelledby="go_back"
        id="svg"
        role="button" /*"presentation"*/ /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 210"
      >
        <title id="go_back">Left</title>
        <rect width="200" height="180" x="8" y="8" fill="crimson" />
      </svg>
      {/*  */}
      {appService.state.value}
      {/*  */}
      <svg
        tabIndex={0}
        onClick={() => {
          if (appService) {
            console.log("click forward");
            appService.send({ type: EE.CLICK_FORTH });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (appService) {
              appService.send({ type: EE.CLICK_FORTH });
            }
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
        <title id="go_forward">Right</title>
        <rect width="200" height="180" x="8" y="8" fill="crimson" />
      </svg>
    </Fragment>
  );
};

export default BackNForth;
