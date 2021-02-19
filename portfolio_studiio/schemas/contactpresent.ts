import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.contactpresent,
  title: "Contact",
  type: T.document,
  fields: [
    { name: "major", title: "major", type: T.string },
    { name: "title", title: "Title", type: T.string },
    { name: "previewText", title: "Preview Text", type: T.string },
    { name: "bogati", title: "Bogati Tekst", type: M.bogatiTekst },
    {
      name: "socialIcons",
      title: "Social Icons",
      type: T.array,

      of: [
        {
          type: T.reference,
          to: {
            type: M.socialsvg,
          },
        },
      ],
    },
    {
      name: "iconColor",
      title: "Color For Common Icons",
      type: T.reference,
      to: {
        type: M.iconcolor,
      },
    },
    {
      name: "email",
      title: "Email",
      type: T.reference,
      to: {
        type: M.mymail,
      },
    },
  ],
};
