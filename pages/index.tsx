/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment, useReducer } from "react";

/* import {
  MAJOR_FINITE_STATES_ARRAY,
  fse,
} from "../sketch/machine/anim_state_machine";
 */
import { createContextualState_$ } from "../context_n_reducers/app_context";

import fs from "fs";
import path from "path";
import ControlAnim from "../components/ControlAnim";
import LoadedAnimation from "../components/LoadedAnimations";

// import DOMPurify from "dompurify";

/* import { appService } from "../state_machines/app_machine";
import animationMachineObserver, {
  config,
  majorStateHolder,
} from "../mutation_observer"; */

const Index: FunctionComponent<{
  htmlContentString: string;
}> = ({ htmlContentString }) => {
  // console.log({ htmlContentString });

  const {
    Provider: AppContextProvider,
    appReducer,
    defaultState,
  } = createContextualState_$;

  const [reducedState, dispatchToReducer] = useReducer(
    appReducer,
    defaultState.reducedState
  );

  return (
    <AppContextProvider
      value={{
        reducedState,
        dispatchToReducer,
      }}
    >
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html: htmlContentString }}></div>
        <LoadedAnimation />
        <ControlAnim />
      </Fragment>
    </AppContextProvider>
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
