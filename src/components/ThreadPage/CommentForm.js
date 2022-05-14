import { Card, Form, Button } from "react-bootstrap";
import { ref } from "../../utils/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useRef, useState } from "react";
import { serverTimestamp } from "firebase/database";

function CommentForm(props) {
  const commentsRef = ref
    .child("threads")
    .child(props.threadId)
    .child("comments");
  const commentRef = useRef();


  const { currUser } = useAuth();

  function handleSubmitComment() {
    const comment = {
      author: { displayName: currUser.displayName, uid: currUser.uid },
      createdAt: new Date().toLocaleString(),
      body: commentRef.current.value,
    };
    commentsRef.push(comment);
  }

  return (
    <Form onSubmit={handleSubmitComment}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="comment"
          ref={commentRef}
        ></Form.Control>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

export default CommentForm;
