import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.mockarticle,
  title: "Mock Article",
  type: T.document,

  fields: [
    {
      name: "title",
      title: "Title",
      type: T.string,
    },
    {
      name: "date",
      title: "Date",
      type: T.date,
    },
    {
      name: "link",
      title: "Link",
      type: T.url,
    },
    {
      name: "tags",
      title: "Tags",
      type: T.array,
      of: [{ type: T.string }],
      options: {
        layout: "tags",
      },
    },
  ],
};
