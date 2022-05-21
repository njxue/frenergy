import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useDisclosure
} from "@chakra-ui/react";

import { useState } from "react";
import { ref } from "../../config/firebase";
import ConfirmationModal from "../layout/ConfirmationModal";

function EditMode(props) {
  const { initTitle, initBody, setEditMode, paths } = props;
  const [title, setTitle] = useState(initTitle);
  const [body, setBody] = useState(initBody);

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSubmit(e) {
    e.preventDefault();
    const updateObj = {};
    for (const path in paths) {
      updateObj[paths[path] + "/title"] = title;
      updateObj[paths[path] + "/body"] = body;
    }
    ref.update(updateObj);
    setEditMode(false);
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
        <FormControl>
          <FormLabel>Edit title</FormLabel>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={onTitleChange}
          />
          <FormLabel>Edit body</FormLabel>
          <Input type="text" id="body" value={body} onChange={onBodyChange} />
          <Button type="submit">Save changes</Button>
          <Button onClick={onOpen}>Cancel</Button>
        </FormControl>
      </form>
      <ConfirmationModal isOpen={isOpen} action={"erase all edits"} onClose={onClose} actionOnConfirm={() => setEditMode(false)}/>
    </>
  );
}

export default EditMode;
