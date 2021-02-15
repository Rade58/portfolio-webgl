/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { TweenMax, Sine, Elastic, Power2, Back, Power0 } from "gsap";

import {
  fse as fsS,
  MAJOR_FINITE_STATES_ARRAY,
} from "../sketch/middle_ground/major_states";

import { centralMajor } from "../content/";

import { useService } from "@xstate/react";
import { storyService, fse, EEs } from "../state_machines/story_machine";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const MajorShowers: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const { major, mediaBellow } = state.context;

  const prevRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLHeadingElement>(null);
  const currRef = useRef<HTMLHeadingElement>(null);
  // const currFiniteStateRef = useRef<fse | "undefined">("undefined");

  const [setupHappened, setSetupHappened] = useState<boolean>(false);

  const animationSetupCallback = useCallback(() => {
    // console.log("-----LOGZINGZINGZ-----");
    if (!setupHappened) {
      if (prevRef.current && nextRef.current && currRef.current) {
        // tween max setup
        // console.log("-----LOGZINGZINGZ-----");
        TweenMax.set(currRef.current, {
          translateY: "-150%",
          scale: 0,
        });

        // prev and next

        TweenMax.set(prevRef.current, {
          translateX: "-200%",
          translateY: -8.8,
          rotateZ: 8.8,
          perspective: "1px",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          translateZ: 0,

          // scale: 0,
        });

        TweenMax.set(nextRef.current, {
          translateX: "200%",
          translateY: 8.8,
          rotateZ: -8.8,
          perspective: "1px",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          translateZ: 0,

          // scale: 0,
        });

        // bouncing

        TweenMax.to(nextRef.current, {
          force3D: true,
          translateY: -8.8,
          rotateZ: 8.8,
          rotateX: -8.2,
          // translateX: "1%",
          // scaleX: 1.2,
          // scaleY: 1.2,
          // scaleZ: 0,
          yoyo: true,
          yoyoEase: Power2.easeInOut,
          repeat: -1,
          repeatDelay: 1,
          duration: 4,
          // stagger: 0.08,
          // reversed: true,
        });

        TweenMax.to(prevRef.current, {
          force3D: true,
          translateY: 8.8,
          rotateZ: -8.8,
          rotateX: 8.2,
          // translateX: "-1%",
          // scaleX: 1.2,
          // scaleY: 1.2,
          // scaleZ: 0,
          yoyo: true,
          yoyoEase: Power2.easeInOut,
          repeat: -1,
          repeatDelay: 1,
          duration: 4,
          // stagger: 0.08,
          // reversed: true,
        });

        // -------------------

        setSetupHappened(true);
      }
    }
  }, [prevRef.current, nextRef.current, currRef.current, setupHappened]);

  useEffect(() => {
    animationSetupCallback();
  }, [animationSetupCallback]);

  useEffect(() => {
    // console.log({ STATE_VALUE: state.value });
    if (prevRef.current && nextRef.current && currRef.current) {
      if (state && state.value) {
        // ZATO STO IMA NESTED STATES
        if (state.value === fse.idle || state.value[fse.idle]) {
          //
          // console.log("------ENTERED IDLE------");

          TweenMax.to(currRef.current, {
            translateY: "0%",
            scale: 1,
            duration: 0.4,
            ease: Elastic.easeOut,
          });

          TweenMax.to([prevRef.current, nextRef.current], {
            translateX: "0%",
            duration: 1.2,
            ease: Elastic.easeOut,
          });
        }

        if (state.value === fse.anim_active) {
          //
          // console.log("------ENTERED ANIM_ACTIVE------");

          TweenMax.to(currRef.current, {
            translateY: "-150%",
            scale: 0,
            duration: 0.4,
            ease: Power2.easeIn,
          });

          TweenMax.to(nextRef.current, {
            translateX: "650%",
            duration: 1.8,
            ease: Power2.easeOut,
          });
          TweenMax.to(prevRef.current, {
            translateX: "-650%",
            duration: 1.8,
            ease: Power2.easeOut,
          });
        }
      }
    }
  }, [state]);

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
      css={css`
        border: crimson solid 1px;
        position: fixed;
        top: 60vh;
        left: center;
        bottom: 68px;

        display: flex;
        flex-basis: fit-content;
        max-width: 100vw;
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: space-between;
        flex-wrap: wrap;

        overflow: hidden;

        padding-top: 28px;

        & h1 {
          /* margin-top: 68px; */
          /* cursor: pointer; */
          border: tomato inset 0px;
          font-size: 2.8rem;
          width: 100%;
          text-align: center;
          align-self: flex-start;
          justify-self: center;
          margin: 0px auto;
          user-select: none;

          text-decoration-line: underline;
          text-decoration-color: #ac4982;

          text-shadow: 2px 2px 2px rgb(158, 60, 98), -1px -1px 1px #a04871;

          color: #141922;

          &.bellow {
            &:hover {
              cursor: pointer;
              text-decoration-color: rgba(21, 23, 53, 0.582);

              color: #1b2442;
            }
          }
        }

        & .h4cont {
          border: crimson solid 1px;
          width: 180px;
          display: flex;

          justify-content: space-between;

          margin: 0 auto;

          & h4 {
            align-self: flex-end;
            border: pink solid 1px;
            width: fit-content;

            position: relative;
            bottom: -12px;

            font-size: 1.2rem;

            /* position: relative; */
            /* backface-visibility: hidden; */
            /* -webkit-font-smoothing: subpixel-antialiased; */

            /* &:hover {
            transform: translateY(10px) translateX(10px);
            } */

            text-shadow: -0.5px 0.5px 0 #ac4982, 0.5px 0.5px 0 #ac4982,
              0.5px -0.5px 0 #ac4982, -0.5px -0.5px 0 #ac4982;

            user-select: none;

            font-weight: 300;

            /* &:nth-of-type(1) {
              margin-left: 18px;
            }
            &:nth-of-type(2) {
              margin-right: 18px;
            } */

            /* &:first-of-type {
              left: 5%;
            }

            &:last-of-type {
              right: 5%;
            } */
          }
        }
      `}
    >
      {/* eslint-disable-next-line */}
      <h1
        className={`${mediaBellow ? "bellow" : ""}`}
        ref={currRef}
        onClick={(e) => {
          //
          if (mediaBellow) {
            send({ type: EEs.FULL_OPEN });
          }
        }}
        onKeyDown={(e) => {
          //
          if (e.key === "Enter") {
            //
            if (mediaBellow) {
              send({ type: EEs.FULL_OPEN });
            }
          }
        }}
      >
        {centralMajor(major)}
      </h1>
      <div className="h4cont">
        <h4 ref={prevRef}>
          {centralMajor(MAJOR_FINITE_STATES_ARRAY[prevIndex])}
        </h4>
        <h4 ref={nextRef}>
          {centralMajor(MAJOR_FINITE_STATES_ARRAY[nextIndex])}
        </h4>
      </div>
    </section>
  );
};

export default MajorShowers;
