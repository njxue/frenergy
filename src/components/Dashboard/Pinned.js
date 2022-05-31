import { VStack, StackDivider, Heading } from "@chakra-ui/react";
 
import { usePin } from "../../utils/helper";
import ThreadBox from "./ThreadBox";

function Pinned() {
  const { pins } = usePin(); // array of postIds
  return (
    <VStack
      alignItems="start"
      cursor="pointer"
      margin={3}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Heading fontSize="lg" fontFamily="arial">
        PINNED POSTS
      </Heading>
      {pins.map((postId) => {
        return <ThreadBox postId={postId} key={postId} />;
      })}
    </VStack>
  );
}

export default Pinned;
