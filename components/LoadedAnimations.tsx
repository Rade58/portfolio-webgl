/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Loadedanimations: FunctionComponent = () => {
  useEffect(() => {
    console.log("loaded");
    import("../mutation_observer/").then(async (module) => {
      const {
        config,
        majorStateHolder,
        default: animationMachineMutationObserver,
      } = module;

      const { appService } = await import("../state_machines/app_machine");

      animationMachineMutationObserver.observe(majorStateHolder, config);

      appService.start();
    });
  });

  return null;
};

export default Loadedanimations;
