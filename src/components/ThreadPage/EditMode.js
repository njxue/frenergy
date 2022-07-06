import { useState, useRef } from "react";

import { Divider, FormControl, Textarea, VStack } from "@chakra-ui/react";
import SaveCancelButton from "../layout/SaveCancelButton";
import { useError } from "../../utils/helper";

function EditMode(props) {
  const { contentRef, content, setIsEditing } = props;

  const newContentRef = useRef();
  const { setError } = useError();

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
    <VStack align="stretch">
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
    </VStack>
  );
}

export default EditMode;
