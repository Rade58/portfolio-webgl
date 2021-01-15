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

import { TweenMax, Power2 } from "gsap";

import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { useService } from "@xstate/react";
import {
  storyService,
  EE,
  fse,
  fseS,
  EEs,
} from "../state_machines/story_machine";

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

  const substatesCallback = useCallback(() => {
    if (storyRef.current) {
      // console.log({ storyRef: storyRef.current });
      // debugger;
      if (state && state.value && state.value[fse.idle]) {
        const substate = state.value[fse.idle];
        const { mediaBellow } = state.context;

        console.log({ substate, mediaBellow, storyRefCurr: storyRef.current });

        if (!mediaBellow) {
          if (substate === fseS.non_visible) {
            TweenMax.to(storyRef.current, {
              duration: 0.6,
              ease: Power2.easeIn,
              width: "0vw",
              // delay: 0.4,
            });
          }

          if (substate !== fseS.non_visible) {
            TweenMax.to(storyRef.current, {
              duration: 0.2,
              ease: Power2.easeIn,
              width: "36vw",
              // delay: 0.4,
            });
          }

          return;
        }

        if (substate === fseS.partial) {
          // ANIMACIJA ZA PARTIAL
          // SLIDING DOWN

          TweenMax.to(storyRef.current, {
            duration: 0.4,
            ease: Power2.easeIn,
            translateY: "0vh",
            height: "24vh",
            delay: 0.4,
          });
        }

        if (substate === fseS.maximal) {
          // PROSIRENJE ELEMENTA
          // DO KONTROLA NARAVNO
          TweenMax.to(storyRef.current, {
            duration: 0.4,
            ease: Power2.easeIn,
            height: "78vh",
            // delay: 0.4,
          });
        }

        if (substate === fseS.non_visible) {
          // CINJENJA DA SE PRVO SMANJI DO PARTIALA, AKO JE
          // PRESDJENO IVDE IZ MAXIMALA
          //  I ONDA PONOVO TRANSLATION PO Y U NEVIDLJIVOST

          TweenMax.to(storyRef.current, {
            duration: 0.2,
            ease: Power2.easeIn,
            height: "24vh",
            translateY: "-24vh",
          });
        }
      }
    }
  }, [storyRef, state]);

  useEffect(() => {
    // ANIMACIJE U ODNSU NA SUBSTATE-OVE idle-A
    // AKO POSTOJI REF KOJI SAM KREIRAO SA createRef

    // OVO MORA ZAVISISTI I OD
    // state.context.mediaBellow // boolean (ZA MEDIA QUERIES)
    // SAM ODEFINISEM ANIMACIJE ZA MOBILE
    //

    // MOZDA  JE BOLJE DA KORISTIM useCallback (REEVALUTE CALLBACK U ODNOSU NA)
    substatesCallback();
  }, [substatesCallback]);
  //  -------------------------------------------------

  if (!major || major === "undefined") {
    return null;
  }

  const currIndex: number = MAJOR_FINITE_STATES_ARRAY.indexOf(major);

  const nextIndex: number =
    currIndex + 1 > MAJOR_ARR_LENGTH - 1 ? 0 : currIndex + 1;
  const prevIndex: number =
    currIndex - 1 < 0 ? MAJOR_ARR_LENGTH - 1 : currIndex - 1;

  // DODATI DUGMAD ZA UVECANJE/SMANJENJE
  // ONA STRELICA KOJA BI SE ROTIRALA (NAPRAVICU NOVI SVG DAKLE)
  // AKO JE ZA UVECANJE DOLE ONDA CE UPIRATI DOLE, A U SUPROTNOM CE SE ZAROTIRAVATI

  return (
    <section
      ref={storyRef}
      className={`story ${bellowAboveClass}`}
      // style={{ width, height }}
      css={css`
        background-color: rgba(98, 67, 136, 0.788);
        border: crimson solid 0px;
        position: fixed;
        z-index: 108;
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
          /* -------- -------- SETUP -------- -------- */
          transform: translateY(-24vh);
          /* -------- */
        }

        &.above {
          /* width: 36vw; */
          width: 0vw;
          height: 100vh;
        }
        /* -------- -------- -------- -------- -------- */
        & .butt-cont {
          border: pink solid 2px;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        & .content {
          border: orange solid 1px;
          text-overflow: ellipsis;
        }

        & .placeh {
          border: tomato inset 1px;
          width: 100%;
          height: 60px;
        }
      `}
    >
      <div className="content">
        <h1>major: {major}</h1>
        <h4>prev: {MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
        <h4>next: {MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry{"'"}s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="placeh" />
      </div>
      {state && state.context && state.context.mediaBellow && (
        <div className="butt-cont">
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
    </section>
  );
};

export default Story;
