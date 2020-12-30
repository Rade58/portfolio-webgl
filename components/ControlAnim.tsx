/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useState, useRef } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { Interpreter } from "xstate";

import { fse as animeFse } from "../sketch/machine/anim_state_machine";
import {
  EE,
  MachineContextGenericI,
  machineEventGenericType,
  machineFiniteStateGenericType,
} from "../state_machines/app_machine";

const ControlAnim: FunctionComponent = () => {
  const [appService, setAppService] = useState<
    Interpreter<
      MachineContextGenericI,
      any,
      machineEventGenericType,
      machineFiniteStateGenericType
    >
  >(null);

  /* const majorStateHolderRef = useRef<HTMLDivElement>(null);
  const finiteStateElem = useRef<HTMLDivElement>(null);
  const majorStateElem = useRef<HTMLDivElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const forwardButton = useRef<HTMLButtonElement>(null);

  const [ihaveBackButton, setIhaveBackbutton] = useState<boolean>(false);
  const [ihaveForwardButton, setIhaveForwardbutton] = useState<boolean>(false);
 */
  /* useEffect(() => {
    if (!majorStateHolderRef.current) {
      majorStateHolderRef.current = document.querySelector(
        "div.major_state_holder"
      );

      const config = { attributes: true };

      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes") {
            console.log(majorStateHolderRef.current.dataset.finiteState);
            finiteStateElem.current.innerHTML =
              majorStateHolderRef.current.dataset.finiteState;
            majorStateElem.current.textContent =
              majorStateHolderRef.current.dataset.majorState;
          }
        }
      });

      observer.observe(majorStateHolderRef.current, config);
    }

    if (!backButton.current || !forwardButton.current) {
      // if (majorStateHolderRef.current) {
      backButton.current = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      );
      forwardButton.current = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      );

      if (backButton.current) setIhaveBackbutton(true);
      if (forwardButton.current) setIhaveForwardbutton(true);

      console.log({ backButton, forwardButton });
      // }
    }
  }, [majorStateHolderRef, finiteStateElem, backButton, forwardButton]);
 */

  useEffect(() => {
    import("../state_machines/app_machine").then((appServiceModule) => {
      const { EE, appService } = appServiceModule;
      // appService.start();

      const majorStateHolder = document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement;
      const currentAnimeMachineFinitestate = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.finiteState as animeFse;
      const currentAnimeMachineMajorState = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.majorState as animeFse;

      const backButton = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      ) as HTMLButtonElement;
      const forwardButton = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      ) as HTMLButtonElement;

      if (appService.initialized) {
        appService.send({
          type: EE.INIT,
          payload: {
            backButton,
            currentAnimeMachineFinitestate,
            currentAnimeMachineMajorState,
            forwardButton,
            majorStateHolder,
          },
        });
      }

      setAppService(appService);
    });
  }, []);

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
        overflow-y: scroll;
      `}
    >
      {/* <section ref={finiteStateElem}>8</section>
      <section ref={majorStateElem}>8</section> */}
      <section>8</section>
      <section>8</section>

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
        <title id="go_back">Your Title Goes here</title>
        <rect width="200" height="180" x="8" y="8" fill="crimson" />
      </svg>

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
        <title id="go_forward">Your Title Goes here</title>
        <rect width="200" height="180" x="8" y="8" fill="crimson" />
      </svg>
      {/*  */}
    </section>
  );
};

export default ControlAnim;
