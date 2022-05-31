import { Box, Flex } from "@chakra-ui/react";
import ModulesList from "../Dashboard/ModulesList";
import SelectModules from "./SelectModules";

function UserModules() {
  return (
    <Flex direction="row" alignItems="top" wrap="wrap" padding={3}>
      <ModulesList editable={true} />

      <SelectModules />
    </Flex>
  );
}

export default UserModules;
