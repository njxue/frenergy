import { Form, Button } from "react-bootstrap";
import { ref } from "../../utils/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

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
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmitComment}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default CommentForm;
