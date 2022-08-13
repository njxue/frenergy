import {
  VStack,
  StackDivider,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";

import { usePin } from "../../utils/helper";
import { BsFillPinFill } from "react-icons/bs";
import PinnedItem from "./PinnedItem";
import Loader from "../layout/Loader";
import EmptyPrompt from "./EmptyPrompt";

function Pinned() {
  const { pins } = usePin();

  return pins == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="start"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
      maxW="100%"
      w="500px"
      h="500px"
      overflow="auto"
    >
      <HStack>
        <Heading fontSize="lg" fontFamily="arial" data-testid="header">
          PINNED POSTS
        </Heading>
        <Icon as={BsFillPinFill} />
      </HStack>

      <VStack
        align="stretch"
        padding={3}
        divider={<StackDivider borderColor="gray.200" />}
        maxH="inherit"
        overflow="auto"
        w="100%"
      >
        {pins[0] ? (
          pins.map((postId) => {
            return <PinnedItem postId={postId} key={postId} />;
          })
        ) : (
          <EmptyPrompt
            group="pins"
            message="Pin posts by clicking on the pin icon of posts"
          />
        )}
      </VStack>
    </VStack>
  );
}

export default Pinned;
