import { HiOutlineLocationMarker } from "react-icons/hi";

export default {
  name: "site",
  title: "Sites",
  type: "document",
  icon: HiOutlineLocationMarker,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true,
          },
        },
        {
          name: "alttext",
          type: "string",
          title: "Alt text",
          options: {
            isHighlighted: true,
          },
        },
        {
          // Editing this field will be hidden behind an "Edit"-button
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "order",
      title: "Order (default)",
      type: "number",
      hidden: true,
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};
