import { HStack, VStack, Text, Heading } from "@chakra-ui/react";
import UserAvatar from "../layout/UserAvatar";
import Votes from "../ThreadPage/Votes";
import { ref } from "../../config/firebase";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

function ThreadDetails(props) {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <HStack
      shadow="md"
      borderWidth="1px"
      padding={5}
      spacing={5}
      _hover={{ backgroundColor: "#EFEDED" }}
      cursor="pointer"
      onClick={() => {
        navigate(`/${post.moduleCode}/${post.category}/${post.postId}`);
      }}
      data-testId="container"
    >
      <UserAvatar uid={post.author} size="xl" disableClick />
      <VStack align="stretch" spacing={3}>
        <HStack direction="row" justifyContent="space-between" w="100%">
          <Heading
            size="md"
            noOfLines={2}
            data-testId="title"
            overflow="hidden"
          >
            {post.title}
          </Heading>
          <Votes votesRef={ref.child(`votes/${post.postId}`)} disabled />
        </HStack>
        <Text noOfLines={2} fontSize="xs" data-testId="body">
          {parse(post.body)}
        </Text>
        <Text fontSize="10px" data-testId="createdAt">
          {post.createdAt}
        </Text>
      </VStack>
    </HStack>
  );
}

export default ThreadDetails;
