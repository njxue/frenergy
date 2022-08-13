import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../utils/helper";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { post, setIsEditing } = props;
  const { setError } = useError();
  const postRef = ref.child(`posts/${post.postId}`);

  const titleRef = useRef();
  const bodyRef = useRef();

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidBody, setInvalidBody] = useState(false);

  const { currUser } = useAuth();
  const userPostsRef = ref
    .child("postsByUsers")
    .child(currUser.uid)
    .child(post.postId);

  function handleSubmit(e) {
    e.preventDefault();
    setInvalidTitle(false);
    setInvalidBody(false);

    //validate title and body
    const title = titleRef.current.value.trim();
    const body = bodyRef.current.value.trim();

    if (title.length == 0) {
      setInvalidTitle(true);
    }

    if (body.length == 0) {
      setInvalidBody(true);
    }

    if (title.length == 0 || body.length == 0) {
      return;
    }

    postRef.update(
      {
        title: title,
        body: body,
      },
      (error) => {
        if (error) {
          setError("Unable to edit post. Please try again later.");
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
          setError("Unable to edit post. Please try again later.");
        }
      }
    );
    setIsEditing(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack alignItems="start" margin="4">
          <FormControl isInvalid={invalidTitle}>
            <FormLabel>Edit title</FormLabel>
            <Input
              type="text"
              id="title"
              defaultValue={post.title}
              ref={titleRef}
              isRequired
            />
            <FormErrorMessage>
              Title must contain at least 1 non-whitespace character
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={invalidBody}>
            <FormLabel>Edit body</FormLabel>
            <Textarea
              defaultValue={post.body}
              ref={bodyRef}
              whiteSpace="pre-wrap"
              isRequired
            />
            <FormErrorMessage>
              Body must contain at least 1 non-whitespace character
            </FormErrorMessage>
          </FormControl>
          <SaveCancelButton
            action="erase all changes"
            actionOnConfirm={() => setIsEditing(false)}
            isLoading={false}
          />
        </VStack>
      </form>
    </>
  );
}

export default EditPost;
