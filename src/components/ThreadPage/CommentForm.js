import {
  FormControl,
  Button,
  Alert,
  FormLabel,
  VStack,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useRef } from "react";
import { useError, useTime } from "../../utils/helper";
import Loader from "../layout/Loader";
import SkeletonLoader from "../layout/SkeletonLoader";

function CommentForm(props) {
  const { post } = props;
  const { author, title, postId, moduleCode, category } = post;
  const { setError } = useError();

  const [invalidComment, setInvaidComment] = useState(false);

  const commentsRef = ref.child("comments").child(postId);
  const notifRef = ref.child("notifications").child(author);

  const { currUser } = useAuth();
  const bodyRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitComment(e) {
    setError("");
    setIsLoading(true);
    setInvaidComment(false);
    e.preventDefault();

    const comment = bodyRef.current.value.trim();

    if (comment.length == 0) {
      setIsLoading(false);
      setInvaidComment(true);
      return;
    }

    const notifBody = comment;
    const notifTitle = `${currUser.displayName} commented on your post ${title}`;

    const commentId = commentsRef.push().key;
    const commentObj = {
      body: comment,
      author: currUser.uid,
      createdAt: timeNow,
      postId: postId,
      deleted: false,
      commentId: commentId,
      location: { moduleCode, category, postId },
    };

    commentsRef.child(commentId).set(commentObj, (error) => {
      if (error) {
        setError("Unable to submit comment. Please try again later");
      } else {
        ref.child(`votes/${commentId}/voteCount`).set(0);
        if (currUser.uid != author) {
          notifRef.push({
            title: notifTitle,
            body: notifBody,
            link: `/${moduleCode}/${category}/${postId}`,
            type: "forum",
          });
        }
      }
    });

    setIsLoading(false);
    bodyRef.current.value = "";
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <form onSubmit={handleSubmitComment}>
        <FormControl isRequired isInvalid={invalidComment}>
          <VStack alignItems="start" margin="4">
            <FormLabel data-testid="label">Add comment</FormLabel>
            <Textarea
              type="text"
              placeholder="Comment"
              required
              ref={bodyRef}
              whiteSpace="pre-wrap"
            />
            <FormErrorMessage>
              Comment must contain at least 1 non-whitespace character
            </FormErrorMessage>
            <Button type="submit" colorScheme="green">
              Submit
            </Button>
          </VStack>
        </FormControl>
      </form>
    </>
  );
}

export default CommentForm;
