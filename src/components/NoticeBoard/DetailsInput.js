import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const DetailsInput = forwardRef((props, ref) => {
  const { defaultValue, isInvalid } = props;
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel htmlFor="event">Details</FormLabel>
      <Input
        id="description"
        as="textarea"
        placeholder="Event details"
        ref={ref}
        defaultValue={defaultValue}
      />
      <FormErrorMessage>
        Event details must contain at least 1 non-whitespace character
      </FormErrorMessage>
    </FormControl>
  );
});

export default DetailsInput;
