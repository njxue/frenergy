import {
  FormControl,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

function CommentForm(props) {
  const commentsRef = ref
    .child("threads")
    .child(props.threadId)
    .child("comments");

  const { currUser } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  async function handleSubmitComment(e) {
    setError("");
    e.preventDefault();
    const commentObj = {
      author: { displayName: currUser.displayName, uid: currUser.uid },
      createdAt: new Date().toLocaleString(),
      body: comment,
    };
    try {
      await commentsRef.push(commentObj);
      setComment("");
    } catch {
      setError("Unable to submit comment. Please try again!");
    }
  }

  return (
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
            <Input
              type="text"
              placeholder="Comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" colorScheme="green">Submit</Button>
          </VStack>
        </FormControl>
      </form>
    </>
  );
}

export default CommentForm;
