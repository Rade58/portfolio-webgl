import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.devsvg,
  title: "Developer Svg",
  type: T.document,
  fields: [
    {
      name: "isEmoji",
      title: "Is emoji",
      type: T.boolean,
    },
    {
      name: "emoji",
      title: "Emoji",
      type: T.string,
    },
    {
      name: "title",
      title: "Title",
      type: T.string,
    },
    { name: "devImage", title: "Developer Image", type: T.image },
    { name: "wikiUrl", title: "Official website", type: T.string },
    { name: "textDecorColor", title: "Text Decoration Color", type: T.string },
    {
      name: "additionalBracketText",
      title: "Additional Bracket Text",
      type: T.string,
    },
  ],
};
