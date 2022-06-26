import {
  Box,
  Flex,
  VStack,
  Heading,
  HStack,
  Button,
  Text,
  Center,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SelectModules from "./SelectModules";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useUserModules } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";
import ModuleItem from "../Dashboard/ModuleItem";
import Loader from "../layout/Loader";

function UserModules() {
  const { modules, removeModule } = useUserModules();
  const navigate = useNavigate();

  function handleRemove(module) {
    removeModule(module);
  }

  return modules == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="start"
      divider={<StackDivider borderColor="white" borderWidth={1} />}
      minW="300px"
      w="550px"
      maxW="90vw"
      padding={2}
      bg="#F0ECEC"
      maxH="370px"
      borderRadius="10px"
    >
      <Heading size="md">MY MODULES</Heading>
      <Flex
        direction="row"
        alignItems="top"
        wrap="wrap"
        padding={3}
        justifyContent="space-between"
        w="100%"
      >
        <Box w="48%">
          <VStack alignItems="stretch" padding={3} maxH="300px" overflow="auto">
            {modules.length > 0 ? (
              modules.map((m) => (
                <HStack>
                  <ModuleItem module={m} />
                  <Center
                    bg="white"
                    h="100%"
                    padding={1}
                    shadow="md"
                    onClick={() => handleRemove(m.moduleCode)}
                    cursor="pointer"
                    _hover={{ backgroundColor: "#AE0000", color: "white" }}
                  >
                    <SmallCloseIcon />
                  </Center>
                </HStack>
              ))
            ) : (
              <Center>
                <Text color="gray">No modules selected</Text>
              </Center>
            )}
          </VStack>
        </Box>
        <Box w="50%">
          <SelectModules />
        </Box>
      </Flex>
    </VStack>
  );
}

export default UserModules;
