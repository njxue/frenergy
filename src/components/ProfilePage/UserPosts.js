import {
  VStack,
  Heading,
  StackDivider,
  Divider,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../utils/helper";
import ThreadBox from "../Dashboard/ThreadBox";
import Loader from "../layout/Loader";

function UserPosts(props) {
  const [posts, setPosts] = useState();
  const { uid } = props;
  const { currUser } = useAuth();
  const { username } = useProfile(uid);
  const userPostsRef = ref.child("postsByUsers").child(uid); // postIds
  useEffect(() => {
    userPostsRef.on("value", async (snapshot) => {
      const tmp = [];
      const data = await snapshot.val();
      for (const k in data) {
        tmp.push(k);
      }

      setPosts(tmp);
    });
  }, [uid]);

  return posts == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="start"
      divider={<StackDivider borderColor="white" borderWidth={1} />}
      minW="300px"
      maxW="90vw"
      w="100%"
      flexGrow={1}
      h="250px"
      maxH="250px"
      padding={2}
      bg="#F0ECEC"
      borderRadius="10px"
    >
      <Heading size="md">
        {currUser.uid == uid ? "MY POSTS" : `${username}'s POSTS`}
      </Heading>

      <VStack
        shouldWrapChildren
        overflow="auto"
        maxH="250px"
        align="stretch"
        divider={<StackDivider borderColor="white" />}
        w="100%"
      >
        {posts[0] ? (
          posts.map((postId) => <ThreadBox postId={postId} key={postId} />)
        ) : (
          <Center>
            <VStack spacing={0}>
              <Text color="gray">No posts</Text>
              <Text color="gray">¯\_(ツ)_/¯</Text>
            </VStack>
          </Center>
        )}
      </VStack>
    </VStack>
  );
}

export default UserPosts;
