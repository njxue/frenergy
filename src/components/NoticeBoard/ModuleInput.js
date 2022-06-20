import { VStack, HStack, Text, Tooltip } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import ModuleFilter from "./ModuleFilter";

function ModuleInput(props) {
  const { module, setModule } = props;
  return (
    <VStack spacing={2} align="start">
      <HStack align="center">
        <Text>Related Module</Text>
        <Tooltip label="Users are able to filter the notices via module code. Select `None` if your notice is not module-specific">
          <QuestionIcon />
        </Tooltip>
      </HStack>
      <ModuleFilter module={module} setModule={setModule} />
    </VStack>
  );
}

export default ModuleInput;
