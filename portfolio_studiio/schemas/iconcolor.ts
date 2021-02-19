import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.iconcolor,
  title: "Icon Color",
  type: T.document,
  fields: [{ name: "color", title: "Color", type: T.string }],
};
