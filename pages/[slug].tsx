import type { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { groq } from "next-sanity";
import PortableText from "react-portable-text";

import Image from "@components/Image";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";

import type { Page as PageType } from "schema";

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title
    body[]{
    ..., 
    asset->{
      ...,
      "_key": _id
    },
  }}`;

const queryAllPages = groq`*[_type == "page" && slug.current != ''] {
  'slug': slug.current
}
`;

const Page: NextPage<PageType> = ({ title, body = [] }) => {
  return (
    <>
      <NextSeo title={title} />
      <Wrapper>
        <PortableText
          content={body}
          serializers={{
            image: (props: any) => <Image {...props} image={props} />,
          }}
        />
      </Wrapper>
    </>
  );
};

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps) => {
    const { slug } = context.params || {};

    const { body, title } = await getClient(false).fetch(pageQuery, { slug });

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
  const pages = await getClient(false).fetch(queryAllPages);
  const paths = pages.map((page: { slug: string }) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Page;
