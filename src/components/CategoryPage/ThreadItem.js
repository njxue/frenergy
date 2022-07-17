import {
  Text,
  HStack,
  VStack,
  Heading,
  Flex,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import SkeletonLoader from "../layout/SkeletonLoader";
import parse from "html-react-parser";
import UserAvatar from "../layout/UserAvatar";
import Votes from "../ThreadPage/Votes";


function ThreadItem(props) {
  const { postId } = props;
  const navigate = useNavigate();
  const postRef = ref.child(`posts/${postId}`);
  const [post, setPost] = useState();

  useEffect(() => {
    postRef.on("value", (snapshot) => {
      setPost(snapshot.val());
    });
  }, [postId]);
 
  return (
    <Skeleton isLoaded={post != undefined}>
      {post ? (
        <HStack
          shadow="md"
          borderWidth="1px"
          padding={5}
          spacing={5}
          _hover={{ backgroundColor: "#EFEDED" }}
          cursor="pointer"
          onClick={() =>
            navigate(`/${post.moduleCode}/${post.category}/${post.postId}`)
          }
        >
          <UserAvatar uid={post.author} size="xl" disableClick />
          <VStack align="stretch" spacing={3} w="100%">
            <HStack direction="row" justifyContent="space-between" w="100%">
              <Heading size="md" noOfLines={2} data-testId="title">
                {post.title}
              </Heading>
              <Votes votesRef={ref.child(`votes/${postId}`)} disabled />
            </HStack>
            <Text noOfLines={2} fontSize="xs" data-testId="body">
              {parse(post.body)}
            </Text>
            <Text fontSize="10px" data-testId="createdAt">
              {post.createdAt}
            </Text>
          </VStack>
        </HStack>
      ) : (
        <Box h="120px"></Box>
      )}
    </Skeleton>
  );
}

export default ThreadItem;
