import Link from "next/link";

import Wrapper from "@components/Wrapper";
import Logo from "@components/Logo";

import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    /* mb-71 px is quick dirty fix, should be calculated by js (it's the fixed header's height)*/
    <Wrapper tw="relative bg-white p-0 z-20 mb[71px] md:(mb-0 static bg-transparent padding[var(--basePadding)])">
      <header tw="flex bg-white justify-between fixed z-10  w-full p-4 shadow-lg bg-opacity-90 backdrop-blur-md md:(static p-0 shadow-none backdrop-blur-none bg-opacity-100)">
        <Link href="/" passHref>
          <a tw="flex items-center max-width[4em]">
            <Logo />
          </a>
        </Link>
        {children}
      </header>
    </Wrapper>
  );
};

export default Header;
