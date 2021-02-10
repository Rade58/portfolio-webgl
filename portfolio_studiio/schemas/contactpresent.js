export default {
  name: "contactpresent",
  title: "Contact",
  type: "document",
  fields: [
    { name: "major", title: "major", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "previewText", title: "Preview Text", type: "string" },
    { name: "bogati", title: "Bogati Tekst", type: "bogatiTekst" },
    {
      name: "socialIcons",
      title: "Social Icons",
      type: "array",

      of: [
        {
          type: "reference",
          to: {
            type: "socialsvg",
          },
        },
      ],
    },
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
