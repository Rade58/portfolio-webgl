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

import { TweenMax, Power2, Power4, Power1, Quint } from "gsap";

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

import UpDownButton from "./svgs/UpDownButton";
import PreviewStory from "./PreviewStory";
import MyImage from "./MyImage";

import { storyMajorText, headingStory } from "../content";

import {
  upDownArrowHeight,
  storyHeightMax,
  storyHeightMin,
  previewHeight,
  previewMargin,
  storyHeaderHeight,
  storyHeaderMargin,
  matchMediaMaxWidth,
} from "../css_vars";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const Story: FunctionComponent = () => {
  //
  const storyRef = createRef<HTMLElement>();
  const articleRef = createRef<HTMLElement>();
  // const contentRef = createRef<HTMLDivElement>();

  // VODI RACUNA DA major MOZE BITI I STRING "undefined"

  const [state, send] = useService(storyService);

  const { major } = state.context;
  const [bellowAboveClass, setBellowAboveClass] = useState<"bellow" | "above">(
    "bellow"
  );

  //
  useEffect(() => {
    if (!isSSR()) {
      const mqList = window.matchMedia(`(max-width: ${matchMediaMaxWidth})`);

      // console.log({ matches: mqList.matches });

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

  // ------------------------------ ANIM VALUES
  /* const storyHeightMax = "84vh";
  const storyHeightMin = "24vh" */

  //  ---------------- SUBSTATE ANIMATIONS ----------------

  const substatesCallback = useCallback(() => {
    if (storyRef.current && articleRef.current) {
      // console.log({ storyRef: storyRef.current });
      // debugger;
      if (state && state.value && state.value[fse.idle]) {
        const substate = state.value[fse.idle];
        const { mediaBellow } = state.context;

        // console.log({ substate, mediaBellow, storyRefCurr: storyRef.current });

        if (!mediaBellow) {
          if (substate === fseS.non_visible) {
            TweenMax.to(storyRef.current, {
              duration: 0.2,
              ease: Power2.easeIn,
              width: "0vw",
              height: "100%",
              // delay: 0.4,
            });
          }

          if (substate !== fseS.non_visible) {
            TweenMax.to(storyRef.current, {
              duration: 0.2,
              ease: Power2.easeIn,
              width: "34vw",
              height: "100%",
              // delay: 0.4,
            });

            TweenMax.fromTo(
              articleRef.current,
              {
                duration: 0.3,
                ease: Quint.easeOut,
                opacity: 0,
                translateX: "-100%",
              },
              {
                opacity: 1,
                translateX: "0%",
              }
            );
          }

          return;
        }

        // RELATED TO mediaBellow
        // SETTING BECAUSE OF SCREEN SIZES
        TweenMax.set(storyRef.current, {
          width: "100%",
        });
        // -------------------------------
        // -------------------------------

        if (substate === fseS.partial) {
          // translate Y -----------------------
          TweenMax.to(storyRef.current, {
            duration: 0.4,
            translateY: 0,
            ease: Power2.easeIn,
          });
          // ----------------------------------
          // ----------------------------------
          // ------- height     ARTICLE
          /* TweenMax.set(articleRef.current, {
            height: 0,
          }); */
          //  ---------------------------------
          //  ---------------------------------
          //  ---------------------------------
          TweenMax.fromTo(
            storyRef.current,
            {
              duration: 0.3,
              ease: Power4.easeIn,
              height: storyHeightMax,
            },
            {
              height: storyHeightMin,
            }
          );

          // ---- article opacity (has no visual effect (no op))--------
          TweenMax.fromTo(
            articleRef.current,
            {
              duration: 0.3,
              ease: Quint.easeOut,
              opacity: 1,
              translateX: "0%",
            },
            {
              opacity: 0,
              translateX: "-100%",
            }
          );
        }

        if (substate === fseS.maximal) {
          // translate Y ---------------------------
          TweenMax.to(storyRef.current, {
            duration: 0.4,
            translateY: 0,
            ease: Power2.easeIn,
          });
          // ---------------------------------------
          // ---------------------------------------
          // ------- height     ARTICLE
          /* TweenMax.set(articleRef.current, {
            height: "70vh",
          }); */
          //  ---------------------------------
          //  ---------------------------------
          //  ---------------------------------
          TweenMax.fromTo(
            storyRef.current,
            {
              height: storyHeightMin,
              duration: 0.2,
              ease: Power4.easeIn,
            },
            {
              height: storyHeightMax,
            }
          );
          // --------------- atricle opacity (has no visual effect (no op))------------------
          TweenMax.fromTo(
            articleRef.current,
            {
              duration: 0.3,
              ease: Quint.easeOut,
              opacity: 0,
              translateX: "-100%",
            },
            {
              opacity: 1,
              translateX: "0%",
            }
          );
        }

        if (substate === fseS.non_visible) {
          // translate Y ---------------------
          TweenMax.fromTo(
            storyRef.current,
            {
              duration: 0.1,
              translateY: "0vh",
              ease: Power2.easeIn,
            },
            {
              translateY: "-80vh",
            }
          );
          // --------------- atricle opacity (has no visual effect (no op))------------------
          TweenMax.fromTo(
            articleRef.current,
            {
              duration: 0.3,
              ease: Quint.easeOut,
              opacity: 1,
              translateX: "0%",
            },
            {
              opacity: 0,
              translateX: "105%",
            }
          );
        }
      }
    }
  }, [storyRef, articleRef, state]);

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

  useEffect(() => {
    if (articleRef.current) {
      /* articleRef.current.scrollTo({
        top: 0,
      }); */

      // articleRef.current.scrollTop = 0;

      TweenMax.to(articleRef.current, {
        duration: 0.4,
        ease: Power1.easeIn,
        scrollTop: 0,
      });
    }
  }, [articleRef, state]);

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
        height: fit-content;
        background-color: rgba(98, 67, 136, 0.788);
        background-image: radial-gradient(
          circle farthest-corner at -4% -12.9%,
          rgba(74, 98, 110, 0.78) 0.3%,
          rgba(30, 33, 48, 0.8) 90.2%
        );
        color: rgb(228, 186, 200);
        text-shadow: 0.5px 0.8px 0.5px #852b76;
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
          height: 26vh;
          /* -------- -------- SETUP -------- -------- */
          transform: translateY(0vh);
          /* -------- */

          & .content {
            & article {
              padding-right: 14px;
            }
          }
        }

        &.above {
          /* width: 36vw; */
          width: 0vw;
          height: 100%;
          & .content {
            height: 100%;
            padding-bottom: 18px;

            & article {
              height: 95vh;
              overflow-y: auto;
              border: pink solid 0px;
              box-sizing: content-box;

              padding: 28px;
              padding-top: 0px;
              padding-bottom: 0px;
              margin-bottom: 8px;
            }
          }
        }

        /* -------- -------- -------- -------- -------- */

        & .content {
          border: orange solid 0px;
          /* text-overflow: ellipsis; */

          overflow: hidden;

          display: flex;
          flex-direction: column;

          box-sizing: border-box;

          margin: 8px;
          height: 89%;

          & h1 {
            text-align: center;
            user-select: none;
            /*  */
            box-sizing: border-box;
            height: ${storyHeaderHeight};
            margin: ${storyHeaderMargin};
            border: pink solid 0px;
          }

          & article {
            border: tomato solid 0px;
            overflow-y: auto;
            user-select: none;

            margin: 8px;
            margin-top: 2px;

            /* --------- SCROOLLBAR STYLING --------- */
            /* ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */
            &::-webkit-scrollbar {
              width: 12px;
            }

            scrollbar-color: crimson tomato;
            scrollbar-width: thin;

            &::-webkit-scrollbar-track {
              background-color: violet;
              border-radius: 6px;
            }

            &::-webkit-scrollbar-thumb {
              background-color: blanchedalmond;
              border-radius: 6px;
              border: #b13d6d solid 1px;
            }

            /* &::-webkit-scrollbar-button {
              background-color: red;
              width: 2px;
            }
            */
            /* ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */
            /*      ------------------------------    */
          }
        }
      `}
    >
      <div className="content">
        <h1>{headingStory(major)}</h1>
        <PreviewStory />
        <article ref={articleRef} className="story-article">
          {major === fsS.aboutme && <MyImage />}
          {storyMajorText(major, "")}
        </article>
      </div>
      <UpDownButton />
    </section>
  );
};

export default Story;
