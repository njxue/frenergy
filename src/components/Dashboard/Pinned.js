import { VStack, StackDivider, Heading, HStack, Icon } from "@chakra-ui/react";

import { usePin } from "../../utils/helper";
import { BsFillPinFill } from "react-icons/bs";
import PinnedItem from "./PinnedItem";

function Pinned() {
  const { pins } = usePin();

  return (
    <VStack
      align="start"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      w="500px"
      flexGrow="1"
    >
      <HStack>
        <Heading fontSize="lg" fontFamily="arial">
          PINNED POSTS
        </Heading>
        <Icon as={BsFillPinFill} />
      </HStack>

      <VStack
        align="stretch"
        padding={3}
        divider={<StackDivider borderColor="gray.200" />}
        h="500px"
        overflow="auto"
        w="100%"
      >
        {pins.map((postId) => {
          return <PinnedItem postId={postId} key={postId} />;
        })}
      </VStack>
    </VStack>
  );
}

export default Pinned;
