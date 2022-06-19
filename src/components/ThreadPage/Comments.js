import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import Comment from "./Comment";

import {
  AlertIcon,
  AlertTitle,
  Divider,
  Alert,
  VStack,
} from "@chakra-ui/react";
import Replies from "./Replies";
import SkeletonLoader from "../layout/SkeletonLoader";

function Comments(props) {
  const { postId } = props;
  const [comments, setComments] = useState();
  const [error, setError] = useState("");
  const commentsRef = ref.child("comments").child(postId);

  useEffect(() => {
    setError("");
    try {
      commentsRef.on("value", async (snapshot) => {
        const allComments = await snapshot.val();
        const tmp = [];
        for (const k in allComments) {
          tmp.push(Object.assign({ commentId: k }, allComments[k]));
        }
        setComments(tmp);
      });
    } catch {
      setError("Unable to load comments. Please try again");
    }
  }, []);

  return comments == undefined ? (
    <SkeletonLoader />
  ) : (
    <>
      {error && (
        <Alert status="danger">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <VStack align="stretch" margin="5" spacing="5">
        {comments.map((comment) => (
          <VStack align="stretch">
            <Comment comment={comment} />
            <Replies commentId={comment.commentId} />
          </VStack>
        ))}
      </VStack>
      <Divider marginTop="5" color="gray.300" />
    </>
  );
}

export default Comments;
