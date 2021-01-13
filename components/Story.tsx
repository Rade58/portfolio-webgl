/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  FunctionComponent,
  useEffect,
  useState,
  createRef,
  useCallback,
} from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { useService } from "@xstate/react";
import { storyService, EE, fse, fseS } from "../state_machines/story_machine";

import { isSSR } from "../utils/isSSR";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const Story: FunctionComponent = () => {
  //
  const storyRef = createRef<HTMLElement>();

  // VODI RACUNA DA major MOZE BITI I STRING "undefined"

  const [state, send] = useService(storyService);

  const { major } = state.context;
  const [bellowAboveClass, setBellowAboveClass] = useState<"bellow" | "above">(
    "bellow"
  );

  //
  useEffect(() => {
    if (!isSSR()) {
      const mqList = window.matchMedia("(max-width: 758px)");

      console.log({ matches: mqList.matches });

      if (mqList.matches) {
        send({ type: EE.GIVE_MEDIA, payload: { isBellow: true } });
        setBellowAboveClass("bellow");
      } else {
        send({ type: EE.GIVE_MEDIA, payload: { isBellow: false } });
        setBellowAboveClass("above");
      }

      mqList.onchange = (e) => {
        // console.log(e.media);
        // console.log(e.matches);

        if (e.matches) {
          send({ type: EE.GIVE_MEDIA, payload: { isBellow: true } });
          setBellowAboveClass("bellow");
        } else {
          send({ type: EE.GIVE_MEDIA, payload: { isBellow: false } });
          setBellowAboveClass("above");
        }
      };
    }
  }, []);

  //  ---------------- SUBSTATE ANIMATIONS ----------------
  useEffect(() => {
    // ANIMACIJE U ODNSU NA SUBSTATE-OVE idle-A
    // AKO POSTOJI REF KOJI SAM KREIRAO SA createRef

    // OVO MORA ZAVISISTI I OD
    // state.context.mediaBellow // boolean (ZA MEDIA QUERIES)
    // SAM ODEFINISEM ANIMACIJE ZA MOBILE
    //

    // MOZDA  JE BOLJE DA KORISTIM useCallback (REEVALUTE CALLBACK U ODNOSU NA)

    if (storyRef.current) {
      console.log({ storyRef: storyRef.current });
      // debugger;
      if (state && state.value && state.value[fse.idle]) {
        const substate = state.value[fse.idle];
        const { mediaBellow } = state.context;

        console.log({ substate, mediaBellow });
      }
    }
  }, [storyRef]);
  //  -------------------------------------------------

  if (!major || major === "undefined") {
    return null;
  }

  const currIndex: number = MAJOR_FINITE_STATES_ARRAY.indexOf(major);

  const nextIndex: number =
    currIndex + 1 > MAJOR_ARR_LENGTH - 1 ? 0 : currIndex + 1;
  const prevIndex: number =
    currIndex - 1 < 0 ? MAJOR_ARR_LENGTH - 1 : currIndex - 1;

  return (
    <section
      ref={storyRef}
      className={`story ${bellowAboveClass}`}
      // style={{ width, height }}
      css={css`
        border: crimson solid 1px;
        position: fixed;
        top: 0;
        left: 0;
        /* height: 22vh; */
        /* height: 100vh; */
        /* width: 220px; */
        overflow: hidden;

        /* FOR MATCH MEDIA (MEDIA QUERIES) */
        &.bellow {
          width: 100%;
          height: 24vh;
        }

        &.above {
          width: 36vw;
          height: 100vh;
        }
        /* ------------------------------- */
      `}
    >
      <h4>prev: {MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
      <h1>major: {major}</h1>
      <h4>next: {MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
    </section>
  );
};

export default Story;
