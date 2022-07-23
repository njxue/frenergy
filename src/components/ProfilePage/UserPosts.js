import {
  VStack,
  Heading,
  StackDivider,
  Divider,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../utils/helper";

import Loader from "../layout/Loader";
import Sort from "../CategoryPage/Sort";
import PostList from "./PostsList";

function UserPosts(props) {
  const [posts, setPosts] = useState();
  const { uid } = props;
  const { currUser } = useAuth();
  const { username } = useProfile(uid);
  const userPostsRef = ref.child("postsByUsers").child(uid);
  const [sortOption, setSortOption] = useState(0);

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
      divider={<StackDivider borderColor="gray" borderWidth={1} />}
      minW="300px"
      maxW="90vw"
      w="100%"
      flexGrow={1}
      h="250px"
      maxH="250px"
      padding={2}
      shadow="lg"
      borderWidth="2px"
      borderRadius="7px"
    >
      <HStack align="center">
        <Heading size="md">
          {currUser.uid == uid ? "MY POSTS" : `${username}'s POSTS`}
        </Heading>
        <Sort setSortOption={setSortOption} />
      </HStack>

      {posts[0] ? (
        <PostList sortOption={sortOption} posts={posts} />
      ) : (
        <Center>
          <VStack spacing={0}>
            <Text color="gray">No posts</Text>
            <Text color="gray">¯\_(ツ)_/¯</Text>
          </VStack>
        </Center>
      )}
    </VStack>
  );
}

export default UserPosts;
