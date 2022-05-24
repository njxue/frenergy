import { Badge, HStack, Stack, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function ThreadBox(props) {
  const { pinnedThread } = props;
  const { module, category, title, threadId } = pinnedThread;
  const navigate = useNavigate();
  function handleClick() {
    navigate(`${module}/${category}/${threadId}`);
  }

  return (
    <Stack
      alignItems="start"
      overflowY="hidden"
      overflowX="hidden"
      onClick={handleClick}
      spacing="0"
      borderRadius="10px"
      padding="2"
      border="solid"
      borderColor="darkblue"
      borderWidth="1px"
      maxW="100vw"
      w="100%"
    >
      <HStack spacing="1">
        <Badge bg="red" color="white">
          {module}
        </Badge>
        <Badge bg="darkblue" color="white">
          {category}
        </Badge>
      </HStack>
      <Text
        maxW="100vw"
        noOfLines={0}
      >{`${title}`}</Text>
    </Stack>
  );
}

export default ThreadBox;
