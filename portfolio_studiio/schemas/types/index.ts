import { MyTypes } from "./my_types";

enum FieldTypes {
  array = "array",
  block = "block",
  boolean = "boolean",
  date = "date",
  datetime = "datetime",
  document = "document",
  file = "file",
  geopoint = "geopoint",
  image = "image",
  number = "number",
  object = "object",
  reference = "reference",
  slug = "slug",
  string = "string",
  span = "span",
  text = "text",
  url = "url",
}

export type MyTypesEnum = MyTypes;

export default FieldTypes;
