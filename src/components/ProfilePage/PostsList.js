import { useEffect, useState } from "react";
import ThreadBox from "./ThreadBox";
import { VStack, StackDivider } from "@chakra-ui/react";

function PostList(props) {
  const { posts, sortOption } = props;
  const [allPosts, setAllPosts] = useState(posts);

  useEffect(() => {
    if (sortOption == 0) {
      const reversed = [...posts].reverse();
      setAllPosts(reversed);
    } else {
      setAllPosts(posts);
    }
  }, [sortOption]);

  return (
    <VStack
      shouldWrapChildren
      overflow="auto"
      maxH="250px"
      align="stretch"
      divider={<StackDivider borderColor="white" />}
      w="100%"
    >
      {allPosts.map((postId) => (
        <ThreadBox postId={postId} key={postId} />
      ))}
    </VStack>
  );
}

export default PostList;
