import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Front Page
 *
 *
 */
export interface FrontPage extends SanityDocument {
  _type: "frontPage";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Secondary title — `string`
   *
   *
   */
  secondaryTitle?: string;

  /**
   * Image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt text — `string`
     *
     *
     */
    alttext?: string;
  };

  /**
   * paragraphs — `array`
   *
   *
   */
  paragraphs?: Array<SanityKeyed<FrontPageParagraph>>;
}

/**
 * Sites
 *
 *
 */
export interface Site extends SanityDocument {
  _type: "site";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     *
     */
    caption?: string;

    /**
     * Alt text — `string`
     *
     *
     */
    alttext?: string;

    /**
     * Attribution — `string`
     *
     *
     */
    attribution?: string;
  };

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Location — `geopoint`
   *
   *
   */
  location?: SanityGeoPoint;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Order (default) — `number`
   *
   *
   */
  order?: number;
}

/**
 * Team members
 *
 *
 */
export interface TeamMember extends SanityDocument {
  _type: "teamMember";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Institution — `string`
   *
   *
   */
  institution?: string;

  /**
   * Bio — `text`
   *
   *
   */
  bio?: string;

  /**
   * Email(s) — `array`
   *
   *
   */
  emails?: Array<SanityKeyed<string>>;

  /**
   * Link(s) — `array`
   *
   *
   */
  links?: Array<SanityKeyed<string>>;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Order (default) — `number`
   *
   *
   */
  order?: number;
}

/**
 * Supporters
 *
 *
 */
export interface Supporter extends SanityDocument {
  _type: "supporter";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt text — `string`
     *
     *
     */
    alttext?: string;
  };

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Link — `url`
   *
   *
   */
  link?: string;

  /**
   * Order (default) — `number`
   *
   *
   */
  order?: number;
}

/**
 * Pages
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     *
     */
    caption?: string;

    /**
     * Alt text — `string`
     *
     *
     */
    alttext?: string;

    /**
     * Attribution — `string`
     *
     *
     */
    attribution?: string;
  };

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Updates
 *
 *
 */
export interface Update extends SanityDocument {
  _type: "update";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     *
     */
    caption?: string;

    /**
     * Alt text — `string`
     *
     *
     */
    alttext?: string;

    /**
     * Attribution — `string`
     *
     *
     */
    attribution?: string;
  };

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Navigation
 *
 *
 */
export interface Navigation extends SanityDocument {
  _type: "navigation";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Navigation Id — `slug`
   *
   *
   */
  navId?: { _type: "navId"; current: string };

  /**
   * Navigation items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<NavigationItem>>;
}

export type Link = {
  _type: "link";
  /**
   * Internal Link — `reference`
   *
   * Select pages for navigation
   */
  internalLink?: SanityReference<Page>;

  /**
   * External URL — `url`
   *
   * Use fully qualified URLS for external link
   */
  externalUrl?: string;
};

export type NavigationItem = {
  _type: "navigationItem";
  /**
   * Navigation Text — `string`
   *
   *
   */
  text?: string;

  /**
   * Navigation Item URL — `link`
   *
   *
   */
  navigationItemUrl?: Link;
};

export type SimplePortableText = Array<SanityKeyed<SanityBlock>>;

export type FrontPageParagraph = {
  _type: "frontPageParagraph";
  /**
   * Text — `simplePortableText`
   *
   *
   */
  paragraphText?: SimplePortableText;

  /**
   * Image — `image`
   *
   *
   */
  paragraphImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Caption — `string`
       *
       *
       */
      caption?: string;

      /**
       * Alt text — `string`
       *
       *
       */
      alttext?: string;

      /**
       * Attribution — `string`
       *
       *
       */
      attribution?: string;
    }>
>;

export type Documents =
  | FrontPage
  | Site
  | TeamMember
  | Supporter
  | Page
  | Update
  | Navigation;
