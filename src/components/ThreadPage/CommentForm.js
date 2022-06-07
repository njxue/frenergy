import {
  FormControl,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  FormLabel,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useRef } from "react";
import { useTime } from "../../utils/helper";
import Loader from "../layout/Loader";

function CommentForm(props) {
  const { post } = props;
  const { author, title, postId, moduleCode, category } = post;

  const commentsRef = ref.child("comments").child(postId);
  const notifRef = ref.child("notifications").child(author);

  const { currUser } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitComment(e) {
    setError("");
    setIsLoading(true);
    e.preventDefault();

    const notifTitle = `${currUser.displayName} commented on your post ${title}`;
    const notifBody = comment;

    const commentId = commentsRef.push().key;
    const commentObj = {
      body: comment,
      author: currUser.uid,
      createdAt: timeNow,
      postId: postId,
      deleted: false,
      voteCount: 0,
      commentId: commentId,
      location: { moduleCode, category, postId },
    };

    commentsRef.child(commentId).set(commentObj);

    if (currUser.uid != author) {
      await notifRef.push({
        title: notifTitle,
        body: notifBody,
        link: `/${moduleCode}/${category}/${postId}`,
        type: "forum",
      });
    }

    setIsLoading(false);
    setComment("");
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmitComment}>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormControl>
          <VStack alignItems="start" margin="4">
            <FormLabel>Add comment</FormLabel>
            <Textarea
              type="text"
              placeholder="Comment"
              required
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
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
