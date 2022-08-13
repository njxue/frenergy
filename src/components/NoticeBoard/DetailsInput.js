import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

const DetailsInput = forwardRef((props, ref) => {
  const { defaultValue, isInvalid } = props;
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel htmlFor="event">Details</FormLabel>
      <Textarea
        id="description"
        as="textarea"
        placeholder="Event details"
        ref={ref}
        defaultValue={defaultValue}
        whiteSpace="pre-wrap"
        isRequired
      />
      <FormErrorMessage>
        Event details must contain at least 1 non-whitespace character
      </FormErrorMessage>
    </FormControl>
  );
});

export default DetailsInput;
