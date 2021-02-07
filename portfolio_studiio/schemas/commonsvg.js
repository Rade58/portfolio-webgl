export default {
  name: "commonsvg",
  title: "Common Svg Icons",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "color",
      title: "Color",
      type: "array",
      of: [
        //
      ],
    },
    { name: "icon", title: "Icon", type: "image" },
  ],
};
