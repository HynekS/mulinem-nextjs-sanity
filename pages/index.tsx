import type { NextPage, GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { groq } from "next-sanity";
import PortableText from "react-portable-text";

import { urlFor } from "@lib/sanity";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";
import Image from "@components/Image";

import type { FrontPage, FrontPageParagraph, News } from "schema";

type FrontPageProps = Pick<
  FrontPage,
  "title" | "secondaryTitle" | "mainImage"
> & {
  paragraphs: Array<{
    text: FrontPageParagraph["paragraphText"];
    image?: FrontPageParagraph["paragraphImage"];
  }>;
} & {
  news: Array<
    Pick<News, "title" | "mainImage" | "author" | "publishedAt"> & {
      slug: string;
    }
  >;
};

const frontPageQuery = groq`
  *[_type == "frontPage"] {
    title,
    secondaryTitle,
    mainImage,
    paragraphs[]{
     "text": paragraphText,
      "image": paragraphImage
    } 
  }
`;

const newsExcerpsQuery = groq`
  *[_type == "news"][0..2] | order(publishedAt desc) {
    title,
    author,
    mainImage,
    publishedAt,
    "slug" : slug.current,
  }`;

const Home: NextPage<FrontPageProps> = ({
  title,
  secondaryTitle,
  mainImage,
  paragraphs,
  news,
}) => {
  console.log({ news });

  return (
    <>
      <NextSeo title="Home" />
      <div>
        <div
          style={{
            backgroundImage: mainImage
              ? `url(${urlFor(mainImage).width(1800).url()})`
              : undefined,
          }}
          tw="bg-black bg-no-repeat relative bg-center bg-cover min-height[320px] md:(bg-cover min-height[480px]) lg:(bg-cover min-height[560px]) xl:(bg-cover min-height[640px])"
        >
          <Wrapper>
            <header tw="relative z-10 pt-8 text-center text-white pointer-events-none">
              <h1>{title}</h1>
              <h2 tw="text-base font-thin tracking-wide opacity-90">
                {secondaryTitle}
              </h2>
            </header>
          </Wrapper>
        </div>
        <Wrapper tw="relative before:(absolute top[calc(2em * 3)] height[calc(100% - (2em * 4))] left[41%] w-px bg-gray-300)">
          {paragraphs.map((paragraph, i) => (
            <div
              tw="flex relative mt-8 gap-8 even:(all-child:(first:(order-last))) not-first:(font-size[calc(var(--step-0) * 0.9)]) not-first:(all-child:(first:(min-width[6em])))"
              key={i}
            >
              {paragraph.image ? (
                <div tw="min-width[8em] pt-4">
                  <picture>
                    <img
                      tw="object-cover object-center w-full rounded-full"
                      srcSet={`
                      ${urlFor(paragraph.image).width(320)} 320w,
                      ${urlFor(paragraph.image).width(480)} 480w,
                      ${urlFor(paragraph.image).width(800)} 800w
                    `}
                      sizes={`
                      (max-width: 320px) 80px,
                      (max-width: 480px) 120px,
                      200px
                    `}
                      src={urlFor(paragraph.image).url()}
                      alt=""
                    />
                  </picture>
                </div>
              ) : null}
              {!!paragraph.text && (
                <div tw="py-4 bg-white">
                  <PortableText content={paragraph.text} />
                </div>
              )}
            </div>
          ))}
        </Wrapper>
        <Wrapper>
          <h2 tw="font-size[var(--step-1)]">News</h2>
          <section tw="flex justify-between flex-col md:(flex-row)">
            {!!news.length &&
              news.map((item, index) => {
                const { title, slug, mainImage, author, publishedAt } = item;

                return (
                  <article
                    tw="flex-1 mb-4 md:(max-width[calc(1 / 2 * 100% - (1 - 1 / 2) * 3rem)])"
                    key={index}
                  >
                    <h3 tw="my-0">
                      <Link href={`news/${slug}`}>{title}</Link>
                    </h3>
                    <div tw="font-size[var(--step--2)] text-gray-500 font-semibold mb-2">
                      <span>{author ? author : "MULINEM team"}</span>
                      <span> • </span>
                      <span>
                        {new Date(String(publishedAt)).toLocaleDateString()}
                      </span>
                    </div>
                    <div tw="flex">
                      {mainImage && (
                        <div tw="bg-gray-200 rounded max-height[220px] overflow-hidden">
                          <Image {...mainImage} image={mainImage} />
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
          </section>
        </Wrapper>
      </div>
    </>
  );
};

export const getStaticProps = withPageStaticProps(
  async ({ preview = false }: GetStaticPropsContext, sharedPageStaticProps) => {
    const [{ title, secondaryTitle, mainImage, paragraphs }] = await getClient(
      preview
    ).fetch(frontPageQuery);

    const news = await getClient(preview).fetch(newsExcerpsQuery);

    return {
      props: {
        ...sharedPageStaticProps.props,
        title,
        secondaryTitle,
        mainImage,
        paragraphs,
        news,
      },
      revalidate: 60,
    };
  }
);

export default Home;
