/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment } from "react";
import Other from "../components/Other";
import OtherSec from "../components/OtherSec";
import Sketch from "../components/sketch/Sketch";

import fs from "fs";
import path from "path";

import DOMPurify from "dompurify";

const Index: FunctionComponent<{
  htmlContentString: string;
}> = ({ htmlContentString }) => {
  // console.log({ htmlContentString });

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
