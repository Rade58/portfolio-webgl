// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import author from "./author";

// JA DODAO I REFERENCIRAO
import bogatiTekst from "./bogatiTekst";
import aboutmepresent from "./aboutmepresent";
import contactpresent from "./contactpresent";
import projectpresent from "./projectspresent";
import blogpresent from "./blogpresent";
import devsvg from "./devsvg";
import socialsvg from "./socialsvg";
import email from "./email";

import iconcolor from "./iconcolor";
import story from "./story";
//

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,

    // MOJE
    bogatiTekst,
    aboutmepresent,
    contactpresent,
    projectpresent,
    blogpresent,
    devsvg,
    socialsvg,
    email,

    iconcolor,
    story,
    //

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
