import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../layout/Loader";

function ThreadBox(props) {
  const { postId } = props;
  const navigate = useNavigate();
  const postRef = ref.child(`posts/${postId}`);
  const { currUser } = useAuth();
  const [post, setPost] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    postRef.on("value", async (snapshot) => {
      setPost(await snapshot.val());
    });

    return () => postRef.off();
  }, [postId]);

  useEffect(() => {
    if (post != undefined) {
      ref
        .child(`users/${post.author}/profile/username`)
        .on("value", async (snapshot) => {
          setUsername(await snapshot.val());
        });
    }
  }, [post]);

  function handleClick() {
    navigate(`/${post.moduleCode}/${post.category}/${postId}`);
  }

  return post == undefined || username == undefined ? (
    <Loader />
  ) : (
    <Stack
      align="stretch"
      overflowY="hidden"
      overflowX="hidden"
      onClick={handleClick}
      spacing="0"
      padding="2"
      paddingBottom={0}
      cursor="pointer"
      w="100%"
      _hover={{ backgroundColor: "#E2E2E2" }}
    >
      <HStack spacing="1">
        <Badge bg="#051e3e" color="white" borderW="1px" shadow="lg">
          {post.moduleCode}
        </Badge>
        <Badge bg="white" color="black" borderW="1px" shadow="lg">
          {post.category}
        </Badge>
        <Text fontSize="xs" as="i">
          by {post.author == currUser.uid ? "You" : username}
        </Text>
      </HStack>
      <Text noOfLines={1} fontSize="xs">
        <strong>{`${post.title}`}</strong>
      </Text>
    </Stack>
  );
}

export default ThreadBox;
