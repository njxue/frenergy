import { VStack, HStack, Divider, StackDivider, Icon } from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import ModuleItem from "./ModuleItem";
import { useAuth } from "../../contexts/AuthContext";
import { GiOpenBook } from "react-icons/gi";
import { useUserModules } from "../../utils/helper";

function ModulesList() {
  const { modules } = useUserModules();

  return (
    <VStack
      align="start"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
    >
      <HStack>
        <Heading fontSize="lg" fontFamily="arial">
          MY MODULES
        </Heading>
        <Icon as={GiOpenBook} />
      </HStack>

      <VStack
        alignItems="stretch"
        padding={3}
        h="500px"
        overflow="auto"
        w="100%"
      >
        {modules.map((module) => (
          <ModuleItem module={module} key={module.moduleCode} />
        ))}
      </VStack>
    </VStack>
  );
}

export default ModulesList;
