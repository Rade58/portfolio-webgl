/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, Fragment } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useService } from "@xstate/react";
import {
  storyService,
  fse,
  fseS,
  EEs,
} from "../../state_machines/story_machine";

import { upDownArrowHeight } from "../../css_vars";

const UpDownButton: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  return (
    <Fragment>
      {state && state.context && state.context.mediaBellow && (
        <div
          className="butt-cont"
          css={css`
            border: pink solid 0px;
            position: fixed;
            z-index: 200;
            right: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            height: ${upDownArrowHeight};
            justify-content: center;
          `}
        >
          <button
            onClick={() => {
              const { mediaBellow } = state.context;

              if (mediaBellow) {
                if (state && state.value && state.value[fse.idle]) {
                  const substate = state.value[fse.idle];

                  if (substate === fseS.partial) {
                    console.log({ substate });
                    console.log("full open sent");

                    send({
                      type: EEs.FULL_OPEN,
                    });
                  }

                  if (substate === fseS.maximal) {
                    console.log({ substate });
                    console.log("narrow it sent");

                    send({
                      type: EEs.NARROW_IT,
                    });
                  }
                }
              }
            }}
          >
            Down
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default UpDownButton;
