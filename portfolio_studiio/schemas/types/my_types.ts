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

  // TYPE-OVI KOJE REFERENCIRA

  // TYPE-OVI KOJE REFRENCIRAJU   SVI   'present'   TYPE-OVI
  iconcolor = "iconcolor",

  // TYPE-OVI ZA KOJE NISAM PRAVIO KOLEKCIJE ALI IH KORISTIM
  // U MOJIM TYPE-OVIMA (U SUSTINUI U PITANJU JE SAMO BOGATI TEKST)
  bogatiTekst = "bogatiTekst",

  // -------------------------------
  // TYPE-OVI KOJI SU DOSLI SA INSTALACIJOM STUDIO-A

  //
}
