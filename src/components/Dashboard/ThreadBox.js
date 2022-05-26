import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ThreadBox(props) {
  const { post } = props;

  const { moduleCode, category, title, postId, author } = post;

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/${moduleCode}/${category}/${postId}`);
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
      maxW="500px"
      paddingBottom={0}
      cursor="pointer"
    >
      <HStack spacing="1">
        <Badge bg="red" color="white">
          {moduleCode}
        </Badge>
        <Badge bg="darkblue" color="white">
          {category}
        </Badge>
        <Text fontSize="xs" as="i">
          by {author.displayName}
        </Text>
      </HStack>
      <Text maxW="100vw" noOfLines={0} fontSize="xs">
        <strong>{`${title}`}</strong>
      </Text>
    </Stack>
  );
}

export default ThreadBox;
