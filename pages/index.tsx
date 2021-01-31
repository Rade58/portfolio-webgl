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
import StartingModal from "../components/StartingModal";
import Story from "../components/Story";

import sanityClient from "../sanity/sanity_client";

import { setup } from "../some_handlers";

// import DOMPurify from "dompurify";

/* import { appService } from "../state_machines/app_machine";
import animationMachineObserver, {
  config,
  majorStateHolder,
} from "../mutation_observer"; */

setup();

const Index: FunctionComponent<{
  htmlContentString: string;
  imageString: string;
  aboutMe: any;
}> = ({ htmlContentString, imageString, aboutMe }) => {
  // console.log({ htmlContentString });
  console.log({ aboutMe });

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
        <StartingModal imageData={imageString} />
        <LoadedAnimation />
        <ControlAnim />
        <Story data={aboutMe} />
      </Fragment>
    </AppContextProvider>
  );
};

export async function getStaticProps() {
  const htmlPath = path.resolve(process.cwd(), "./👽RadeDev🦉.html");

  // console.log({ htmlPath });

  const htmlContent = fs.readFileSync(htmlPath);
  const htmlContentString = htmlContent.toString("utf-8");

  // IMAGE
  const imagePath = path.resolve(process.cwd(), "./images/grid_image.png");
  const imageContent = fs.readFileSync(imagePath);
  const imageString = imageContent.toString("base64");
  // console.log({ imageString });

  // SANITY CLIENT
  // const sanityTestData = await sanityClient.fetch(/* groq */ `*[_type == 'post']{
  // title
  // }`);

  const aboutMe = await sanityClient.fetch(/* groq */ `*[_type == "aboutmepresent"]{
    title,
    previewText,
    devSvgs[] -> {title, devImage}

  }`);
  //

  console.log(JSON.stringify({ aboutMe }));

  return {
    props: {
      // blah: 1,
      htmlContentString /*: htmlCleanContentString*/,
      imageString,
      aboutMe,
    },
  };
}

export default Index;
