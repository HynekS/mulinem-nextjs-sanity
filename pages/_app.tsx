import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import "node_modules/modern-normalize/modern-normalize.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
