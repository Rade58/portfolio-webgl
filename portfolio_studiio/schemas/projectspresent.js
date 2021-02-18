export default {
  name: "projectspresent",
  title: "Projects",
  type: "document",

  fields: [
    { name: "major", title: "major", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "previewText", title: "Preview Text", type: "string" },
    { name: "bogati", title: "Bogati Tekst", type: "bogatiTekst" },
    {
      name: "iconColor",
      title: "Color For Common Icons",
      type: "reference",
      to: {
        type: "iconcolor",
      },
    },
    {
      name: "github",
      title: "Github",
      type: "reference",
      to: { type: "githubinfo" },
    },
    // KROZ OVO CU DAKLE DA BIRAM LISTU PROJEKATA
    {
      name: "projects",
      title: "List Of Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "mockproject" },
        },
      ],
    },
  ],
};
