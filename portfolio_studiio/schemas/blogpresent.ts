import T from "./types";
import M from "./types/my_types";

export default {
  name: M.blogpresent,
  title: "Blog",
  type: T.document,
  fields: [
    { name: "major", title: "major", type: T.string },
    { name: "title", title: "Title", type: T.string },
    { name: "previewText", title: "Preview Text", type: T.string },
    { name: "bogati", title: "Bogati Tekst", type: M.bogatiTekst },
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
