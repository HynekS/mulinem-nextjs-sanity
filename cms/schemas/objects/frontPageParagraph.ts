export default {
  name: "frontPageParagraph",
  type: "object",
  title: "Paragraph",
  fields: [
    {
      title: "Text",
      name: "paragraphText",
      type: "simplePortableText",
    },
    {
      name: "paragraphImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "paragraphText",
      media: "paragraphImage",
    },
  },
};
