import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import AuthProvider, { useAuth } from "../../contexts/AuthContext";
import classes from "../../static/CreateNewModal.module.css";
import Padder from "../layout/Padder";
import { ref } from "../../utils/firebase";
import { increment, serverTimestamp } from "firebase/database";
import { Alert } from "react-bootstrap";

function CreateNewModal(props) {
  const titleRef = useRef();
  const bodyRef = useRef();

  const { currUser } = useAuth();
  const { moduleCode, category, setShow } = props;
  const [error, setError] = useState("");

  function handleSubmitPost(e) {
    e.preventDefault();
    setError("");
    
    const timeNow = new Date().toLocaleString();

    const post = {
      module: moduleCode,
      category: category,
      author: { displayName: currUser.displayName, uid: currUser.uid },
      title: titleRef.current.value,
      body: bodyRef.current.value,
      votes: 0,
      createdAt: timeNow,
      timestamp: -1 * new Date().getTime(),
    };

    try {
      // get the uniqueKey
      const uniqueKey = ref.child("threads").push().key;
      post["threadId"] = uniqueKey;
      // object for multi-paths update
      const updateObject = {
        [`/posts/${moduleCode+category}/${uniqueKey}`]: post,
        [`/threads/${uniqueKey}/post`]: post,
        [`/postsByUsers/${currUser.uid}/${uniqueKey}`]: post,
        [`/moduleforums/${moduleCode}/${category}/numThreads`]: increment(1),
        [`/moduleforums/${moduleCode}/${category}/mostRecent`]: timeNow
      };
      ref.update(updateObject).then((error) => {
        setShow(false);
      });
    } catch {
      setError("Unable to create new thread. Please try again!");
    }
  }

  return (
    <Modal size="lg" show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create new thread</Modal.Title>
      </Modal.Header>
      {error && <Alert variant="danger">{error}</Alert>}
      <Modal.Body>
        <Form onSubmit={handleSubmitPost}>
          <Padder>
            <Form.Group>
              <Form.Label>Thread title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                ref={titleRef}
                required
              />
            </Form.Group>
          </Padder>
          <Padder>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="body"
                ref={bodyRef}
                required
              />
            </Form.Group>
          </Padder>
          <Padder>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Padder>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewModal;
