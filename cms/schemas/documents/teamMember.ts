import { HiOutlineUser } from "react-icons/hi";

export default {
  name: "teamMember",
  title: "Team members",
  type: "document",
  icon: HiOutlineUser,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "institution",
      title: "Institution",
      type: "string",
    },

    {
      name: "bio",
      title: "Bio",
      type: "text",
    },
    {
      name: "emails",
      title: "Email(s)",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "links",
      title: "Link(s)",
      type: "array",
      of: [
        {
          type: "url",
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
      title: "name",
      media: "image",
    },
  },
};
