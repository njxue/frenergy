import { VStack, Heading, StackDivider, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useProfile } from "../../utils/helper";
import ThreadBox from "../Dashboard/ThreadBox";
import Loader from "../layout/Loader";

function UserPosts(props) {
  const [posts, setPosts] = useState();
  const { uid, personal } = props;
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
      w="550px"
      maxW="90vw"
      padding={2}
      bg="#F0ECEC"
      maxH="250px"
      borderRadius="10px"
    >
      <Heading size="md">MY POSTS</Heading>

      <VStack
        shouldWrapChildren
        overflow="auto"
        maxH="inherit"
        align="stretch"
        divider={<StackDivider borderColor="white" />}
      >
        {posts.map((postId) => (
          <ThreadBox postId={postId} key={postId} />
        ))}
      </VStack>
    </VStack>
  );
}

export default UserPosts;
