import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";

function GroupNameInput(props) {
  const { groupName, setGroupName } = props;
  const dogBreeds = require("dog-breeds");

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="groupName">Group Name</FormLabel>
      <InputGroup>
        <Input
          id="groupName"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}z
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
    </FormControl>
  );
}

export default GroupNameInput;
