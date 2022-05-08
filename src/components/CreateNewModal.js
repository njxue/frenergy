import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef } from "react";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import classes from "../static/CreateNewModal.module.css";
import Padder from "./layout/Padder";

const db = "https://study-e0762-default-rtdb.firebaseio.com";

function CreateNewModal(props) {
  const path = db + "/" + props.mod + "/" + props.cat + ".json";
  const titleRef = useRef();
  const bodyRef = useRef();
  const { currUser } = useAuth();

  function handleSubmit(e) {
    try {
      const data = {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        views: 100,
        recent: currUser.displayName,
      };

      fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(() => console.log("posted"));
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
        <Form onSubmit={handleSubmit}>
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
