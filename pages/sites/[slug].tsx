import type { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";

import { groq } from "next-sanity";

import Wrapper from "@components/Wrapper";
import Image from "@components/Image";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import PortableText from "react-portable-text";

import type { Site as SiteType } from "schema";

type SiteProps = Pick<SiteType, "title" | "body">;

const siteQuery = groq`*[_type == "site" && slug.current == $slug][0] {
  title,
  body
}`;

const allSitesQuery = groq`*[_type == "site" && slug.current != ""] {
  "slug": slug.current
}`;

const Site: NextPage<SiteProps> = ({ title, body = [] }) => (
  <Wrapper>
    <article>
      <h1>{title}</h1>
      <PortableText
        content={body}
        serializers={{
          image: (props: any) => <Image {...props} image={props} />,
        }}
      />
    </article>
  </Wrapper>
);

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps) => {
    const { slug } = context.params || {};

    const { title, body } = await getClient(false).fetch(siteQuery, { slug });

    return {
      props: {
        ...sharedPageStaticProps.props,
        title,
        body,
      },
      revalidate: 60,
    };
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getClient(false).fetch(allSitesQuery);

  const paths = pages.map((page: { slug: string }) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Site;
