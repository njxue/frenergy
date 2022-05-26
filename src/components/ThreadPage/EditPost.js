import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  StackItem,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";

import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { post, setIsEditing, postRef } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(title);
    postRef.update({
      title: title,
      body: body,
    });
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
