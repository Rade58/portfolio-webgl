import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.story,
  title: "Story",
  type: T.document,
  fields: [
    // OVO JE REFERENCA ALI SAMO ZA SINGLE DOCUMENT
    {
      name: "aboutme",
      title: "About Me",
      type: T.reference,
      to: { type: M.aboutmepresent },
    },
    {
      name: "contact",
      title: "Contact",
      type: T.reference,
      to: { type: M.contactpresent },
    },
    {
      name: "projects",
      title: "Projects",
      type: T.reference,
      to: { type: M.projectspresent },
    },
    {
      name: "blog",
      title: "Blog",
      type: T.reference,
      to: { type: M.blogpresent },
    },
  ],
};
