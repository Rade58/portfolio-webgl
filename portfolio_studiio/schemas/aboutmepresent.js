export default {
  name: "aboutmepresent",
  title: "About Me",
  type: "document",

  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "previewText", title: "Preview Text", type: "string" },
    { name: "body", title: "Body", type: "blockContent" },
    {
      name: "myImage",
      title: "My Image",
      type: "image",
      options: {
        // MISLIM DA CE OVO OMOGUCITI TRANSFORMACIJU SLIKE U KRUG
        hotspot: true,
      },
    },
  ],
};
