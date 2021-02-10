export default {
  name: "blogpresent",
  title: "Blog",
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
  ],
};
