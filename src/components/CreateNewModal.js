import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import classes from "../static/CreateNewModal.module.css";
import Padder from "./layout/Padder";
import { ref } from "../utils/firebase";
import { increment, serverTimestamp } from "firebase/database";

function CreateNewModal(props) {
  const titleRef = useRef();
  const bodyRef = useRef();

  const { currUser } = useAuth();
  function handleSubmitPost(e) {
    const timeNow = new Date().toLocaleString();
    const post = {
      module: props.mod,
      category: props.cat,
      author: { displayName: currUser.displayName, uid: currUser.uid },
      title: titleRef.current.value,
      body: bodyRef.current.value,
      votes: 0,
      createdAt: timeNow,
      timestamp: -1 * new Date().getTime()
    };

    try {
      // get the uniqueKey
      const uniqueKey = ref.child("threads").push().key;

      post["threadId"] = uniqueKey;

      const moduleForumsRef = "/moduleforums/" + props.mod + "/" + props.cat;
      const numThreadsRef = moduleForumsRef + "/numThreads";
      const mostRecentRef = moduleForumsRef + "/mostRecent";
      const postsRef = "/posts/" + props.mod + props.cat + "/" + uniqueKey;
      const threadsRef = "/threads/" + uniqueKey + "/post";
      const postsByUsersRef = "/postsByUsers/" + currUser.uid + "/" + uniqueKey;

      // object for multi-paths update
      const updateObject = {
        [postsRef]: post,
        [threadsRef]: post,
        [postsByUsersRef]: post,
        [numThreadsRef]: increment(1),
        [mostRecentRef]: timeNow,
      };

      ref.update(updateObject);
    } catch {
      console.log("error");
    }
  }

  return (
    <Modal size="lg" show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create new thread</Modal.Title>
      </Modal.Header>
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
            <Button
              variant="primary"
              type="submit"
              onClick={() => props.setShow(false)}
            >
              Submit
            </Button>
          </Padder>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewModal;
