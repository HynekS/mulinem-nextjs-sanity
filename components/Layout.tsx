import { useLayoutEffect, ReactNode } from "react";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import Main from "@components/Main";
import Footer from "@components/Footer";

import type { MainMenu, FooterData } from "@lib/withPageStaticProps";
interface Props {
  children: ReactNode;
  headerData: MainMenu;
  footerData: FooterData;
}

const useBrowserLayoutEffect =
  typeof window === "undefined" ? () => {} : useLayoutEffect;

const Layout = ({
  headerData = {} as MainMenu,
  footerData = {} as FooterData,
  children,
  ...props
}: Props) => {
  useBrowserLayoutEffect(() => {
    const preventTransitions = () => {
      document.body.classList.add("resize-animation-stopper");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() =>
          document.body.classList.remove("resize-animation-stopper")
        );
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", preventTransitions);
      return () => {
        window.removeEventListener("resize", preventTransitions);
      };
    }
  });

  return (
    <div tw="max-w-[1920px] /* 3xl */ mx-auto bg-[var(--baseBgColor)]">
      <Header>
        <Navbar headerData={headerData} {...props} />
      </Header>
      <Main>{children}</Main>
      <Footer footerData={footerData} {...props} />
    </div>
  );
};

export default Layout;
