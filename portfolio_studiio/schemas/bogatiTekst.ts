// KREIRO SAM NAMERNO (MOZDA I BEZPOTREBNO JER SAM MOZDA
// MOGAO DADOAVATI I SAMO U blockContent SCHEMA-U)
// OVO DA VIDIM DA LI MOGU DA DODAM sapn
// TO SU TI DECORATORS
//  OZNACENO SA marks.decorators
//  PROCITAJ OVO DA BOLJE RAZUMES  https://www.sanity.io/docs/configuration

import T from "./type_names";
import M from "./type_names/my_types";
import D from "./type_names/decorators";

export default {
  name: M.bogatiTekst,
  title: "Bogati Tekst",
  type: T.array,
  of: [
    {
      title: "Block",
      type: T.block,
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          // ------- DODAJEM NOVE DEKORATORE (DA NAUCCIM KAKO SE OVO RADI)
          { title: "EmoText", value: D.emotext },
          //-------
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: T.object,
            fields: [
              {
                title: "URL",
                name: "href",
                type: T.url,
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: T.image,
      options: { hotspot: true },
    },
  ],
};
