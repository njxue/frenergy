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
import { useAuth } from "../../contexts/AuthContext";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { post, setIsEditing, postRef } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const { currUser } = useAuth();
  const userPostsRef = ref
    .child("postsByUsers")
    .child(currUser.uid)
    .child(post.postId);

  function handleSubmit(e) {
    e.preventDefault();

    postRef.update(
      {
        title: title,
        body: body,
      },
      (error) => {
        if (error) {
          console.log("Unable to edit post. Please try again later.");
        }
      }
    );

    userPostsRef.update(
      {
        title: title,
        body: body,
      },
      (error) => {
        if (error) {
          console.log("Unable to edit post. Please try again later.");
        }
      }
    );
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
