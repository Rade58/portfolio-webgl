import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.mymail,
  title: "Email",
  type: T.document,
  fields: [
    //
    { name: "currentMail", title: "Current Email", type: T.email },
  ],
};
