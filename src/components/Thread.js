import { ref } from "../utils/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./layout/Loader";
import { Card, Form, Button } from "react-bootstrap";
import CommentForm from "./CommentForm";

function Thread() {
  const { threadId } = useParams();
  const threadsRef = ref.child("threads").child(threadId);

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  function loadThread() {
    threadsRef.once("value", async (snapshot) => {
      const thread = await snapshot.val();

      setPost(thread.post);
      if (comments in thread) {
        setComments(thread.comments);
      }
      setIsLoading(false);
    });
  }

  useEffect(loadThread, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <Card>
          <Card.Header>
            <div>{post.author.displayName}</div>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <CommentForm threadId={threadId}/>
      </div>
    </div>
  );
}

export default Thread;
