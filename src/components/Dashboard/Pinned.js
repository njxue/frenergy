import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  VStack,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import { usePin } from "../../utils/helper";
import ThreadBox from "./ThreadBox";

function Pinned() {
  const { pins } = usePin(); // array of postIds
  return (
    <VStack alignItems="start" cursor="pointer" margin={3}>
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
