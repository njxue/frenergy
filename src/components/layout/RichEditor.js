import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  convertFromRaw,
  convertToRaw,
  ContentState,
  EditorState,
} from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";

import { stateFromHTML } from "draft-js-import-html";

function RichEditor(props) {
  const { setBody, body } = props;

  const toolbarOptions = [
    "inline",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "image",
    "history",
  ];

  return (
    <Editor
      onContentStateChange={() => console.log("hi")}
      defaultContentState={convertToRaw(body)}
      editorStyle={{ border: "1px solid lightgray", borderRadius: "5px" }}
      toolbar={{ options: toolbarOptions }}
    />
  );
}
export default RichEditor;
