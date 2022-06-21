import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { forwardRef } from "react";
const EventInput = forwardRef((props, ref) => {
  const { defaultValue } = props;
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="title">Event Name</FormLabel>
      <Input
        placeholder="Event name (e.g. Assignment 1 Discussion)"
        type="text"
        id="event"
        defaultValue={defaultValue}
        ref={ref}
      />
    </FormControl>
  );
});

export default EventInput;
