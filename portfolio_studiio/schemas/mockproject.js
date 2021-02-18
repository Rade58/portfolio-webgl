export default {
  name: "mockproject",
  title: "Mock Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Personal", value: "personal" },
          { title: "Client", value: "client" },
        ],
      },
    },
  ],
};
