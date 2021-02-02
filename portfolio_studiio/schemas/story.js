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
  ],
};
