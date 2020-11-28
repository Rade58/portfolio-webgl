/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment } from "react";
import Other from "../src/components/Other";
import Sketch from "../src/components/sketch/Sketch";

const Index: FunctionComponent = () => {
  return (
    <Fragment>
      Welcome
      <Sketch />
      <Other />
    </Fragment>
  );
};

export default Index;
