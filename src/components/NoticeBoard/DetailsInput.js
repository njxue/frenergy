import { forwardRef } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const DetailsInput = forwardRef((props, ref) => {
  const { defaultValue } = props;
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="event">Details</FormLabel>
      <Input
        id="description"
        as="textarea"
        placeholder="Event details"
        ref={ref}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
});

export default DetailsInput;
