import { Suspense, useState, useMemo, ReactNode } from "react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { createPortal } from "react-dom";
import Link from "next/link";
import * as portals from "react-reverse-portal";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { groq } from "next-sanity";
import dynamic from "next/dynamic";

import usePortal from "../../hooks/usePortal";
import Wrapper from "@components/Wrapper";
import { getClient } from "@lib/sanity.server";
import { urlFor } from "@lib/sanity";
import { withPageStaticProps } from "@lib/withPageStaticProps";

const Portal = ({ id, children }: { id: string; children: ReactNode }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

import type { Site, SanityGeoPoint } from "schema";

export type SitePageProps = {
  sites: Array<
    Pick<Site, "title" | "mainImage"> & { slug?: string } & {
      location: Pick<SanityGeoPoint, "lat" | "lng">;
    }
  >;
};

const sitesQuery = groq`*[_type == "site"] | order(order asc)
{
  title,
  "slug":slug.current,
  location {
  lat,
  lng
  },
  mainImage,
}`;

const Map = dynamic(
  () => import(/* webpackChunkName: "Map" */ "@components/Map"),
  {
    suspense: true,
    ssr: false,
  }
);

const SitesPage: NextPage<SitePageProps> = ({ sites }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isSSR = typeof window === "undefined";

  const portalNode = useMemo(() => {
    if (isSSR) {
      return null;
    }

    return portals.createHtmlPortalNode();
  }, []);

  const markers = sites.map(({ location, title, slug }) => {
    if (!location || !location.lng || !location.lat) return null;
    return {
      title,
      slug,
      location: { longitude: location.lng, latitude: location.lat },
    };
  });

  return (
    <>
      <NextSeo
        title="Sites"
        description="Subset of the most important MULINEM Project sites of presumed or confirmed urban status and Islamic origins"
      />
      <Wrapper>
        {portalNode && (
          <portals.InPortal node={portalNode}>
            {!isSSR && (
              <Suspense
                fallback={
                  <div tw="flex items-center justify-center h-full">
                    loading map…
                  </div>
                }
              >
                <Map markers={markers} />
              </Suspense>
            )}
          </portals.InPortal>
        )}
        <article>
          <h1>Sites</h1>
          {isFullScreen ? (
            <Portal id="ma-wrapper">
              <div tw="fixed z-20 inset-0 all-child:(last:(w-full h-full))">
                <div
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  tw="absolute z-10 right-0 top-0 text-white bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center m-4 cursor-pointer transition[all 0.3s ease] hover:(bg-opacity-50 transform[scale(1.25)])"
                >
                  <BsFullscreenExit />
                </div>
                {portalNode && <portals.OutPortal node={portalNode} />}
              </div>
            </Portal>
          ) : (
            <div tw="relative height[640px] w-full background-color[rgb(236, 225, 203)] all-child:(last:(w-full h-full)) mb-8">
              <div
                onClick={() => setIsFullScreen(!isFullScreen)}
                tw="absolute z-10 right-0 top-0 text-white bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center m-4 cursor-pointer transition[all 0.3s ease] hover:(bg-opacity-50 transform[scale(1.25)])"
              >
                <BsArrowsFullscreen />
              </div>
              {portalNode && <portals.OutPortal node={portalNode} />}
            </div>
          )}
          {sites && (
            <ul>
              {sites.map((site, index) => (
                <li key={index} tw="flex items-center gap-3">
                  <div tw="w-10 h-10 overflow-hidden rounded-full flex flex-shrink-0 items-center justify-center bg-gray-300">
                    {!!site.mainImage && (
                      <img
                        src={urlFor(site.mainImage).width(120).url()}
                        tw="object-cover min-height[100%]"
                        alt=""
                      />
                    )}
                  </div>
                  <h2 tw="my-2">
                    <Link href={`sites/${site.slug}`}>{site.title}</Link>
                  </h2>
                </li>
              ))}
            </ul>
          )}
        </article>
      </Wrapper>
    </>
  );
};

export const getStaticProps = withPageStaticProps(
  async (_, sharedPageStaticProps) => {
    const sites = await getClient(false).fetch(sitesQuery);

    return {
      props: {
        ...sharedPageStaticProps.props,
        sites,
      },
      revalidate: 60,
    };
  }
);

export default SitesPage;
