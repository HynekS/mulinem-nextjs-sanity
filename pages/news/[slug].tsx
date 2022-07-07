import type { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { groq } from "next-sanity";
import PortableText from "react-portable-text";

import Image from "@components/Image";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";

import type { News as NewsType } from "schema";

const newsQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    title,
    author,
    mainImage,
    publishedAt,
    body[]{
    ..., 
    asset->{
      ...,
      "_key": _id
    },
  }}`;

const queryAllNews = groq`*[_type == "news" && slug.current != ''] {
  'slug': slug.current
}
`;

const Page: NextPage<NewsType> = ({
  title,
  author,
  mainImage,
  publishedAt,
  body = [],
}) => {
  return (
    <>
      <NextSeo title={title} />
      <Wrapper>
        <article>
          <header tw="mb-4">
            <h1 tw="mb-2">{title}</h1>
            <div tw="font-size[var(--step--1)] opacity-80">
              <span>{author ? author : "MULINEM team"}</span>
              <span> • </span>
              <span>{new Date(String(publishedAt)).toLocaleDateString()}</span>
            </div>
          </header>
          <PortableText
            content={body}
            serializers={{
              image: (props: any) => <Image {...props} image={props} />,
            }}
          />
          {!!mainImage && <Image {...mainImage} image={mainImage} />}
        </article>
        <footer tw="flex justify-center items-center py-8">
          <img src="/rosette.svg" alt="" tw="w-12 h-12" />
        </footer>
      </Wrapper>
    </>
  );
};

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps) => {
    const { slug } = context.params || {};

    const { title, author, mainImage, publishedAt, body } = await getClient(
      false
    ).fetch(newsQuery, { slug });

    return {
      props: {
        ...sharedPageStaticProps.props,
        title,
        author,
        mainImage,
        publishedAt,
        body,
      },
      revalidate: 60,
    };
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getClient(false).fetch(queryAllNews);
  const paths = pages.map((page: { slug: string }) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Page;
