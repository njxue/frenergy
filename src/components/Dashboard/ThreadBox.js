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
      maxW="700px"
      paddingBottom={0}
      cursor="pointer"
    >
      <HStack spacing="1">
        <Badge bg="red" color="white">
          {post.moduleCode}
        </Badge>
        <Badge bg="darkblue" color="white">
          {post.category}
        </Badge>
        <Text fontSize="xs" as="i">
          by {post.author == currUser.uid ? "You" : username}
        </Text>
      </HStack>
      <Text maxW="100vw" noOfLines={1} fontSize="xs">
        <strong>{`${post.title}`}</strong>
      </Text>
    </Stack>
  );
}

export default ThreadBox;
