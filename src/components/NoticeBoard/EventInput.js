import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef } from "react";
const EventInput = forwardRef((props, ref) => {
  const { defaultValue, isInvalid } = props;
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel htmlFor="title">Event Name</FormLabel>
      <Input
        placeholder="Event name (e.g. Assignment 1 Discussion)"
        type="text"
        id="event"
        defaultValue={defaultValue}
        ref={ref}
      />
      <FormErrorMessage>
        Event name must contain at least 1 non-whitespace character
      </FormErrorMessage>
    </FormControl>
  );
});

export default EventInput;
