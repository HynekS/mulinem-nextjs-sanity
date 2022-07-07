import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import site from "./documents/site";
import supporter from "./documents/supporter";
import teammember from "./documents/teammember";
import page from "./documents/page";
import navigation from "./documents/navigation";
import news from "./documents/news";
import frontPage from "./documents/frontPage";

import link from "./objects/link";
import navItem from "./objects/navItem";
import simplePortableText from "./objects/simplePortableText";
import frontPageParagraph from "./objects/frontPageParagraph";
import blockContent from "./objects/blockContent";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    frontPage,
    site,
    teammember,
    supporter,
    page,
    news,
    navigation,
    link,
    navItem,
    simplePortableText,
    frontPageParagraph,
    blockContent,
  ]),
});
