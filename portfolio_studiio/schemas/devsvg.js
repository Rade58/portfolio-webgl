export default {
  name: "devsvg",
  title: "Developer Svg",
  type: "document",
  fields: [
    {
      name: "isEmoji",
      title: "Is emoji",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    { name: "devImage", title: "Developer Image", type: "image" },
    { name: "wikiUrl", title: "Official website", type: "string" },
    { name: "textDecorColor", title: "Text Decoration Color", type: "string" },
  ],
};
