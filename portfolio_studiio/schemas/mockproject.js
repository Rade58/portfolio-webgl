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
    {
      name: "link",
      title: "Link Of The Project",
      type: "url",
    },
    // OVO JE VISE OVDE U CILJU VEZBE NE VERUJEM DA CU KORISTITI
    // ALI OPTIONS SU DAKLE ONO STO POKAZUJE KAKO CE
    // U STUDIO-U IZGLEDATI TAJ DIALOG, TAJ FORMUALAR
    // INTUITIVNO JE (AKO NE ZNAS STA layout PREDSTAVLJA, TRAZI U DOCSIMA
    // ALI U SUSTINI PREDSTAVLJA KAKO TREBA DA IZGLEDA TAJ PICKER
    // U STUDIO-U)
    {
      name: "tags",
      title: "Tags",
      type: "array",
      // PVO ZNACI DA KREIRAS NIZ STRINGOVA
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    // I IMAM SNAPSHOT PROJECT-A
    {
      name: "snapshot",
      title: "Snapshot",
      type: "image",
    },
    //
  ],
};
