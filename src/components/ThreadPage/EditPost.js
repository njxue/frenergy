import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  StackItem,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";
import { ref } from "../../config/firebase";

import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { initTitle, initBody, setIsEditing, paths } = props;
  const [title, setTitle] = useState(initTitle);
  const [body, setBody] = useState(initBody);

  function handleSubmit(e) {
    e.preventDefault();
    const updateObj = {};
    for (const path in paths) {
      updateObj[paths[path] + "/title"] = title;
      updateObj[paths[path] + "/body"] = body;
    }
    ref.update(updateObj);
    setIsEditing(false);
  }

  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onBodyChange(e) {
    setBody(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems="start" margin="4">
            <FormLabel>Edit title</FormLabel>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={onTitleChange}
            />
            <FormLabel>Edit body</FormLabel>
            <Textarea
              type="text"
              id="body"
              value={body}
              onChange={onBodyChange}
            />
            <SaveCancelButton
              action="erase all changes"
              actionOnConfirm={() => setIsEditing(false)}
            />
          </VStack>
        </FormControl>
      </form>
    </>
  );
}

export default EditPost;
