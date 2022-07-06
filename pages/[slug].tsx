import type { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";
import { groq } from "next-sanity";
import PortableText from "react-portable-text";

import Image from "@components/Image";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
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

const Page: NextPage = ({ body }) => {
  return (
    <Wrapper>
      <PortableText
        content={body}
        serializers={{
          image: (props) => <Image {...props} image={props} />,
        }}
      />
    </Wrapper>
  );
};

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps: unknown) => {
    const { slug } = context.params || {};

    const { body } = await getClient(false).fetch(pageQuery, { slug });

    return {
      props: {
        ...sharedPageStaticProps.props,
        body,
      },
      revalidate: 60,
    };
  }
);

export const getStaticPaths: GetStaticPaths = async (context) => {
  const slug = context.params || {};
  const pages =
    (await getClient(false).fetch(queryAllPages, {
      slug,
    })) || [];

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Page;
