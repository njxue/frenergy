import Votes from "./Votes";
import { useRef, useState } from "react";
import EditPost from "./EditPost";
import {
  VStack,
  Box,
  Text,
  Flex,
  Spacer,
  HStack,
  Divider,
} from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";
import AuthorDetails from "./AuthorDetails";
import { ref, storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import AttachedFiles from "./AttachedFiles";
import Loader from "../layout/Loader";
import OverflowableContent from "./OverflowableContent";

function Post(props) {
  const { post } = props;
  const { currUser } = useAuth();
  const bodyRef = useRef();
  const votesRef = ref.child(`votes/${post.postId}`);
  const filesStorageRef = storageRef.child(`${post.moduleCode}/${post.postId}`);
  const { author, title, body, createdAt, postId } = post;

  const [isEditing, setIsEditing] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

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
        <OverflowableContent heightBeforeOverflow="200px" showDivider>
          <Text data-testId="title">
            <strong>{title}</strong>
          </Text>

          <Text data-testId="body" whiteSpace="pre-wrap">
            {body}
          </Text>

          <Box marginTop={5}>
            <AttachedFiles parentRef={filesStorageRef} />
          </Box>
        </OverflowableContent>
      )}
      {isEditing && <Divider orientation="horizontal" />}
    </VStack>
  );
}

export default Post;
