/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment, useEffect, useRef } from "react";
import Other from "../components/Other";
import OtherSec from "../components/OtherSec";
import Sketch from "../components/sketch/Sketch";

import {
  MAJOR_FINITE_STATES_ARRAY,
  fse,
} from "../sketch/machine/anim_state_machine";

import fs from "fs";
import path from "path";

import DOMPurify from "dompurify";

const Index: FunctionComponent<{
  htmlContentString: string;
}> = ({ htmlContentString }) => {
  // console.log({ htmlContentString });

  const majorStateHolderRef = useRef<HTMLDivElement>(null);
  const finiteStatElem = useRef<HTMLDivElement>(null);
  const majorStateElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!majorStateHolderRef.current) {
      majorStateHolderRef.current = document.querySelector(
        "div.major_state_holder"
      );

      const config = { attributes: true };

      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes") {
            console.log(majorStateHolderRef.current.dataset.finiteState);
            finiteStatElem.current.innerHTML =
              majorStateHolderRef.current.dataset.finiteState;
            majorStateElem.current.textContent =
              majorStateHolderRef.current.dataset.majorState;
          }
        }
      });

      observer.observe(majorStateHolderRef.current, config);
    }
  }, [majorStateHolderRef]);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: htmlContentString }}></div>
      <div
        style={{
          border: "crimson solid 2px",
          position: "fixed",
          top: "20vh",
          bottom: "0vh",
          overflowY: "scroll",
        }}
      >
        <section ref={finiteStatElem}>8</section>
        <section ref={majorStateElem}>8</section>
        <svg
          /* NO NEED FOR px ON width AND height */
          width=""
          height=""
          aria-labelledby="your title id goes here"
          id="svg"
          role="presentation" /* or role="imge"*/
          lang="en"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 380 210"
        >
          <title id="reference this id by aria-labelledby">
            Your Title Goes here
          </title>
          <rect width="200" height="180" x="8" y="8" />
        </svg>

        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum</div>
      </div>
      {/* Welcome */}
      {/* <Sketch /> */}
      {/* <Other /> */}
      {/* <OtherSec /> */}
    </Fragment>
  );
};

export function getStaticProps() {
  const htmlPath = path.resolve(process.cwd(), "./👽RadeDev🦉.html");

  console.log({ htmlPath });

  const htmlContent = fs.readFileSync(htmlPath);
  const htmlContentString = htmlContent.toString("utf-8");

  return {
    props: {
      // blah: 1,
      htmlContentString /*: htmlCleanContentString*/,
    },
  };
}

export default Index;
