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
  Box,
  Input,
  Textarea,
  VStack,
  Icon,
  Text,
  HStack,
  background,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref, storageRef } from "../../config/firebase";
import { useError, useSuccess, useTime } from "../../utils/helper";
import { SmallCloseIcon } from "@chakra-ui/icons";
import FileInput from "./FileInput";

function CreateNewModal(props) {
  const { currUser } = useAuth();
  const { moduleCode, category, isOpen, onClose } = props;

  const titleRef = useRef();
  const bodyRef = useRef();
  const [files, setFiles] = useState([]);

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidBody, setInvalidBody] = useState(false);

  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  async function addFilesToStorage(fileStorageRef) {
    const req = files.map(async (file) => {
      try {
        await fileStorageRef.child(file.name).put(file);
      } catch (err) {
        setError(`There was an error attaching ${file.name}`);
      }
    });
    await Promise.all(req);
    console.log("done");
  }

  async function handleSubmitPost(e) {
    setIsLoading(true);
    setInvalidTitle(false);
    setInvalidBody(false);

    e.preventDefault();

    //validate title and body
    const title = titleRef.current.value.trim();
    const body = bodyRef.current.value.trim();

    if (title.length == 0) {
      setInvalidTitle(true);
    }

    if (body.length == 0) {
      setInvalidBody(true);
    }

    if (title.length == 0 || body.length == 0) {
      setIsLoading(false);
      return;
    }

    const timestamp = new Date().getTime();

    const post = {
      moduleCode: moduleCode,
      category: category,
      author: currUser.uid,
      title: title,
      body: body,
      createdAt: timeNow,
      timestamp: timestamp,
    };

    const uniqueKey = ref
      .child("posts")
      .child(moduleCode + category)
      .push().key;

    post["postId"] = uniqueKey;
    const fileStorageRef = storageRef.child(moduleCode).child(uniqueKey);

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
    });

    await addFilesToStorage(fileStorageRef);

    setIsLoading(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setFiles([]);
          onClose();
        }}
        size="2xl"
        initialFocusRef={titleRef}
      >
        <ModalOverlay />
        <ModalContent data-testid="modal">
          <ModalHeader>Create new thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitPost}>
              <VStack spacing={3} align="start">
                <FormControl isInvalid={invalidTitle}>
                  <FormLabel>Thread title</FormLabel>
                  <Input
                    type="text"
                    placeholder="title"
                    ref={titleRef}
                    isRequired
                    data-testid="titleInput"
                  />
                  <FormErrorMessage>
                    Title must contain at least 1 non-whitespace character
                  </FormErrorMessage>
                </FormControl>

                <FormControl data-testid="bodyInput" isInvalid={invalidBody}>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    whiteSpace="pre-wrap"
                    ref={bodyRef}
                    placeholder="body"
                    isRequired
                  />
                  <FormErrorMessage>
                    Body must contain at least 1 non-whitespace character
                  </FormErrorMessage>
                </FormControl>

                <FileInput files={files} setFiles={setFiles} limit={5} />

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
