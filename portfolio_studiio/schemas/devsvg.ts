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
      name: "emoji",
      title: "Emoji",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    { name: "devImage", title: "Developer Image", type: "image" },
    { name: "wikiUrl", title: "Official website", type: "string" },
    { name: "textDecorColor", title: "Text Decoration Color", type: "string" },
    {
      name: "additionalBracketText",
      title: "Additional Bracket Text",
      type: "string",
    },
  ],
};
