export default {
  name: "projectpresent",
  title: "Project",
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
      of: { type: "githubinfo" },
    },
  ],
};
