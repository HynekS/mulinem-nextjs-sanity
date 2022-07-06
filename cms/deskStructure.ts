import S from "@sanity/desk-tool/structure-builder";
import { HiOutlineHome } from "react-icons/hi";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Front Page")
        .icon(HiOutlineHome)
        .child(S.editor().schemaType("frontPage").documentId("frontPage")),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) => !["frontPage"].includes(listItem.getId())
      ),
    ]);
