/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { animfse } from "../state_machines/app_machine";

const LoadedAnimations: FunctionComponent = () => {
  const animStateHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("loaded");
    import("../mutation_observer").then(async (module) => {
      const {
        config,
        majorStateHolder,
        default: animationMachineMutationObserver,
      } = module;

      const { appService, EE } = await import("../state_machines/app_machine");

      animationMachineMutationObserver.observe(majorStateHolder, config);

      appService.start();

      const currentAnimeMachineFinitestate = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.finiteState as animfse;
      const currentAnimeMachineMajorState = (document.querySelector(
        "div.major_state_holder"
      ) as HTMLDivElement).dataset.majorState as animfse;

      const backButton = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      ) as HTMLButtonElement;
      const forwardButton = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      ) as HTMLButtonElement;

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
    });
  }, []);

  return null;
};

export default LoadedAnimations;
