import { DefaultSeo } from "next-seo";

import Layout from "@components/Layout";
import "node_modules/modern-normalize/modern-normalize.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout {...pageProps}>
        <DefaultSeo
          titleTemplate="MULINEM Project | %s"
          defaultTitle="MULINEM Project"
          description="The 'MULINEM' project is focused on investigation of medieval urban sites in Adiabene, historical province of Arbela (Arbīl, Erbil, Hawler), North Iraq."
          openGraph={{
            type: "website",
            locale: "en",
            url: process.env.WEB_URI,
            site_name: "MULINEM Project",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
