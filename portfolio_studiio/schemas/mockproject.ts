import T from "./type_names";
import M from "./type_names/my_types";

export default {
  name: M.mockproject,
  title: "Mock Project",
  type: T.document,
  fields: [
    {
      name: "title",
      title: "Title",
      type: T.string,
    },
    {
      name: "dateTime",
      title: "Date And Time",
      type: T.datetime,
    },
    {
      name: "description",
      title: "Description",
      type: T.text,
    },
    {
      name: "projectType",
      title: "Project Type",
      type: T.string,
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
      type: T.url,
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
      type: T.array,
      // PVO ZNACI DA KREIRAS NIZ STRINGOVA
      of: [{ type: T.string }],
      options: {
        layout: "tags",
      },
    },
    // I IMAM SNAPSHOT PROJECT-A
    {
      name: "snapshot",
      title: "Snapshot",
      type: T.image,
    },
    //
  ],
};
