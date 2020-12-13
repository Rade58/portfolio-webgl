/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment } from "react";
import Other from "../components/Other";
import OtherSec from "../components/OtherSec";
import Sketch from "../components/sketch/Sketch";

import fs from "fs";
import path from "path";

const Index: FunctionComponent<{
  htmlContentString: string;
}> = ({ htmlContentString }) => {
  // console.log({ htmlContentString });

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: htmlContentString }}></div>
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
      htmlContentString,
    },
  };
}

export default Index;
