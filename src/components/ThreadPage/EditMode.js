import { useState, useRef } from "react";

import {
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  Textarea,
} from "@chakra-ui/react";
import SaveCancelButton from "../layout/SaveCancelButton";
 
function EditMode(props) {
  const { contentRef, content, setIsEditing } = props;

  const newContentRef = useRef();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      contentRef.update({
        body: newContentRef.current.value,
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
            defaultValue={content.body}
            ref={newContentRef}
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

export default EditMode;
