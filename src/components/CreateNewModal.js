import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import classes from "../static/CreateNewModal.module.css";
import Padder from "./layout/Padder";
import { ref } from "../utils/firebase";
import { increment } from "firebase/database";

function CreateNewModal(props) {
  const titleRef = useRef();
  const bodyRef = useRef();

  const moduleForumsRef = ref.child("moduleforums");
  const threadsRef = ref.child("threads");

  const { currUser } = useAuth();
  function handleSubmitThread(e) {
    const thread = {
      module: props.mod,
      category: props.cat,
      author: { displayName: currUser.displayName, uid: currUser.uid },
      title: titleRef.current.value,
      body: bodyRef.current.value,
      upvotes: 0,
      downvotes: 0,
    };

    try {
      // store thread contents inside threads collection
      const uniqueKey = threadsRef.push(thread).getKey();

      // store thread contents inside threads subcollection inside moduleforum collection
      moduleForumsRef
        .child(props.mod)
        .child(props.cat)
        .child("threads")
        .push(thread);

      // increment the number of threads
      moduleForumsRef
        .child(props.mod)
        .child(props.cat)
        .child("numThreads")
        .set({
          numThreads: increment(1),
        });

      // store thread key inside threads subcollection inside users collection
      ref.child("users").child(currUser.uid).child("threads").push(uniqueKey);
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
        <Form onSubmit={handleSubmitThread}>
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
