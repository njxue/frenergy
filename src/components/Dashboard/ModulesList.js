import {
  VStack,
  HStack,
  Divider,
  StackDivider,
  Icon,
  Center,
  Text,
  Heading,
  Skeleton,
} from "@chakra-ui/react";

import EmptyPrompt from "./EmptyPrompt";
import ModuleItem from "./ModuleItem";
import { useAuth } from "../../contexts/AuthContext";
import { GiOpenBook } from "react-icons/gi";
import { useUserModules } from "../../utils/helper";
import Loader from "../layout/Loader";

function ModulesList() {
  const { currUser } = useAuth();
  const { modules } = useUserModules(currUser.uid);

  return modules == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="start"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
      h="500px"
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
        maxH="inherit"
        overflow="auto"
        w="100%"
      >
        {modules.length > 0 ? (
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
