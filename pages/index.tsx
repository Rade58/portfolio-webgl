/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment } from "react";
import Other from "../components/Other";
import OtherSec from "../components/OtherSec";
import Sketch from "../components/sketch/Sketch";

const Index: FunctionComponent = () => {
  return (
    <Fragment>
      Welcome
      <Sketch />
      <Other />
      <OtherSec />
    </Fragment>
  );
};

export default Index;
