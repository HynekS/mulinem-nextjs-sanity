import { MdOutlineAnnouncement } from "react-icons/md";

export default {
  name: "news",
  title: "News",
  type: "document",
  icon: MdOutlineAnnouncement,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "string",
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};
