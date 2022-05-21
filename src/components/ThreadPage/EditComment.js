import { useState } from "react";
import ConfirmationModal from "../layout/ConfirmationModal";
import {
  FormControl,
  Input,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

function EditComment(props) {
  const { commentRef, comment, setIsEditing } = props;
  const [newComment, setNewComment] = useState(comment.body);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    try {
      commentRef.update({
        body: newComment,
      });
    } catch {
      setError("Unable to save changes");
    }
    setIsEditing(false);
  }
  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Save changes</Button>
        <Button onClick={onOpen}>Cancel</Button>
      </form>
      <ConfirmationModal
        isOpen={isOpen}
        action={"erase all edits"}
        onClose={onClose}
        actionOnConfirm={() => setIsEditing(false)}
      />
    </>
  );
}

export default EditComment;
