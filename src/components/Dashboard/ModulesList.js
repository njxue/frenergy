import { VStack, HStack } from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function ModulesList(props) {
  const { editable } = props;
  const { modules, removeModule } = useUserInfoContext();
  const navigate = useNavigate();

  function handleRemove(module) {
    removeModule(module);
  }

  return (
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
              <Text fontSize="xs">{m.title}</Text>
            </Flex>
          </Button>
          {editable && <SmallCloseIcon onClick={() => handleRemove(m)} />}
        </HStack>
      ))}
    </VStack>
  );
}

export default ModulesList;
