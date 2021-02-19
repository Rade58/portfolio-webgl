import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.socialsvg,
  title: "Social Media Svg",
  type: T.document,
  fields: [
    {
      name: "name",
      title: "Name",
      type: T.string,
    },
    {
      name: "url",
      title: "Url",
      type: T.url,
    },
    {
      name: "socialImage",
      title: "Social Image",
      type: T.image,
    },
  ],
};
