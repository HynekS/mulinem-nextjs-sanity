import type { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return <main tw="flex[1 0 auto] pt-[71px] md:(pt-0)">{children}</main>;
};

export default Main;
