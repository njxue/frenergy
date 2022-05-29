import { VStack, Heading, Text } from "@chakra-ui/react";
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
      <Heading size="md">MY POSTS</Heading>
      <VStack spacing={2}>
        {posts.map((postId) => (
          <ThreadBox postId={postId} />
        ))}
      </VStack>
    </VStack>
  );
}

export default UsersPosts;
