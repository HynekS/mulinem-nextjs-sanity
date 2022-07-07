import { HiOutlineLibrary } from "react-icons/hi";

export default {
  name: "supporter",
  title: "Supporters",
  type: "document",
  icon: HiOutlineLibrary,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alttext",
          type: "string",
          title: "Alt text",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "link",
      title: "Link",
      type: "url",
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
