export default {
  name: "aboutmepresent",
  title: "About Me",
  type: "document",

  fields: [
    { name: "major", title: "major", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "previewText", title: "Preview Text", type: "string" },
    { name: "bogati", title: "Bogati Tekst", type: "bogatiTekst" },
    {
      name: "myImage",
      title: "My Image",
      type: "image",
      options: {
        // MISLIM DA CE OVO OMOGUCITI TRANSFORMACIJU SLIKE U KRUG
        hotspot: true,
      },
    },
    // ZANIMLJIVO: KREIRAO SAM FIELD ZA NIZ REFERENCI
    {
      name: "devSvgs",
      title: "Developer Svgs",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "devsvg" },
          // weak: true,
        },
      ],
    },
  ],
};
