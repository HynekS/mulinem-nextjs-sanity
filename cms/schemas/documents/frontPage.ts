import { HiOutlineHome } from "react-icons/hi";

export default {
  name: "frontPage",
  title: "Front Page",
  type: "document",
  icon: HiOutlineHome,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "secondaryTitle",
      title: "Secondary title",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Image",
      type: "image",
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
      name: "paragraphs",
      type: "array",
      of: [{ type: "frontPageParagraph", name: "frontPageParagraph" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
    },
  },
};
