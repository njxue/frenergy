import {
  Box,
  Flex,
  VStack,
  Heading,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SelectModules from "./SelectModules";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../contexts/UserInfoContext";

function UserModules() {
  const { modules, removeModule } = useUserInfoContext();
  const navigate = useNavigate();

  function handleRemove(module) {
    removeModule(module);
  }

  return (
    <Flex direction="row" alignItems="top" wrap="wrap" padding={3}>
      <VStack alignItems="stretch" padding={3}>
        <Heading fontSize="lg" fontFamily="arial">
          MY MODULES
        </Heading>
        {modules.map((m) => (
          <HStack key={m.moduleCode}>
            <Button
              w="100%"
              variant="ghost"
              onClick={() => navigate("/" + m.moduleCode)}
              colorScheme="black"
              padding={0}
            >
              <Flex alignItems="start" w="100%" flexDirection="column">
                <Text>{m.moduleCode}</Text>
                <Text fontSize="xs" noOfLines={1}>
                  {m.title}
                </Text>
              </Flex>
            </Button>
            <SmallCloseIcon onClick={() => handleRemove(m)} />
          </HStack>
        ))}
      </VStack>

      <SelectModules />
    </Flex>
  );
}

export default UserModules;
