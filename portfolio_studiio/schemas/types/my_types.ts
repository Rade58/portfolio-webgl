import blogpresent from "../blogpresent";
import projectspresent from "../projectspresent";

export const enum MyTypes {
  // story
  story = "story",
  // TYPE-OVI REFERENCED BY STORY
  aboutmepresent = "aboutmepresent",
  contactpresent = "contactpresent",
  projectspresent = "projectspresent",
  blogpresent = "blogpresent",
  // TYPE-OVI KOJE REFERENCIRA aboutmepresent
  devsvg = "devsvg",

  // TYPE-OVI KOJE REFRENCIRAJU SVI   'present'   TYPE-OVI
  iconcolor = "iconcolor",
}
