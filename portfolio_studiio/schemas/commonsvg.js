export default {
  name: "commonsvg",
  title: "Common Svg Icons",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "color",
      title: "Color",
      type: "reference",
      // SINGLE DOCUMENT REFERECE
      to: {
        type: "iconcolor",
      },
    },
    { name: "icon", title: "Icon", type: "image" },
  ],
};
