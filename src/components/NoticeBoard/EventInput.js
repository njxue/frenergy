import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { forwardRef } from "react";
const EventInput = forwardRef((props, ref) => (
  <FormControl isRequired>
    <FormLabel htmlFor="title">Event Name</FormLabel>
    <Input
      placeholder="Event name (e.g. Assignment 1 Discussion)"
      type="text"
      id="event"
      ref={ref}
    />
  </FormControl>
));

export default EventInput;
