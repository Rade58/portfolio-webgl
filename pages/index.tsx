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

  const textDisplayRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textDisplayRef.current) {
      textDisplayRef.current = document.querySelector("div.text_display");

      const config = { attributes: true };

      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes") {
            console.log(textDisplayRef.current.dataset.finiteState);
            sectionRef.current.innerHTML =
              textDisplayRef.current.dataset.finiteState;
          }
        }
      });

      observer.observe(textDisplayRef.current, config);
    }
  }, [textDisplayRef]);

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
        Some Text
        <section ref={sectionRef}>8</section>
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
