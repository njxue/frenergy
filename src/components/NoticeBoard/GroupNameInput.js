import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Tooltip,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";

const GroupNameInput = forwardRef((props, ref) => {
  const { groupName, setGroupName, isInvalid } = props;
  const dogBreeds = require("dog-breeds");

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel htmlFor="groupName">Group Name</FormLabel>
      <InputGroup>
        <Input
          id="groupName"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          ref={ref}
        />
        <Tooltip label="Random">
          <InputRightElement>
            <Icon
              as={GiPerspectiveDiceSixFacesOne}
              cursor="pointer"
              onClick={() => setGroupName(dogBreeds.random().name)}
            />
          </InputRightElement>
        </Tooltip>
      </InputGroup>
      <FormErrorMessage>
        Group name must contain at least 1 non-whitespace character
      </FormErrorMessage>
    </FormControl>
  );
});

export default GroupNameInput;
