import { GetStaticPropsContext } from "next";
import { groq } from "next-sanity";

import { getEntryCachedMem } from "@lib/getEntryCachedMem";

type SharedPageStaticProps = unknown;

const mainMenuQuery = groq`*[_type == "navigation" && title == "Main Menu"][0] {
items[]{
 text,
"externalUrl": navigationItemUrl.externalUrl,
"internalUrl": navigationItemUrl.internalUrl 
}
}`;

const footerQuery = groq`*[_type == "supporter"] | order(order asc)
{
title,
link,
"image": logo,
}`;

export function withPageStaticProps(
  getStaticPropsFunc?: (
    context: GetStaticPropsContext,
    sharedPageStaticProps: SharedPageStaticProps
  ) => Promise<any>
) {
  return async (
    context: GetStaticPropsContext
  ): Promise<SharedPageStaticProps> => {
    const headerData = await getEntryCachedMem("Main Menu", mainMenuQuery);
    const footerData = await getEntryCachedMem("Footer", footerQuery);

    if (getStaticPropsFunc == null) {
      return {
        props: {
          headerData,
          footerData,
        },
        revalidate: 60,
      };
    }

    return await getStaticPropsFunc(context, {
      props: {
        headerData,
        footerData,
      },
      revalidate: 60,
    });
  };
}
