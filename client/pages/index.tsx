/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, Fragment, useReducer } from "react";

import { GetStaticProps, GetServerSideProps } from "next";

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

// import sanityClient from "../sanity/sanity_client";

import { setup } from "../some_handlers";

/* import { appService } from "../state_machines/app_machine";
import animationMachineObserver, {
  config,
  majorStateHolder,
} from "../mutation_observer"; */

import { fse as majorFse } from "../sketch/middle_ground/major_states";

setup();

interface PagePropsI {
  data: {
    [majorFse.aboutme]: any;
    [majorFse.projects]: any;
    [majorFse.contact]: any;
    [majorFse.dashboard]: any;
  };
  htmlContentString: string;
  imageString: string;
}

const Portfolio: FunctionComponent<PagePropsI> = ({
  htmlContentString,
  imageString,
  data,
}) => {
  // console.log({ htmlContentString });
  // console.log({ data });

  const {
    Provider: AppContextProvider,
    appReducer,
    defaultState,
  } = createContextualState_$;

  const [reducedState, dispatchToReducer] = useReducer(
    appReducer,
    defaultState.reducedState,
  );

  return (
    <AppContextProvider
      value={{
        reducedState,
        dispatchToReducer,
      }}
    >
      <Fragment>
        <div
          className="danger"
          dangerouslySetInnerHTML={{ __html: htmlContentString }}
        ></div>
        <StartingModal imageData={imageString} />
        <LoadedAnimation />
        <ControlAnim />
        <Story data={data} />
      </Fragment>
    </AppContextProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

  // ZABORAVIO SI DA REFERENCIRAS U STUDIO-U SVE SVG-JEVE KA OREFERENCE U
  // About Me
  // ZA SVG-JEVE MI NE TREBA SLIKA ODREDJENIH DIMENZIJA
  // ZATO NISAM KORISTIO URL BUILDER, A I KAKO VIDIS PROVEZBAOO SAM
  // 'KOMPLIKOVANIJI' QUERY (MISLIM NA devSvgs QUERY KOJI JE NIZ REFERENCI)
  // const aboutMe = await sanityClient.fetch(/* groq */ `*[_type == "aboutmepresent"]{
  // title,
  // previewText,
  // bogati,
  // major,
  // myImage {
  // asset -> {
  // url
  // }
  // },
  // devSvgs[] -> {
  // title,
  // devImage {
  // asset -> {
  // url
  // }
  // }
  //
  // }
  //
  // }`);
  //
  // TOP LEVEL QUERY, KOJI TREBA DA UZME SVE MAJOR DOKUMANTE

  // console.log(JSON.stringify({ stories }, null, 2));

  return {
    props: {
      // blah: 1,
      htmlContentString /*: htmlCleanContentString*/,
      imageString,
      // data: stories[0],
    },
  };
};

/* export const getServerSideProps: GetServerSideProps<{ some: string }> = async (
  ctx
) => {
  ctx.res.writeHead(302, { Location: "/portfolio" });

  ctx.res.end();

  return {
    props: {
      some: "some string",
    },
  };
};
 */
export default Portfolio;
