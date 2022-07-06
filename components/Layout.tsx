import React, { useLayoutEffect } from "react";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import Main from "@components/Main";
import Footer from "@components/Footer";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? () => {} : useLayoutEffect;

const Layout = ({ headerData = {}, footerData = {}, children, ...props }) => {
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
    <>
      {/*<Helmet>
        <html lang={lang} />
        <meta name="keywords" content={keywords} />
        <meta
          name="description"
          content="The project “Medieval Urban Landscape in the Northeastern Mesopotamia” (MULINEM), supported by the Czech Science Foundation, is focused on investigation of medieval urban sites in Adiabene (al-Hidyab), historical province of Arbela (Arbīl, Erbil, Hawler)."
        />
        <title>{title}</title>
    </Helmet>*/}
      <Header key="header">
        <Navbar headerData={headerData} {...props} />
      </Header>
      <Main key="main">{children}</Main>
      <Footer footerData={footerData} {...props} />
    </>
  );
};

export default Layout;
