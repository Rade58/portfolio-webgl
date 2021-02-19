import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.aboutmepresent,
  title: "About Me",
  type: T.document,

  fields: [
    { name: "major", title: "major", type: T.string },
    { name: "title", title: "Title", type: T.string },
    { name: "previewText", title: "Preview Text", type: T.string },
    { name: "bogati", title: "Bogati Tekst", type: M.bogatiTekst },
    {
      name: "myImage",
      title: "My Image",
      type: T.image,
      options: {
        // MISLIM DA CE OVO OMOGUCITI TRANSFORMACIJU SLIKE U KRUG
        hotspot: true,
      },
    },
    // ZANIMLJIVO: KREIRAO SAM FIELD ZA NIZ REFERENCI (AKO TE ZANIMA KAKO IZGLEDA REFERENCA ZA SINGLE DOCUMENT, POGLEDAJ DEFINICIJUU story KOLEKCIJE)
    {
      name: "devSvgs",
      title: "Developer Svgs",
      type: T.array,
      of: [
        {
          type: T.reference,
          to: { type: M.devsvg },
          // weak: true,
        },
      ],
    },
    {
      name: "otherDevSvgs",
      title: "Other Developer Icons",
      type: T.array,
      of: [
        {
          type: T.reference,
          to: {
            type: M.devsvg,
          },
        },
      ],
    },
    {
      name: "iconColor",
      title: "Color For Common Icons",
      type: T.reference,
      to: {
        type: M.iconcolor,
      },
    },
  ],
};
