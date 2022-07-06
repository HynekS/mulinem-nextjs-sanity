import { GetStaticPropsContext } from "next";
import { groq } from "next-sanity";

import { getEntryCachedMem } from "@lib/getEntryCachedMem";

import type { NavigationItem, Link, Supporter } from "../schema";

export type MainMenu = {
  items: Array<{
    text: NavigationItem["text"];
    externalUrl: Link["externalUrl"];
    internalUrl: Link["internalLink"];
  }>;
};

export type FooterData = Array<
  Pick<Supporter, "title" | "link"> & { image: Supporter["logo"] }
>;

type SharedPageStaticProps = {
  props: { headerData: MainMenu; footerData: FooterData };
  revalidate?: number;
};

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
    const headerData = (await getEntryCachedMem(
      "Main Menu",
      mainMenuQuery
    )) as MainMenu;
    const footerData = (await getEntryCachedMem(
      "Footer",
      footerQuery
    )) as FooterData;

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
