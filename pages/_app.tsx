import Head from "next/head";
import Layout from "@components/Layout";
import "node_modules/modern-normalize/modern-normalize.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
