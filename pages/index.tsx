import type { NextPage, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { urlFor } from "@lib/sanity";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import PortableText from "react-portable-text";

import Wrapper from "@components/Wrapper";

import type { FrontPage, FrontPageParagraph } from "schema";

type FrontPageProps = Pick<
  FrontPage,
  "title" | "secondaryTitle" | "mainImage"
> & {
  paragraphs: Array<{
    text: FrontPageParagraph["paragraphText"];
    image?: FrontPageParagraph["paragraphImage"];
  }>;
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

const Home: NextPage<FrontPageProps> = ({
  title,
  secondaryTitle,
  mainImage,
  paragraphs,
}) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: mainImage
            ? `url(${urlFor(mainImage).width(1800).url()})`
            : undefined,
        }}
        tw="bg-black bg-no-repeat relative bg-center bg-cover min-height[320px] md:(bg-cover min-height[480px]) lg:(bg-cover min-height[560px]) xl:(bg-contain min-height[640px]) after:(absolute inset-0 bg-black opacity-50 z-0)"
      >
        <Wrapper>
          <header tw="relative z-10 pt-8 text-center text-white pointer-events-none">
            <h1>{title}</h1>
            <h2 tw="text-sm">{secondaryTitle}</h2>
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
    </div>
  );
};

export const getStaticProps = withPageStaticProps(
  async ({ preview = false }: GetStaticPropsContext, sharedPageStaticProps) => {
    const [{ title, secondaryTitle, mainImage, paragraphs }] = await getClient(
      preview
    ).fetch(frontPageQuery);

    return {
      props: {
        ...sharedPageStaticProps.props,
        title,
        secondaryTitle,
        mainImage,
        paragraphs,
      },
      revalidate: 60,
    };
  }
);

export default Home;
