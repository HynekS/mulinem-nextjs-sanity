import type { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";

import { groq } from "next-sanity";

import Wrapper from "@components/Wrapper";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import PortableText from "react-portable-text";

import { urlFor } from "@lib/sanity";

const siteQuery = groq`*[_type == "site" && slug.current == $slug][0] {
  title,
  body
}`;

const allSitesQuery = groq`*[_type == "site" && slug.current != ""] {
  "slug": slug.current
}`;

const BlogImage = ({ caption, alttext, asset, ...props }) => {
  return (
    <figure style={{ maxWidth: 800 }}>
      <img
        {...props}
        src={urlFor(asset).url()}
        width="800px"
        sizes="(max-width: 848px) 100vw, 800px"
        style={{ display: "block", width: "100%" }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

const Site: NextPage = ({ title, body }) => (
  <Wrapper>
    <article>
      <h1>{title}</h1>
      <PortableText
        content={body}
        serializers={{
          image: BlogImage,
        }}
      />
    </article>
  </Wrapper>
);

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps: unknown) => {
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

export const getStaticPaths: GetStaticPaths = async (context) => {
  const slug = context.params || {};
  const pages =
    (await getClient(false).fetch(allSitesQuery, {
      slug,
    })) || [];

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Site;
