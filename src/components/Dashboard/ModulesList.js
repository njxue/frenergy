import {
  VStack,
  HStack,
  Divider,
  StackDivider,
  Icon,
  Center,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";

import { SmallCloseIcon } from "@chakra-ui/icons";

import EmptyPrompt from "./EmptyPrompt";
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
        {modules[0] ? (
          modules.map((module) => (
            <ModuleItem module={module} key={module.moduleCode} />
          ))
        ) : (
          <EmptyPrompt
            group="modules"
            message="Select modules from the profile page"
          />
        )}
      </VStack>
    </VStack>
  );
}

export default ModulesList;
