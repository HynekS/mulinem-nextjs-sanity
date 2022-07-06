import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { urlFor } from "@lib/sanity";
import css from "../styles/Image.module.css";

function get(value, path, defaultValue = undefined) {
  return String(path)
    .split(".")
    .reduce((acc, v) => {
      try {
        acc = acc[v];
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, value);
}

function omit(obj, ...keys) {
  const keysToRemove = new Set(keys.flat());

  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keysToRemove.has(k))
  );
}

const ImageUrlBuilder = urlFor;

const DEFAULT_WIDTH = 500;
const DEFAULT_WIDTHS = [320, 480, 640, 800, 1440];
const DEFAULT_SIZES = `(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`;

// eslint-disable-next-line complexity
const Image = (props) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isLoaded, setLoaded] = useState(false);

  // When an image is in the browser cache or is completed loading before react rehydration,
  // the `onload` may not be triggered. In order to ensure we have the correct "complete"
  // state, check the `complete` property after mounting
  const imgRef = React.createRef<HTMLImageElement>();
  useEffect(() => {
    if (
      imgRef &&
      imgRef.current &&
      imgRef.current.complete &&
      imgRef.current.naturalWidth
    ) {
      setLoaded(true);
    }
  });

  const {
    image,
    alttext: alt,
    src,
    aspect,
    srcSet,
    caption = "",
    width = DEFAULT_WIDTH,
    fit = "clip",
    sizes = DEFAULT_SIZES,
    widths = DEFAULT_WIDTHS,
    lazy = "true",
  } = props;

  if (!src && (!image || !image.asset)) {
    return <img />;
  }

  const showImage = lazy === "false" || !!inView;
  const orgWidth = get(image, "asset.metadata.dimensions.width");
  const orgHeight = get(image, "asset.metadata.dimensions.height");
  const aspectRatio = aspect || orgWidth / orgHeight || null;
  const defaultSrcSetParts = aspectRatio
    ? widths.map(
        (sourceW) =>
          `${ImageUrlBuilder(image)
            .width(sourceW)
            .height(Math.round(sourceW / aspectRatio))
            .fit(fit)
            .url()} ${sourceW}w`
      )
    : widths.map(
        (sourceW) =>
          `${ImageUrlBuilder(image).width(sourceW).url()} ${sourceW}w`
      );

  const defaultSrcSet = defaultSrcSetParts.join(",");

  const height = aspectRatio ? Math.round(width / aspectRatio) : null;

  const computedSrc = ImageUrlBuilder(image).width(width).fit(fit).url();

  const className = [props.className, css.root].filter(Boolean).join(" ");
  const bg = get(image, "asset.metadata.palette.dominant.background");
  const lqip = get(image, "asset.metadata.lqip");
  return (
    <figure tw="m-4">
      <div
        className={className}
        data-has-aspect={!!aspectRatio}
        style={{
          paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : undefined,
        }}
      >
        <div
          ref={inViewRef}
          className={css.lqip}
          data-is-loaded={isLoaded}
          aria-hidden="true"
          style={{
            backgroundColor: bg,
            backgroundImage: lqip && `url(${lqip})`,
          }}
        />
        <img
          {...omit(props, [
            "alttext",
            "asset",
            "image",
            "className",
            "aspect",
            "width",
            "height",
            "widths",
            "lazy",
            "clip",
          ])}
          alt={alt || (image && image.alt)}
          ref={imgRef}
          srcSet={showImage && !src ? defaultSrcSet || srcSet : undefined}
          sizes={sizes}
          src={showImage ? src || computedSrc : undefined}
          className={css.img}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </div>
      {!!caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default Image;
