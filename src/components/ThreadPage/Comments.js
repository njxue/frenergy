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

function Comments(props) {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const commentsRef = ref.child("comments").child(postId);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    try {
      commentsRef.on("value", async (snapshot) => {
        const allComments = await snapshot.val();
        const tmp = [];
        for (const k in allComments) {
          tmp.push(Object.assign({ commentId: k }, allComments[k]));
        }
        setComments(tmp);
        setIsLoading(false);
      });
    } catch {
      setError("Unable to load comments. Please try again");
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Loader hidden={!isLoading} />
      {error && (
        <Alert status="danger">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <VStack align="stretch" margin="5" spacing="5">
        {comments.map((comment) => {
          return <Comment comment={comment} postId={postId} />;
        })}
      </VStack>
      <Divider marginTop="5" color="gray.300" />
    </>
  );
}

export default Comments;
