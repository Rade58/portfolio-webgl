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

import sanityClient from "../sanity/sanity_client";

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
    [majorFse.blog]: any;
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
  console.log({ data });

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
  const stories = await sanityClient.fetch(/* groq */ `*[_type == 'story']{
    // aboutme
    aboutme -> {
      title, previewText, bogati, major,
      myImage {
        asset -> {
          url
        }
      },
      devSvgs[] -> {
        title,
        devImage {
          asset -> {
            url
          }
        },
        isEmoji,
        emoji,
        wikiUrl,
        textDecorColor,
        additionalBracketText
      },

      otherDevSvgs[] -> {
        title,
        devImage {
          asset -> {
            url
          }
        },
        isEmoji,
        emoji,
        wikiUrl,
        textDecorColor,
        additionalBracketText
      }

    },
    // projects
    projects -> {
      title, previewText, bogati, major,
      github -> {
        url,
        icon {
          asset -> {
            url
          }
        }
      },
      projects[] -> {
        title,
        dateTime,
        description,
        emoji,
        projectType,
        link,
        tags,
        snapshot {
          asset -> {
            url
          }
        }
      }
    },
    // contact
    contact -> {
      title, previewText, bogati, major,
      socialIcons[] -> {
        name,
        url,
        socialImage {
          asset -> {
            url
          }
        }
      },
      // OVDE POKAZUJEM KAKO JE SVE MOGUCE PISATI KADA
      // SE QUERY-UJE REFERENCA
      // OVDE CU DOBITI CEO OBJEKAT (A DODAO SAM I ALIAS STO JE MANJE VAZNO
      // CISTO SAM PROVERIO DA LI ALIAS MOZE IMATI ISTO IME, I ON MOZE IMATI ISTO IME)
      // ISTO TAKO MOGAO SAM URADITI -> {  i ovde query-evati propertije koje zelim  }
      // U OVOM SLUCAJU JA CU IMATI SAMO JEDAN PROPERTI U OBJEKTU
      "iconColor": iconColor ->,
      // JA SAM IZNAD TREBAO URADITI SLEDECE STO SAM URADIO (NISAM SAMO JER TI POKAZUJEM STA MOZES)
      // OVDE ODMAH UZIMAM PROPERTI currentMail SA REFERENCE
      // I ZADAJEM GA ZA ALIAS KOJI SAM SMISLIO
      // TAKO DA SADA OVDE NEMEM OBJEKAT KOA VREDNOST
      // VREDNOST CE BITI STRING
      "myEmail": email -> currentMail

    },
    // blog
    blog -> {
      title, previewText, bogati, major,
      articles[] -> {
        title,
        date,
        link,
        tags
      }
    }
  }`);

  console.log(JSON.stringify({ stories }, null, 2));

  return {
    props: {
      // blah: 1,
      htmlContentString /*: htmlCleanContentString*/,
      imageString,
      data: stories[0],
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