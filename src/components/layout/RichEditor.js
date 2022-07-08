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
import parse from "html-react-parser";

function RichEditor(props) {
  const { setBody } = props;
  const [editorState, setEditorState] = useState();
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

  useEffect(() => {
    if (editorState) {
      setBody(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  }, [editorState]);
  return (
    <>
      <Editor
        onEditorStateChange={(e) => setEditorState(e)}
        editorState={editorState}
        editorStyle={{ border: "1px solid lightgray", borderRadius: "5px" }}
        toolbar={{ options: toolbarOptions }}
      />
    </>
  );
}
export default RichEditor;
