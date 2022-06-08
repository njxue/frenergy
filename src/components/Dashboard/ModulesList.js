import { VStack, HStack } from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import ModuleItem from "./ModuleItem";

function ModulesList(props) {
  const { editable } = props;
  const { modules, removeModule } = useUserInfoContext();

  function handleRemove(module) {
    removeModule(module);
  }

  return (
    <VStack alignItems="stretch" padding={3}>
      <Heading fontSize="lg" fontFamily="arial">
        MY MODULES
      </Heading>
      {modules.map((module) => (
        <ModuleItem module={module} key={module.moduleCode} />
      ))}
    </VStack>
  );
}

export default ModulesList;
