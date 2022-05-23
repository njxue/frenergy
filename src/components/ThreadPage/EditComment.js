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
  ButtonGroup
} from "@chakra-ui/react";
import SaveCancelButton from "../layout/SaveCancelButton";

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
        <SaveCancelButton action="erase all changes" actionOnConfirm={() => setIsEditing(false)}/>
      </form>
      
    </>
  );
}

export default EditComment;
