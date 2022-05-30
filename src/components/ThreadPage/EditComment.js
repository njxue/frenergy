import { useState, useRef } from "react";

import {
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  Textarea,
} from "@chakra-ui/react";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditComment(props) {
  const { commentRef, comment, setIsEditing } = props;
  const newCommentRef = useRef();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      commentRef.update({
        body: newCommentRef.current.value,
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
          <Textarea
            type="text"
            defaultValue={comment.body}
            ref={newCommentRef}
          />
        </FormControl>
        <SaveCancelButton
          action="erase all changes"
          actionOnConfirm={() => setIsEditing(false)}
          isLoading={false}
        />
      </form>
    </>
  );
}

export default EditComment;
