import { Button, Form, Modal } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Padder from "../layout/Padder";
import { ref } from "../../config/firebase";
import { increment } from "firebase/database";
import { Alert } from "react-bootstrap";
import Loader from "../layout/Loader";
import { useTime } from "../../utils/helper";
function CreateNewModal(props) {
  const titleRef = useRef();
  const bodyRef = useRef();

  const { currUser } = useAuth();
  const { moduleCode, category, setShow } = props;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitPost(e) {
    setIsLoading(true);
    e.preventDefault();
    setError("");

    const post = {
      moduleCode: moduleCode,
      category: category,
      author: {
        displayName: currUser.displayName,
        uid: currUser.uid,
        photoURL: currUser.photoURL,
      },
      title: titleRef.current.value,
      body: bodyRef.current.value,
      createdAt: timeNow,
      timestamp: -1 * new Date().getTime(),
      voteCount: 0,
    };

    const uniqueKey = ref
      .child("posts")
      .child(moduleCode + category)
      .push().key;
    post["postId"] = uniqueKey;

    const updateObject = {
      [`/posts/${moduleCode + category}/${uniqueKey}/post`]: post,
      [`/postsByUsers/${currUser.uid}/${uniqueKey}`]: post,
      [`/moduleforums/${moduleCode}/${category}/numThreads`]: increment(1),
      [`/moduleforums/${moduleCode}/${category}/mostRecent`]: {
        time: timeNow,
        title: post.title,
      },
    };
    await ref.update(updateObject, (error) => {
      if (error) {
        setError("Unable to create new thread. Please try again!");
      }
      setShow(false);
      setIsLoading(false);
    });
  }

  return (
    <>
      <Loader hidden={!isLoading} />
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
              <Button variant="primary" type="submit" disabled={isLoading}>
                Submit
              </Button>
            </Padder>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateNewModal;
