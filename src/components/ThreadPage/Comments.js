import { Card, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

function Comments(props) {
  //console.log("comments re-render");
  const { threadId } = props;
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const commentsRef = ref.child("threads").child(threadId).child("comments");

  useEffect(() => {
    setError("");
    setIsLoading(true);
    try {
      commentsRef.on("value", async (snapshot) => {
        const tmp = [];
        snapshot.forEach((child) => {
          tmp.push(child.val());
        });
        setComments(tmp);
      });
    } catch {
      setError("Unable to load comments. Please try again");
    }
    setIsLoading(false);
  }, [threadId]);

  return (
    <>
      <Loader hidden={!isLoading} />
      {error && <Alert variant="danger">{error}</Alert>}
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
      <div hidden={isLoading}>
        <CommentForm threadId={threadId} />
      </div>
    </>
  );
}

export default Comments;
