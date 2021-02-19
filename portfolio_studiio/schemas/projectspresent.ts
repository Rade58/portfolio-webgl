import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.projectspresent,
  title: "Projects",
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
    {
      name: "github",
      title: "Github",
      type: T.reference,
      to: { type: M.githubinfo },
    },
    // KROZ OVO CU DAKLE DA BIRAM LISTU PROJEKATA
    {
      name: "projects",
      title: "List Of Projects",
      type: T.array,
      of: [
        {
          type: T.reference,
          to: { type: M.mockproject },
        },
      ],
    },
  ],
};
