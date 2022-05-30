import { Button, Form } from "react-bootstrap";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
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
  const { moduleCode, category, isOpen, onClose } = props;
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
      author: currUser.uid,
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
      [`/postsByForums/${moduleCode}/${category}/${uniqueKey}`]: true,
      [`/postsByUsers/${currUser.uid}/${uniqueKey}`]: true,
      [`/posts/${uniqueKey}`]: post,
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
      setIsLoading(false);
    });
  }

  return (
    <>
      <Loader hidden={!isLoading} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </Padder>
            </Form>
          </ModalBody>
        </ModalContent>

        {error && <Alert variant="danger">{error}</Alert>}
      </Modal>
    </>
  );
}

export default CreateNewModal;
