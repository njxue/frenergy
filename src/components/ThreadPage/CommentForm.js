import {
  FormControl,
  Button,
  Alert,
  FormLabel,
  VStack,
  Textarea,
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

  const commentsRef = ref.child("comments").child(postId);
  const notifRef = ref.child("notifications").child(author);

  const { currUser } = useAuth();
  const [comment, setComment] = useState("");

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
    setComment("");
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <>
      <form onSubmit={handleSubmitComment}>
        <FormControl>
          <VStack alignItems="start" margin="4">
            <FormLabel data-testid="label">Add comment</FormLabel>
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
