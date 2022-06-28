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

function PinnedItem(props) {
  const { postId } = props;
  const postRef = ref.child(`posts/${postId}`);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [authorName, setAuthorName] = useState();

  useEffect(() => {
    postRef.on("value", (snapshot) => {
      setPost(snapshot.val());
    });
    return () => postRef.off();
  }, [postId]);

  useEffect(() => {
    if (post != undefined) {
      ref
        .child(`users/${post.author}/profile/username`)
        .on("value", (snapshot) => {
          setAuthorName(snapshot.val());
        });
    }
  }, [post]);

  return post == undefined ? (
    <Loader />
  ) : (
    <Skeleton isLoaded={authorName}>
      <HStack
        align="top"
        justifyContent="space-between"
        w="100%"
        padding={2}
        _hover={{ backgroundColor: "#EFEDED" }}
        onClick={() =>
          navigate(`/${post.moduleCode}/${post.category}/${post.postId}`)
        }
        cursor="pointer"
      >
        <VStack align="start">
          <Heading noOfLines={2} size="md">
            {post.title}
          </Heading>

          <HStack align="center">
            <Badge bg="#051e3e" color="white">
              {post.moduleCode}
            </Badge>
            <Badge bg="white">{post.category}</Badge>
            <Text fontSize="sm" as="i">
              by {authorName}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Skeleton>
  );
}

export default PinnedItem;
