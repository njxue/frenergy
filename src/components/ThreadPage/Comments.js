import { Card, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ref } from "../../utils/firebase";
import Loader from "../layout/Loader";
import CommentForm from "./CommentForm";

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
        return (
          <Card>
            <Card.Header>
              <div>{comment.author.displayName}</div>
              <div>{comment.createdAt}</div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      <div hidden={isLoading}>
        <CommentForm threadId={threadId} />
      </div>
    </>
  );
}

export default Comments;
