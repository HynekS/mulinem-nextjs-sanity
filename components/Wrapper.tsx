import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  [key: string]: any;
}

const Wrapper = (props: Props) => {
  return (
    <div
      tw="max-width[clamp(var(--contentWidth), var(--contentWidth), 100%)] mx-auto my-0 padding[var(--basePadding)] w-full"
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
