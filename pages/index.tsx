/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import {
  FunctionComponent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const finiteStateElem = useRef<HTMLDivElement>(null);
  const majorStateElem = useRef<HTMLDivElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const forwardButton = useRef<HTMLButtonElement>(null);

  const [ihaveBackButton, setIhaveBackbutton] = useState<boolean>(false);
  const [ihaveForwardButton, setIhaveForwardbutton] = useState<boolean>(false);

  useEffect(() => {
    if (!majorStateHolderRef.current || !finiteStateElem.current) {
      majorStateHolderRef.current = document.querySelector(
        "div.major_state_holder"
      );

      const config = { attributes: true };

      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes") {
            console.log(majorStateHolderRef.current.dataset.finiteState);
            finiteStateElem.current.innerHTML =
              majorStateHolderRef.current.dataset.finiteState;
            majorStateElem.current.textContent =
              majorStateHolderRef.current.dataset.majorState;
          }
        }
      });

      observer.observe(majorStateHolderRef.current, config);
    }

    if (!backButton.current || !forwardButton.current) {
      // if (majorStateHolderRef.current) {
      backButton.current = document.querySelector(
        "section.controls-container button:nth-of-type(1)"
      );
      forwardButton.current = document.querySelector(
        "section.controls-container button:nth-of-type(2)"
      );

      if (backButton.current) setIhaveBackbutton(true);
      if (forwardButton.current) setIhaveForwardbutton(true);

      console.log({ backButton, forwardButton });
      // }
    }
  }, [majorStateHolderRef, finiteStateElem, backButton, forwardButton]);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: htmlContentString }}></div>
      <div
        style={{
          border: "crimson solid 2px",
          position: "fixed",
          top: "0",
          bottom: "0",
          width: "100vw",
          overflowY: "scroll",
        }}
      >
        <section ref={finiteStateElem}>8</section>
        <section ref={majorStateElem}>8</section>
        {ihaveBackButton && (
          <svg
            tabIndex={0}
            onClick={() => {
              console.log("click back");
              backButton.current.dispatchEvent(new Event("click"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                backButton.current.dispatchEvent(new Event("click"));
              }
            }}
            /* NO NEED FOR px ON width AND height */
            width="200"
            height="120"
            aria-labelledby="go_back"
            id="svg"
            role="button" /*"presentation"*/ /* or role="imge"*/
            lang="en"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 380 210"
          >
            <title id="go_back">Your Title Goes here</title>
            <rect width="200" height="180" x="8" y="8" fill="crimson" />
          </svg>
        )}
        {ihaveForwardButton && (
          <svg
            tabIndex={0}
            onClick={() => {
              console.log("click forward");
              forwardButton.current.dispatchEvent(new Event("click"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                forwardButton.current.dispatchEvent(new Event("click"));
              }
            }}
            /* NO NEED FOR px ON width AND height */
            width="200"
            height="120"
            aria-labelledby="go_forward"
            id="svg"
            role="button" /*"presentation"*/ /* or role="imge"*/
            lang="en"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 380 210"
          >
            <title id="go_forward">Your Title Goes here</title>
            <rect width="200" height="180" x="8" y="8" fill="crimson" />
          </svg>
        )}

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
