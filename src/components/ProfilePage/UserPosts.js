import {
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import ThreadBox from "../Dashboard/ThreadBox";
import Loader from "../layout/Loader";

function UsersPosts(props) {
  const [posts, setPosts] = useState();
  const { user } = props;
  const userPostsRef = ref.child("postsByUsers").child(user.uid);
  useEffect(() => {
    userPostsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const tmp = [];
      for (const k in data) {
        tmp.push(data[k]);
      }

      setPosts(tmp);
    });
  }, []);

  return posts == undefined ? (
    <Loader />
  ) : (
    <VStack alignItems="start">
      <Heading size="md">MY POSTS</Heading>
      <VStack spacing={2}>
        {posts.map((p) => (
          <ThreadBox post={p} />
        ))}
      </VStack>
    </VStack>
  );
}

export default UsersPosts;
