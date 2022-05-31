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
import { useProfile } from "../../utils/helper";

function CommentForm(props) {
  const { post } = props;
  const { author, title, postId, moduleCode, category } = post;
  const { username } = useProfile(author);

  const commentsRef = ref.child("comments").child(postId);
  const notifRef = ref.child("notifications").child(author);

  const { currUser } = useAuth();
  const commentRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitComment(e) {
    setError("");
    setIsLoading(true);
    e.preventDefault();

    console.log(commentRef.current);
    const commentObj = {
      body: commentRef.current,
      author: currUser.uid,
      createdAt: timeNow,
      postId: postId,
      deleted: false,
    };

    const notifTitle = `${currUser.displayName} commented on your post ${title}`;
    const notifBody = commentRef.current;

    await commentsRef.push(commentObj);

    if (currUser.uid != author) {
      await notifRef.push({
        title: notifTitle,
        body: notifBody,
        link: `/${moduleCode}/${category}/${postId}`,
        type: "forum"
      });
    }

    setIsLoading(false);
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
              onChange={(e) => {
                commentRef.current = e.target.value;
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
