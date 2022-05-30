import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  StackItem,
  Textarea,
} from "@chakra-ui/react";

import { useState, useRef } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { post, setIsEditing, postRef } = props;
  const titleRef = useRef(post.title);
  const bodyRef = useRef(post.body);

  const { currUser } = useAuth();
  const userPostsRef = ref
    .child("postsByUsers")
    .child(currUser.uid)
    .child(post.postId);

  function handleSubmit(e) {
    e.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems="start" margin="4">
            <FormLabel>Edit title</FormLabel>
            <Input
              type="text"
              id="title"
              defaultValue={post.title}
              ref={titleRef}
            />
            <FormLabel>Edit body</FormLabel>
            <Textarea
              type="text"
              id="body"
              defaultValue={post.body}
              ref={bodyRef}
            />
            <SaveCancelButton
              action="erase all changes"
              actionOnConfirm={() => setIsEditing(false)}
              isLoading={false}
            />
          </VStack>
        </FormControl>
      </form>
    </>
  );
}

export default EditPost;
