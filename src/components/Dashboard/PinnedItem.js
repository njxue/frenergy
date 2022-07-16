import {
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
  Skeleton,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import PinButton from "../ThreadPage/PinButton";
import SkeletonLoader from "../layout/SkeletonLoader";
import Loader from "../layout/Loader";
import UserAvatar from "../layout/UserAvatar";

function PinnedItem(props) {
  const { postId } = props;
  const postRef = ref.child(`posts/${postId}`);
  const navigate = useNavigate();
  const [post, setPost] = useState();

  useEffect(() => {
    postRef.on("value", (snapshot) => {
      setPost(snapshot.val());
    });
    return () => postRef.off();
  }, [postId]);

  return post == undefined ? (
    <Loader />
  ) : (
    <Skeleton isLoaded={post}>
      <HStack
        align="top"
        justifyContent="space-between"
        maxW="100%"
        w="500px"
        padding={3}
        _hover={{ backgroundColor: "#EFEDED" }}
        onClick={() =>
          navigate(`/${post.moduleCode}/${post.category}/${post.postId}`)
        }
        cursor="pointer"
        shadow="md"
        borderWidth="1px"
      >
        <VStack align="start" overflow="hidden">
          <Heading noOfLines={1} size="md">
            {post.title}
          </Heading>

          <HStack align="center">
            <Badge bg="#051e3e" color="white">
              {post.moduleCode}
            </Badge>
            <Badge bg="white">{post.category}</Badge>
            <HStack align="center">
              <UserAvatar uid={post.author} disableClick size="xs" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Skeleton>
  );
}

export default PinnedItem;
