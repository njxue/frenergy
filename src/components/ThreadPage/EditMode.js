import { useState, useRef } from "react";

import {
  Divider,
  FormControl,
  FormErrorMessage,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import SaveCancelButton from "../layout/SaveCancelButton";
import { useError } from "../../utils/helper";

function EditMode(props) {
  const { contentRef, content, contentName, setIsEditing } = props;
  const [invalidContent, setInvaidContent] = useState(false);

  const newContentRef = useRef();
  const { setError } = useError();

  function handleSubmit(e) {
    e.preventDefault();

    const newContent = newContentRef.current.value.trim();
    if (newContent.length == 0) {
      setInvaidContent(true);
      return;
    }

    try {
      contentRef.update({
        body: newContent,
      });
    } catch {
      setError("Unable to save changes");
    }
    setIsEditing(false);
    newContentRef.current.value = "";
  }

  return (
    <VStack align="stretch">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={invalidContent}>
          <Textarea
            type="text"
            defaultValue={content.body}
            ref={newContentRef}
            whiteSpace="pre-wrap"
          />
          <FormErrorMessage>
            {contentName} must contain at least 1 non-whitespace character
          </FormErrorMessage>
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
