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

  // TYPE-OVI KOJE REFERENCIRA contactpresent
  mymail = "mymail",
  socialsvg = "socialsvg",

  // TYPE-OVI KOJE REFERENCIRA projectspresent

  //  (OTHER document types USED AS REFERENCES)
  // TYPE-OVI KOJE REFRENCIRAJU   SVI   'present'   TYPE-OVI
  // I TO SU TYPE-OVI ZA KOJE SAM PRAVIO KOLEKCJE
  iconcolor = "iconcolor",

  // (non-document types)
  // TYPE-OVI, ZA KOJE NISAM PRAVIO KOLEKCIJE ALI IH KORISTIM
  // U MOJIM `present` TYPE-OVIMA (U SUSTINUI U PITANJU JE SAMO BOGATI TEKST)
  bogatiTekst = "bogatiTekst",

  // -------------------------------
  // TYPE-OVI KOJI SU DOSLI SA INSTALACIJOM STUDIO-A (A KOJE CU EVENTUALLY UKLONITI
  // MEDJUTIM DOBRI SU DA IH POGLEDAM U CILJU EDUKACIJE)

  //
}
