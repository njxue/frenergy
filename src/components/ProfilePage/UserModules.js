import { Box, Flex } from "@chakra-ui/react";
import ModulesList from "../Dashboard/ModulesList";
import SelectModules from "./SelectModules";

function UserModules() {
  return (
    <Flex
      direction="row"
      alignItems="top"
      maxW="50vw"
      wrap="wrap"
      border="solid"
      borderWidth="1px"
      padding={3}
      borderRadius="20px"
    >
      <ModulesList editable={true} />

      <SelectModules />
    </Flex>
  );
}

export default UserModules;
