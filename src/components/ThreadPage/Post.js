import Votes from "./Votes";

import { useState } from "react";
import EditPost from "./EditPost";
import { VStack, Box, Text, Flex, Spacer, HStack } from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";
import { useEditRights } from "../../utils/helper";
import AuthorDetails from "./AuthorDetails";
import { ref } from "../../config/firebase";

function Post(props) {
  const { post } = props;
  const postRef = ref.child(`posts/${post.postId}`);
  const { author, title, body, createdAt, postId } = post;
  const canEdit = useEditRights(author);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {post && (
        <VStack align="stretch">
          <Flex
            width="100%"
            bg="#E9E9E9"
            alignItems="center"
            gap={2}
            padding={4}
          >
            <AuthorDetails author={author} createdAt={createdAt} />
            <Spacer />

            <HStack spacing={5}>
              <PinButton postId={postId} />
              {canEdit && <EditButton setIsEditing={setIsEditing} />}
              <Votes contentRef={postRef} />
            </HStack>
          </Flex>
          {isEditing ? (
            <EditPost post={post} setIsEditing={setIsEditing} />
          ) : (
            <Box paddingLeft="4" paddingBottom="2">
              <Text>
                <strong>{title}</strong>
              </Text>
              <Text>{body}</Text>
            </Box>
          )}
        </VStack>
      )}
    </>
  );
}

export default Post;
