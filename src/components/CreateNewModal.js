import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import classes from "../static/CreateNewModal.module.css";
import Padder from "./layout/Padder";
import { ref } from "../utils/firebase";

function CreateNewModal(props) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const threadsRef = ref.child("threads");
  const categoryRef = ref
    .child("moduleforums")
    .child(props.mod)
    .child(props.cat);

  const { currUser } = useAuth();

  function handleSubmitThread(e) {
    const thread = {
      module: props.mod,
      category: props.cat,
      author: currUser.uid,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      upvotes: 0,
      downvotes: 0,
    };
    console.log(thread);
    try {
      const uniqueKey = threadsRef.push(thread).getKey();
      ref.child("users").child(currUser.uid).child("threads").push(uniqueKey);
      categoryRef.child("threads").push(uniqueKey);
      categoryRef.transaction((category) => {
        console.log(category);
        if (category.numThreads) {
          category.numThreads++;
        } else {
          category.numThreads = 1;
        }
        return category;
      });
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
