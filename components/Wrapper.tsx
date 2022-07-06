const Wrapper = (props) => {
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
