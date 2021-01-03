/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useEffect, useRef } from "react";
import { css } from "@emotion/core";
import gsap, { TweenMax, TimelineMax, TimelineLite, Sine, Circ } from "gsap";

const ComponentName: FunctionComponent = () => {
  const pathNodeListRef = useRef<NodeListOf<SVGPathElement>>(null);

  useEffect(() => {
    if (!pathNodeListRef.current) {
      pathNodeListRef.current = document.querySelectorAll(
        ".svg_text_holder path"
      );

      const tl = new TimelineMax();

      tl.to(pathNodeListRef.current, {
        duration: 0.1,
        stagger: 0.04,
        translateY: gsap.utils.wrapYoyo([8, 20]),
        ease: Sine.easeIn,
        // repeat: 2,
        reversed: true,
      });
      tl.to(pathNodeListRef.current, {
        duration: 0.1,
        stagger: 0.04,
        translateY: gsap.utils.wrapYoyo([20, 8]),
        ease: Sine.easeIn,
        // repeat: 2,
        reversed: false,
      });
      tl.to(pathNodeListRef.current, {
        duration: 0.1,
        stagger: 0.04,
        translateY: gsap.utils.wrapYoyo([20]),
        ease: Sine.easeIn,
        reversed: true,
      });

      /* tl.to(pathNodeListRef.current, {
        duration: 0.1,
        translateX: 800,
        stagger: 0.06,
        ease: Circ.easeIn,
        reversed: true,
      }); */

      console.log(pathNodeListRef.current);
    }
  }, [pathNodeListRef]);

  // SVGPathElement
  return (
    <div
      className="svg_text_holder"
      css={css`
        box-sizing: border-box;
        border: crimson 1px solid;
        margin: 0px 0px;
        width: 100%;

        & svg {
          /* transform-box: fill-box; */
          & g {
            & path {
              transform-origin: left bottom;
              /* transform-origin: 25px 25px; */
              transform: translateY(20px);
            }
          }
        }
      `}
    >
      <svg
        /* NO NEED FOR px ON width AND height */
        width="100%"
        // height="auto"
        textLength="auto"
        aria-labelledby="some_text"
        id="svg"
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 488 80"
      >
        <title id="some_text">Hi it{"'"}s a me</title>
        <g id="Frame 1">
          <path
            id="H"
            d="M34.8281 32H31.3828V23.1543H22.4824V32H19.0234V12.0938H22.4824V20.3789H31.3828V12.0938H34.8281V32Z"
            fill="black"
          />
          <path
            id="I"
            d="M48.6738 32H45.2285V12.0938H48.6738V32Z"
            fill="black"
          />
          <path
            id="M"
            d="M93.5078 13.0938L99.25 28.3516L104.979 13.0938H109.449V33H106.004V26.4375L106.346 17.6602L100.467 33H97.9922L92.127 17.6738L92.4688 26.4375V33H89.0234V13.0938H93.5078Z"
            fill="black"
          />
          <path
            id="Y"
            d="M123.518 22.5273L128.098 13.0938H131.926L125.254 25.6719V33H121.781V25.6719L115.096 13.0938H118.938L123.518 22.5273Z"
            fill="black"
          />
          <path
            id="N"
            d="M185.814 33H182.355L173.482 18.877V33H170.023V13.0938H173.482L182.383 27.2715V13.0938H185.814V33Z"
            fill="black"
          />
          <path
            id="A"
            d="M202.166 28.3652H194.455L192.842 33H189.246L196.766 13.0938H199.869L207.402 33H203.793L202.166 28.3652ZM195.426 25.5762H201.195L198.311 17.3184L195.426 25.5762Z"
            fill="black"
          />
          <path
            id="M_2"
            d="M219.508 13.0938L225.25 28.3516L230.979 13.0938H235.449V33H232.004V26.4375L232.346 17.6602L226.467 33H223.992L218.127 17.6738L218.469 26.4375V33H215.023V13.0938H219.508Z"
            fill="black"
          />
          <path
            id="E"
            d="M257.658 24.1133H249.482V30.2383H259.039V33H246.023V13.0938H258.943V15.8828H249.482V21.3789H257.658V24.1133Z"
            fill="black"
          />
          <path
            id="I_2"
            d="M293.674 33H290.229V13.0938H293.674V33Z"
            fill="black"
          />
          <path
            id="S"
            d="M313.428 27.873C313.428 26.998 313.118 26.3236 312.498 25.8496C311.887 25.3757 310.78 24.8971 309.176 24.4141C307.572 23.931 306.296 23.3932 305.348 22.8008C303.534 21.6615 302.627 20.1758 302.627 18.3438C302.627 16.7396 303.279 15.418 304.582 14.3789C305.895 13.3398 307.594 12.8203 309.682 12.8203C311.067 12.8203 312.302 13.0755 313.387 13.5859C314.471 14.0964 315.324 14.8255 315.943 15.7734C316.563 16.7122 316.873 17.7559 316.873 18.9043H313.428C313.428 17.8652 313.1 17.054 312.443 16.4707C311.796 15.8783 310.867 15.582 309.654 15.582C308.524 15.582 307.645 15.8236 307.016 16.3066C306.396 16.7897 306.086 17.4642 306.086 18.3301C306.086 19.0592 306.423 19.6699 307.098 20.1621C307.772 20.6452 308.884 21.1191 310.434 21.584C311.983 22.0397 313.227 22.5638 314.166 23.1562C315.105 23.7396 315.793 24.4141 316.23 25.1797C316.668 25.9362 316.887 26.8249 316.887 27.8457C316.887 29.5046 316.249 30.8262 314.973 31.8105C313.706 32.7858 311.983 33.2734 309.805 33.2734C308.365 33.2734 307.038 33.0091 305.826 32.4805C304.623 31.9427 303.684 31.2044 303.01 30.2656C302.344 29.3268 302.012 28.2331 302.012 26.9844H305.471C305.471 28.1146 305.844 28.9896 306.592 29.6094C307.339 30.2292 308.41 30.5391 309.805 30.5391C311.008 30.5391 311.91 30.2975 312.512 29.8145C313.122 29.3223 313.428 28.6751 313.428 27.873Z"
            fill="black"
          />
          <path
            id="R"
            d="M352.338 25.3301H348.482V33H345.023V13.0938H352.023C354.32 13.0938 356.093 13.6087 357.342 14.6387C358.59 15.6686 359.215 17.1589 359.215 19.1094C359.215 20.4401 358.891 21.5566 358.244 22.459C357.606 23.3522 356.713 24.0404 355.564 24.5234L360.035 32.8223V33H356.33L352.338 25.3301ZM348.482 22.5547H352.037C353.204 22.5547 354.115 22.263 354.771 21.6797C355.428 21.0872 355.756 20.2806 355.756 19.2598C355.756 18.1934 355.451 17.3685 354.84 16.7852C354.238 16.2018 353.336 15.901 352.133 15.8828H348.482V22.5547Z"
            fill="black"
          />
          <path
            id="A_2"
            d="M384.166 28.3652H376.455L374.842 33H371.246L378.766 13.0938H381.869L389.402 33H385.793L384.166 28.3652ZM377.426 25.5762H383.195L380.311 17.3184L377.426 25.5762Z"
            fill="black"
          />
          <path
            id="D"
            d="M402.023 33V13.0938H407.902C409.661 13.0938 411.22 13.4857 412.578 14.2695C413.945 15.0534 415.003 16.1654 415.75 17.6055C416.497 19.0456 416.871 20.6953 416.871 22.5547V23.5527C416.871 25.4395 416.493 27.0983 415.736 28.5293C414.989 29.9603 413.918 31.0632 412.523 31.8379C411.138 32.6126 409.548 33 407.752 33H402.023ZM405.482 15.8828V30.2383H407.738C409.552 30.2383 410.942 29.6732 411.908 28.543C412.883 27.4036 413.38 25.7721 413.398 23.6484V22.541C413.398 20.3809 412.929 18.7311 411.99 17.5918C411.051 16.4525 409.689 15.8828 407.902 15.8828H405.482Z"
            fill="black"
          />
          <path
            id="E_2"
            d="M439.658 24.1133H431.482V30.2383H441.039V33H428.023V13.0938H440.943V15.8828H431.482V21.3789H439.658V24.1133Z"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
};

export default ComponentName;
