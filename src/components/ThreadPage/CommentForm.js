import {
  FormControl,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  FormLabel,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useTime } from "../../utils/helper";
import { sendPasswordResetEmail } from "firebase/auth";

function CommentForm(props) {
  const { threadId } = props;
  const commentsRef = ref.child("threads").child(threadId).child("comments");

  const postRef = ref.child("threads").child(threadId).child("post");

  const { currUser } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitComment(e) {
    setError("");
    setIsLoading(true);
    e.preventDefault();

    try {
      postRef.once("value", async (snapshot) => {
        const post = await snapshot.val();
        const { author, module, category, title } = post;

        const commentObj = {
          author: { displayName: currUser.displayName, uid: currUser.uid },
          createdAt: timeNow,
          body: comment,
          module: module,
          category: category,
          title: title,
          threadId: threadId
        };

        if (author.uid != currUser.uid) {
          ref.child("notifications").child(author.uid).push(commentObj);
        }

        await commentsRef.push(commentObj);
      });

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
            <Textarea
              type="text"
              placeholder="Comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
