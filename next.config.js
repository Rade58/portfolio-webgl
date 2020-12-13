const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  /* PHASE_EXPORT,
  PHASE_PRODUCTION_SERVER, */
} = require("next/constants");

const dotenvLoad = require("dotenv-load");

const nextEnv = require("next-env");

// JA SAM OVDE VEC IMAO NESTO OD RANIJE, SAMO NAPOMINJEM (A TO MOZES I SAM VIDETI)

// MEDJUTIM SADA UVOZIM SLEDECE:
const withPlugins = require("next-compose-plugins");
const withReactSvg = require("next-react-svg"); // (UPRAVO CES OVIM POSTICI DA MOZES KORISTITI SVG KAO REACT COMPONENT)
const path = require("path");

// ------------------

dotenvLoad();

// DA SADA DEFINISEM SVU KONFIGURACIJU
// DEFINISAM USTVARI UPOTREBU SAMO JEDNOG PLUGIN-A

const svgReactPlugin = withReactSvg({
  // OVDE INCLUDE-UJEM FOLDER GDE CE BITI SVGS
  include: path.resolve(__dirname, "svgs"),

  // KADA BUDEM IMPORT-OVAO SVG-JEVE IZ OVOG FOLDERA, USTVARI
  // NECE SE IMPORTOVATI STRING (PATH ILI SVG)
  // VEC ONO STO UVEZEM BICE REACT KOMPONENTA, KOJU KADA UPOTREBIM, CE REAULTOVATI
  // U INLINE-OVANJU TOG SVG-JA
  // MOZDA MI TO MZOE KORISTITI KADA NA PRIMER NAPRAVIM NEKI MOJ SVG I ODLUCIM DA GA INLINE-UJEM U NEXT APLIKACIJI
});

// ----------------------------------

const envPlugin = nextEnv();

// module.exports = withPlugins([envPlugin, svgReactPlugin]);

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) console.log("Development");
  if (phase === PHASE_PRODUCTION_BUILD) console.log("Production");

  const newConfig = { ...defaultConfig };

  /* newConfig.webpack = (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [require.resolve("raw-loader"), require.resolve("glslify-loader")],
    });

    return config;
  };
 */
  return withPlugins([envPlugin, svgReactPlugin])(phase, {
    newConfig,
  });
};

// OVO DOLE SAM COMMENTOVAO OUT
// const withNextEnv = nextEnv();
// module.exports = withNextEnv();

// OVO MI JE BIL OCOMMENTED OUT I OD RANIJE
// EXPORTING OF A FUNCTION RETURNS WARNING, AS I EXPORTED EMPTY OBJECT

// TEST THIS IN SPARE TIME
/* module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) console.log("Development");
  if (phase === PHASE_PRODUCTION_BUILD) console.log("Production");
  //---------testing this--------------
  const withNextEnv = nextEnv(defaultConfig);
  //-------------------
  return withNextEnv();
  // return defaultConfig
};
 */
