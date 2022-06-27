import { Center, VStack, Text, Divider } from "@chakra-ui/react";

function EmptyPrompt(props) {
  const { group, message } = props;
  return (
    <Center>
      <VStack spacing={3}>
        <VStack>
          <Text color="gray">No {group}</Text>
          <Text color="gray">¯\_(ツ)_/¯</Text>
        </VStack>
        <Divider color="gray.200" />
        <Text color="gray">{message}</Text>
      </VStack>
    </Center>
  );
}

export default EmptyPrompt;
