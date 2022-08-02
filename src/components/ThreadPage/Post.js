import Votes from "./Votes";

import { useLayoutEffect, useRef, useState } from "react";
import EditPost from "./EditPost";
import {
  VStack,
  Box,
  Text,
  Flex,
  Spacer,
  HStack,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";

import AuthorDetails from "./AuthorDetails";
import { ref, storageRef } from "../../config/firebase";

import { useAuth } from "../../contexts/AuthContext";
import AttachedFiles from "./AttachedFiles";
import Loader from "../layout/Loader";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

function Post(props) {
  const { post } = props;
  const { currUser } = useAuth();
  const bodyRef = useRef();
  const votesRef = ref.child(`votes/${post.postId}`);
  const filesStorageRef = storageRef.child(`${post.moduleCode}/${post.postId}`);
  const { author, title, body, createdAt, postId } = post;

  const [isEditing, setIsEditing] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showingMore, setShowingMore] = useState(false);

  useLayoutEffect(() => {
    if (bodyRef.current.clientHeight < bodyRef.current.scrollHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [post]);

  return post == undefined ? (
    <Loader />
  ) : (
    <VStack align="stretch">
      <Flex width="100%" bg="#E9E9E9" alignItems="center" gap={2} padding={4}>
        <AuthorDetails author={author} createdAt={createdAt} />
        <Spacer />

        <HStack spacing={5}>
          <PinButton postId={postId} />
          {currUser && currUser.uid == author && (
            <EditButton setIsEditing={setIsEditing} />
          )}
          <Votes votesRef={votesRef} />
        </HStack>
      </Flex>
      {isEditing ? (
        <EditPost post={post} setIsEditing={setIsEditing} />
      ) : (
        <VStack
          align="stretch"
          bgGradient={
            isOverflowing && !showingMore
              ? "linear(to-b, #FFFFFF, 80%, #E2E2E2)"
              : "none"
          }
          spacing={0}
        >
          {isEditing ? (
            <EditPost post={post} setIsEditing={setIsEditing} />
          ) : (
            <Box
              paddingLeft="4"
              paddingRight="4"
              paddingBottom="2"
              maxH={showingMore ? "none" : "200px"}
              overflow="hidden"
              ref={bodyRef}
            >
              <Text data-testId="title">
                <strong>{title}</strong>
              </Text>

              <Text data-testId="body" whiteSpace="pre-wrap">
                {body}
              </Text>

              <Box marginTop={5}>
                <AttachedFiles parentRef={filesStorageRef} />
              </Box>
            </Box>
          )}
          {isOverflowing ? (
            <HStack
              w="100%"
              bottom="0%"
              justifyContent="space-between"
              position="relative"
            >
              <Divider orientation="horizontal" w="45%" />
              <Tooltip label={showingMore ? "Show less" : "Show more"}>
                <Box
                  onClick={() => setShowingMore(!showingMore)}
                  cursor="pointer"
                  position="absolute"
                  left="50%"
                  transform="translateX(-100%)"
                >
                  {showingMore ? (
                    <ChevronUpIcon w={6} h={6} />
                  ) : (
                    <ChevronDownIcon w={6} h={6} />
                  )}
                </Box>
              </Tooltip>
              <Divider orientation="horizontal" w="45%" />
            </HStack>
          ) : (
            <Divider orientation="horizontal" />
          )}
        </VStack>
      )}
      {isEditing && <Divider orientation="horizontal" />}
    </VStack>
  );
}

export default Post;
