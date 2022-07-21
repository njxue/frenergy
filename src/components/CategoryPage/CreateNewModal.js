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
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref, storageRef } from "../../config/firebase";
import { useError, useSuccess, useTime } from "../../utils/helper";
import { SmallCloseIcon } from "@chakra-ui/icons";

function CreateNewModal(props) {
  const { currUser } = useAuth();
  const { moduleCode, category, isOpen, onClose } = props;

  const titleRef = useRef();
  const bodyRef = useRef();
  //const [files, setFiles] = useState([]);

  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [isLoading, setIsLoading] = useState(false);
  const timeNow = useTime();

  /** 
   * 
   * async function addFilesToStorage(fileStorageRef) {
    files.map((file) => {
      try {
        fileStorageRef.child(file.name).put(file);
      } catch (err) {
        setError(`There was an error attaching ${file.name}`);
      }
    });
  }

  */

  async function handleSubmitPost(e) {
    setIsLoading(true);
    e.preventDefault();

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
    //const fileStorageRef = storageRef.child(moduleCode).child(uniqueKey);

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

    //await addFilesToStorage(fileStorageRef);
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
                  <Textarea whiteSpace="pre-wrap" ref={bodyRef} />
                </FormControl>
                {/**
                 *  <FormControl>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const newFile = e.target.files[0];
                      setFiles([...files, newFile]);
                    }}
                  />

                  <HStack>
                    <AttachmentIcon
                      cursor="pointer"
                      onClick={() => {
                        document.querySelector('[type="file"]').click();
                      }}
                    />
                    {files.map((f) => {
                      return (
                        <Box
                          _hover={{ backgroundColor: "#E2E2E2" }}
                          padding={1}
                        >
                          <HStack>
                            <Text fontSize="xs">{f.name}</Text>
                            <SmallCloseIcon
                              cursor="pointer"
                              onClick={() => {
                                const newFiles = files.filter((file) => {
                                  return file.name != f.name;
                                });
                                setFiles(newFiles);
                              }}
                            />
                          </HStack>
                        </Box>
                      );
                    })}
                  </HStack>
                </FormControl>

                 */}

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
