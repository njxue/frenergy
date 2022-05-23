import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Button,
  useDisclosure,
  Flex,
  VStack,
  Spacer,
  StackItem,
} from "@chakra-ui/react";

import { useState } from "react";
import { ref } from "../../config/firebase";
import ConfirmationModal from "../layout/ConfirmationModal";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditPost(props) {
  const { initTitle, initBody, setIsEditing, paths } = props;
  const [title, setTitle] = useState(initTitle);
  const [body, setBody] = useState(initBody);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmit(e) {
    e.preventDefault();
    const updateObj = {};
    for (const path in paths) {
      updateObj[paths[path] + "/title"] = title;
      updateObj[paths[path] + "/body"] = body;
    }
    ref.update(updateObj);
    setIsEditing(false);
  }

  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onBodyChange(e) {
    setBody(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl paddingLeft="4">
          <VStack spacing="4">
            <StackItem>
              <FormLabel>Edit title</FormLabel>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={onTitleChange}
              />
            </StackItem>
            <StackItem>
              <FormLabel>Edit body</FormLabel>
              <Input
                type="text"
                id="body"
                value={body}
                onChange={onBodyChange}
              />
            </StackItem>
            <SaveCancelButton
              action="erase all changes"
              actionOnConfirm={() => setIsEditing(false)}
            />
          </VStack>
        </FormControl>
      </form>
    </>
  );
}

export default EditPost;
