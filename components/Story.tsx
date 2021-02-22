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

import { TweenMax, Power2, Power4, Power1, Quint, Elastic, Bounce } from "gsap";

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

// story stuff
import AboutMe from "./story/AboutMe";
import Projects from "./story/Projects";
import Contact from "./story/Contact";
import Blog from "./story/Blog";
//
import HeadingStory from "./HeadingStory";
//

import BlockContent from "@sanity/block-content-to-react";

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

// SERIALIZERS
import serializers from "./sanity_serializers";
//

import { storyThreshold } from "../breakpoints";

import { SanityDataI } from "../sanity/data_types";

interface PropsStoryI {
  data: SanityDataI;
}

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const Story: FunctionComponent<PropsStoryI> = ({ data }) => {
  // STATE KOJI CE OMOGUCITI SAMO FIRST LIDING DOWN OF STORY
  const [firstStoryAnim, setFirstStoryAnim] = useState<boolean>(true);
  //

  //
  const storyRef = createRef<HTMLElement>();
  // const articleRef = createRef<HTMLElement>();

  const aboutMeArticleRef = createRef<HTMLElement>();
  const contactArticleRef = createRef<HTMLElement>();
  const projectsArticleRef = createRef<HTMLElement>();
  const blogArticleRef = createRef<HTMLElement>();

  const articleRefs = {
    [fsS.aboutme]: aboutMeArticleRef,
    [fsS.contact]: contactArticleRef,
    [fsS.projects]: projectsArticleRef,
    [fsS.blog]: blogArticleRef,
  };

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
    if (
      storyRef.current &&
      aboutMeArticleRef.current &&
      contactArticleRef.current &&
      projectsArticleRef.current &&
      blogArticleRef.current
    ) {
      // console.log({ callback: "CALLBACK EXECUTED" });
      // console.log({ storyRef: storyRef.current });
      // debugger;

      if (state && state.value && state.value[fse.idle]) {
        const substate = state.value[fse.idle];
        const { mediaBellow } = state.context;

        // console.log({ substate, mediaBellow, storyRefCurr: storyRef.current });

        if (!mediaBellow) {
          if (firstStoryAnim) {
            console.log("FIRST STORY ANIMATION");

            TweenMax.fromTo(
              storyRef.current,
              {
                duration: 2,
                translateY: "-120%",
                ease: Elastic.easeOut,
              },
              {
                translateY: "0%",
              }
            );

            setFirstStoryAnim(false);
            return;
          }

          //
          /*  if (
            state.event.type !== EEs.ARROW_UP_PUSHED &&
            state.event.type !== EEs.ARROW_UP_TRANS
          ) { */
          if (substate === fseS.non_visible) {
            TweenMax.fromTo(
              articleRefs[major].current,
              {
                duration: 0.3,
                ease: Power4.easeOut,
                opacity: 1,
                translateX: "0%",
              },
              {
                opacity: 0,
                translateX: "-200%",
              }
            );
            TweenMax.to(storyRef.current, {
              duration: 0.4,
              ease: Power2.easeIn,
              width: "0vw",
              height: "100%",
              // delay: 0.4,
            });
          }

          if (substate !== fseS.non_visible) {
            TweenMax.set(articleRefs[major].current, {
              opacity: 0,
              translateX: "-400%",
            });

            TweenMax.to(storyRef.current, {
              delay: 0.4,
              duration: 0.8,
              ease: Power4.easeOut,
              width: "38vw",
              height: "100%",
              // delay: 0.4,
            }).then(() => {
              //
              // console.log(articleRefs[major].current);

              TweenMax.fromTo(
                articleRefs[major].current,
                {
                  duration: 0.3,
                  ease: Bounce.easeOut,
                  opacity: 0,
                  translateX: "-200%",
                },
                {
                  opacity: 1,
                  translateX: "0%",
                }
              );
            });
            // debugger;
          }
          // }

          return;
        }

        // RELATED TO mediaBellow
        // SETTING BECAUSE OF SCREEN SIZES
        if (
          state.event.type !== EEs.ARROW_UP_PUSHED &&
          state.event.type !== EEs.ARROW_UP_TRANS
        ) {
          TweenMax.set(storyRef.current, {
            width: "100%",
          });
        }
        // -------------------------------
        // -------------------------------

        if (firstStoryAnim) {
          console.log("FIRST STORY ANIMATION");

          TweenMax.fromTo(
            storyRef.current,
            {
              duration: 2,
              translateY: "-120%",
              ease: Elastic.easeOut,
            },
            {
              translateY: "0%",
            }
          );

          setFirstStoryAnim(false);
          return;
        }

        if (substate === fseS.partial) {
          articleRefs[major].current.scrollTop = 0;
          // translate Y -----------------------
          TweenMax.to(storyRef.current, {
            duration: 0.8,
            translateY: "0%",
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
            articleRefs[major].current,
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
          // -----------________----------_____________
          // -----------________----------_____________
          // console.log(articleRefs[major].current);
          /* articleRefs[major].current.scrollTop = 0;
          articleRefs[major].current.focus(); */

          // -----------________----------_____________
          // -----------________----------_____________

          if (
            (state.event.type === EEs.ARROW_UP_PUSHED &&
              state.context.arrowUpPushedCount < 2) ||
            (state.event.type === EEs.ARROW_UP_TRANS &&
              state.context.arrowUpPushedCount < 2)
          ) {
            // console.log("SOMETHING -->", state.event.type);
            return;
          }

          // -----------________----------_____________
          // -----------________----------_____________

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
          // articleRefs[major].current.scrollTop = -20;
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
            articleRefs[major].current,
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
          ).then(() => {
            if (articleRefs[major] && articleRefs[major].current) {
              // articleRefs[major].current.scrollTop = -20;
              articleRefs[major].current.focus();
              // articleRefs[major].current.scrollTop = -20;

              TweenMax.to(articleRefs[major].current, {
                duration: 0.48,
                ease: Power1.easeOut,
                scrollTop: 0,
              });
            }
          });

          /* articleRefs[major].current.scrollTop = 0;
          articleRefs[major].current.focus(); */
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
            articleRefs[major].current,
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
  }, [
    storyRef,
    aboutMeArticleRef,
    contactArticleRef,
    projectsArticleRef,
    blogArticleRef,
    state,
    firstStoryAnim,
    setFirstStoryAnim,
  ]);

  useEffect(() => {
    if (
      state.event.type === EE.DISABLE_OUTLINE ||
      state.event.type === EE.ENABLE_OUTLINE
    ) {
      return;
    }

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
    // debugger;
    if (articleRefs[major] && articleRefs[major].current) {
      /* articleRef.current.scrollTo({
        top: 0,
      }); */

      // articleRef.current.scrollTop = 0;

      if (
        state.event.type !== EEs.ARROW_UP_PUSHED &&
        state.event.type !== EEs.ARROW_UP_TRANS
      ) {
        TweenMax.to(articleRefs[major].current, {
          duration: 0.2,
          ease: Power1.easeIn,
          scrollTop: 0,
        });
      }
    }
  }, [
    aboutMeArticleRef,
    contactArticleRef,
    projectsArticleRef,
    blogArticleRef,
    state,
  ]);

  // ---------------- THRESHOLDS ----------------

  const [
    storyThresholdIsBelllow,
    setStoryThresholdIsBellow,
  ] = useState<boolean>(false);

  const resizeCallback = useCallback(() => {
    if (storyRef.current) {
      const story = storyRef.current;

      if (story && story instanceof HTMLElement) {
        // console.log({ story });

        const rect = story.getBoundingClientRect();

        if (rect.width < storyThreshold) {
          setStoryThresholdIsBellow(true);
        } else {
          setStoryThresholdIsBellow(false);
        }
      }
    }
  }, [storyRef]);

  useEffect(() => {
    if (storyRef.current) {
      window.addEventListener("resize", resizeCallback);
    }
  }, [resizeCallback]);

  useEffect(
    () => () => {
      window.removeEventListener("resize", resizeCallback);
      console.log("UNMOUNTING");
    },
    []
  );

  useEffect(() => {
    const story = storyRef.current;

    if (story) {
      //
      if (story && story instanceof HTMLElement) {
        const rect = story.getBoundingClientRect();

        if (rect.width < storyThreshold) {
          setStoryThresholdIsBellow(true);
        } else {
          setStoryThresholdIsBellow(false);
        }
      }
    }
  }, [storyRef]);

  // console.log({ storyThresholdIsBelllow });

  // --------------------------------------------------

  if (!major || major === "undefined") {
    return null;
  }

  const currIndex: number = MAJOR_FINITE_STATES_ARRAY.indexOf(major);

  const nextIndex: number =
    currIndex + 1 > MAJOR_ARR_LENGTH - 1 ? 0 : currIndex + 1;
  const prevIndex: number =
    currIndex - 1 < 0 ? MAJOR_ARR_LENGTH - 1 : currIndex - 1;

  // ----

  const aboveSizes = ["1400px", "1300px", "1000px"];

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

        /* ---- bottom and right box-shadow (PROBAJ DA POPRAVIS OVO DA IZGLEDA BOLJE
        (ALI IMAJ NA UMU DA STO JE VISE SHADOW LAYER-A TO CES VISE IMATI PERFORMANCE PROBLEMA N STRANICI)) */
        box-shadow: 0.4px 0.8px 0.8px 0.4px rgba(17, 11, 29, 0.137);
        /* FOR MATCH MEDIA (MEDIA QUERIES) */

        &.bellow {
          width: 100%;
          height: 26vh;
          /* -------- -------- SETUP -------- -------- */
          transform: translateY(0vh);
          /* -------- */

          & h1 {
            margin: ${storyHeaderMargin};
            border: pink solid 0px;
          }

          & .content {
            /* --------------------------------------- */
            position: relative;
            left: -8px;
            width: 100%;

            & article {
              padding-left: 18px;
              padding-right: 14px;

              /* position: ; */
            }
          }
        }

        &.above {
          max-width: 600px;
          /* width: 36vw; */
          height: 100%;

          & h1 {
            display: flex;
            flex-wrap: nowrap;
            border: pink solid 0px;
            justify-content: center;
            width: max-content;
            margin: ${storyHeaderMargin} auto;
          }

          & .content {
            border: crimson solid 0px;
            height: 100%;
            padding-bottom: 18px;
            padding-left: 16px;

            /* --------------  direction stuff -------------- */
            /* ----------------------------------------------- */
            & > article.story-article {
              direction: rtl;

              border: pink solid 1px;
              /* padding-right: 18px; */

              & > * {
                direction: ltr;
                margin-right: 8px;
              }

              & div[class^="devicon"] {
                justify-content: flex-end;
                margin-left: 8px;
                margin-right: auto;
              }
            }

            /* ----------------------------------------------- */
            /* ----------------------------------------------- */

            position: relative;
            left: -3.8px;
            width: 100%;

            & article {
              width: 96.8%;

              @media (max-width: ${aboveSizes[0]}) {
                width: 96%;
              }
              @media (max-width: ${aboveSizes[1]}) {
                width: 95.8%;
              }
              @media (max-width: ${aboveSizes[2]}) {
                width: 95%;
              }

              height: 95vh;
              overflow-y: auto;
              border: pink solid 0px;
              box-sizing: content-box;

              position: relative;
              left: -12px;

              padding-right: 8px;
              padding-top: 0px;
              padding-bottom: 0px;
              margin-bottom: 8px;
              margin-top: 0px;
              padding-left: 18px;
            }
          }
        }

        /* -------- -------- -------- -------- -------- */

        & .content {
          border: orange solid 0px;
          /* text-overflow: ellipsis; */

          overflow: hidden;

          display: flex;
          flex-wrap: nowrap;
          flex-direction: column;
          justify-content: flex-start;

          align-content: flex-start;

          & > * {
            flex-grow: 1;
          }

          box-sizing: border-box;

          /* margin: 8px; */
          height: 88.8%;

          & h1 {
            text-align: center;
            user-select: none;
            /*  */
            box-sizing: border-box;
            height: ${storyHeaderHeight};
            /* margin: ${storyHeaderMargin}; */
            /* border: pink solid 0px; */
          }

          & article {
            border: tomato solid 0px;
            overflow-y: auto;
            overflow-x: hidden;
            user-select: none;

            height: fit-content;

            /* margin: 8px; */
            padding-left: 8px;
            padding-right: 2px;
            padding-bottom: 12px;

            margin-top: 0px;

            margin-bottom: 0px;

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
        {/* <h1>{headingStory(major)}</h1> */}
        <HeadingStory data={data} currentMajor={major} />
        <PreviewStory data={data} />
        {/* <article ref={articleRef} className="story-article">
          {major === fsS.aboutme && <MyImage />}
          {storyMajorText(major, "")}
        </article> */}
        {/* ---------------------------------------------- */}
        <AboutMe
          data={data[fsS.aboutme]}
          aboutMeArticleRef={aboutMeArticleRef}
        />
        {/* ---------------------------------------------- */}
        <Projects
          storyIsBellow={storyThresholdIsBelllow}
          data={data[fsS.projects]}
          projectsArticleRef={projectsArticleRef}
        />
        <Contact
          data={data[fsS.contact]}
          contactArticleRef={contactArticleRef}
        />
        <Blog data={data[fsS.blog]} blogArticleRef={blogArticleRef} />
        {/* ---------------------------------------------- */}
        {/* KORISTIM SAMO DA BIH TESTIRAO */}
        {/* KASNIJE CE DATA BITI BRANCHED OUT ZA SVAKU OD GORNJIH KOMPONENTI */}
        {/* <BlockContent
          blocks={data[0].bogati}
          dataset="production"
          projectId="4mpb3bwc"
          serializers={serializers}
        /> */}
        {/* --------------------------------------------- */}
        {/* --------------------------------------------- */}
      </div>
      <UpDownButton />
    </section>
  );
};

export default Story;
