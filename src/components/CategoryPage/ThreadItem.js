import { Text, Box, HStack, VStack, Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import { formatDate } from "../../utils/helper";
import SkeletonLoader from "../layout/SkeletonLoader";
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

  return post == undefined ? (
    <SkeletonLoader />
  ) : (
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
          <Heading size="md" noOfLines={2}>
            {post.title}
          </Heading>
          <Votes votesRef={ref.child(`votes/${postId}`)} disabled />
        </HStack>
        <Text noOfLines={2} fontSize="xs">
          {post.body}
        </Text>
        <Text fontSize="10px">{post.createdAt}</Text>
      </VStack>
    </HStack>
  );
}

export default ThreadItem;
