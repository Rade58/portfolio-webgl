export default {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    // OVO JE REFERENCA ALI SAMO ZA SINGLE DOCUMENT
    {
      name: "aboutme",
      title: "About Me",
      type: "reference",
      to: { type: "aboutmepresent" },
    },
    {
      name: "contact",
      title: "Contact",
      type: "reference",
      to: { type: "contactpresent" },
    },
    {
      name: "projects",
      title: "Projects",
      type: "reference",
      to: { type: "projectspresent" },
    },
    {
      name: "blog",
      title: "Blog",
      type: "reference",
      to: { type: "blogpresent" },
    },
  ],
};
