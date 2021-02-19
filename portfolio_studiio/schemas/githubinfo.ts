import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.githubinfo,
  title: "Github",
  type: T.document,
  fields: [
    { name: "icon", title: "Icon", type: T.image },
    { name: "url", title: "Your Github Url", type: T.url },
  ],
};
