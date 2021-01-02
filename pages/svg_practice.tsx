/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";

const AccesibleSvg: FunctionComponent = () => {
  return (
    <div style={{ border: "crimson solid 1px" }}>
      <svg
        /* NO NEED FOR px ON width AND height */
        width=""
        height=""
        aria-labelledby="some_text"
        id="svg"
        role="presentation" /* or role="imge"*/
        lang="en"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 380 210"
      >
        <title id="some_text">Your Title Goes here</title>
        <text x="20" y="50" fontFamily="Roboto">
          Roboto
        </text>
      </svg>
    </div>
  );
};

export default AccesibleSvg;
