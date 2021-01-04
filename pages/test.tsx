/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
// import { sketchService, EE } from "../state_machines/index_state_machine";

const TestPage: FunctionComponent = () => {
  return (
    <div>
      <button
        onClick={() => {
          // sketchService.send({ type: EE.TOGGLE });
        }}
      >
        toggle
      </button>
    </div>
  );
};

export default TestPage;
