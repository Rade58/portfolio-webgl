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

import { useService } from "@xstate/react";
import { storyService, fse } from "../state_machines/story_machine";

const MAJOR_ARR_LENGTH = MAJOR_FINITE_STATES_ARRAY.length;

const MajorShowers: FunctionComponent = () => {
  const [state, send] = useService(storyService);

  const { major } = state.context;

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
          perspective: "1px",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          translateZ: 0,

          // scale: 0,
        });

        TweenMax.set(nextRef.current, {
          translateX: "200%",
          translateY: 8.8,
          perspective: "1px",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          translateZ: 0,

          // scale: 0,
        });

        // bouncing

        TweenMax.to(nextRef.current, {
          translateY: -8.8,
          scaleX: 1.2,
          scaleY: 1.2,
          yoyo: true,
          yoyoEase: Power0.easeInOut,
          repeat: -1,
          repeatDelay: 1,
          duration: 4,
          // stagger: 0.08,
          // reversed: true,
        });

        TweenMax.to(prevRef.current, {
          translateY: 8.8,
          scaleX: 1.2,
          scaleY: 1.2,
          yoyo: true,
          yoyoEase: Power0.easeInOut,
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
        if (state.value === fse.idle) {
          //
          // console.log("------ENTERED IDLE------");

          TweenMax.to(currRef.current, {
            translateY: "0%",
            scale: 1,
            duration: 0.4,
            ease: Elastic.easeIn,
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
            translateX: "150%",
            duration: 1.2,
            ease: Power2.easeOut,
          });
          TweenMax.to(prevRef.current, {
            translateX: "-150%",
            duration: 1.2,
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
      className="story"
      css={css`
        border: crimson solid 0px;
        position: fixed;
        top: 60vh;
        left: center;
        bottom: 68px;

        display: flex;
        flex-basis: 348px;
        max-width: 100vw;
        flex-grow: 1;
        flex-shrink: 1;
        justify-content: space-between;
        flex-wrap: wrap;

        overflow: hidden;

        & h1 {
          border: tomato inset 0px;
          font-size: 2.8rem;
          width: 100%;
          text-align: center;
          align-self: flex-start;
          justify-self: center;
          margin: 0px auto;
        }

        & h4 {
          align-self: flex-end;
          border: pink solid 0px;
          position: relative;
          /* backface-visibility: hidden; */
          /* -webkit-font-smoothing: subpixel-antialiased; */

          /* &:hover {
            transform: translateY(10px) translateX(10px);
          } */

          &:nth-of-type(1) {
            margin-left: 18px;
          }
          &:nth-of-type(2) {
            margin-right: 18px;
          }
        }
      `}
    >
      <h1 ref={currRef}>{major}</h1>
      <h4 ref={prevRef}>{MAJOR_FINITE_STATES_ARRAY[prevIndex]}</h4>
      <h4 ref={nextRef}>{MAJOR_FINITE_STATES_ARRAY[nextIndex]}</h4>
    </section>
  );
};

export default MajorShowers;
