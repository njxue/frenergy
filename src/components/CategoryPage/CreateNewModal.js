import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  VStack,
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

    const timestamp = new Date().getTime();
    const post = {
      moduleCode: moduleCode,
      category: category,
      author: currUser.uid,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      createdAt: timeNow,
      timestamp: timestamp,
    };

    const uniqueKey = ref
      .child("posts")
      .child(moduleCode + category)
      .push().key;
    post["postId"] = uniqueKey;

    const updateObject = {
      [`/postsByForums/${moduleCode}/${category}/${uniqueKey}`]: {
        timestamp: timestamp,
      },
      [`/postsByUsers/${currUser.uid}/${uniqueKey}`]: true,
      [`/posts/${uniqueKey}`]: post,

      [`votes/${uniqueKey}/voteCount`]: 0,
    };
    await ref.update(updateObject, (error) => {
      if (error) {
        setError("Unable to create new thread. Please try again!");
      }
      setIsLoading(false);
    });
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        initialFocusRef={titleRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitPost}>
              <VStack spacing={3} align="start">
                <FormControl>
                  <FormLabel>Thread title</FormLabel>
                  <Input
                    type="text"
                    placeholder="title"
                    ref={titleRef}
                    isRequired
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    as="textarea"
                    placeholder="body"
                    ref={bodyRef}
                    isRequired
                  />
                </FormControl>

                <Button colorScheme="green" type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>

        {error && <Alert variant="danger">{error}</Alert>}
      </Modal>
    </>
  );
}

export default CreateNewModal;
