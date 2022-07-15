import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../config/firebase";
import { useError, useSuccess, useTime } from "../../utils/helper";
import RichEditor from "../layout/RichEditor";
import firebase from "firebase/compat/app";

//TODO: add error message
function CreateNewModal(props) {
 
  const titleRef = useRef();
  const bodyRef = useRef();

  const [body, setBody] = useState("");

  const { currUser } = useAuth();
  const { moduleCode, category, isOpen, onClose } = props;

  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function handleSubmitPost(e) {
    setIsLoading(true);
    e.preventDefault();

    const timestamp = new Date().getTime();
    const post = {
      moduleCode: moduleCode,
      category: category,
      author: currUser.uid,
      title: titleRef.current.value,
      //body: bodyRef.current.value,
      body: body,
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
      } else {
        setSuccess("New post created!");
        onClose();
      }
      setIsLoading(false);
    });
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
        <ModalContent data-testid="modal">
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
                    data-testid="titleInput"
                  />
                </FormControl>

                <FormControl data-testid="bodyInput">
                  <FormLabel>Content</FormLabel>
                  <RichEditor setBody={setBody} />
                </FormControl>

                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isLoading}
                  data-testid="submitBtn"
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateNewModal;
