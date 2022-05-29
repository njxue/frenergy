import { VStack, Heading, Text, StackItem, Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import ThreadBox from "../Dashboard/ThreadBox";
import Loader from "../layout/Loader";

function UsersPosts(props) {
  const [posts, setPosts] = useState();
  const { uid } = props;
  const userPostsRef = ref.child("postsByUsers").child(uid); // postIds
  useEffect(() => {
    userPostsRef.on("value", async (snapshot) => {
      const tmp = Object.keys(snapshot.val());
      setPosts(tmp);
    });
  }, []);

  return posts == undefined ? (
    <Loader />
  ) : (
    <VStack alignItems="start">
      <Heading fontSize="lg" fontFamily="arial">
        MY POSTS
      </Heading>
      <Box maxH="30vh" overflow="scroll">
        {posts.map((postId) => (<>
          <ThreadBox postId={postId} />
          <Divider /></>
        ))}
      </Box>
    </VStack>
  );
}

export default UsersPosts;
