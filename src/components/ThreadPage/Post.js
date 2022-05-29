import Votes from "./Votes";

import { useState } from "react";
import EditPost from "./EditPost";
import {
  VStack,
  Box,
  Text,
  Flex,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";
import ProfilePic from "../layout/ProfilePic";
import { useEditRights, useProfile } from "../../utils/helper";

function Post(props) {
  const { post, postRef } = props;
  const { author, title, body, createdAt, postId } = post;
  const canEdit = useEditRights(author);
  const { username, photoURL } = useProfile(author);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {post && (
        <VStack align="stretch">
          <Flex width="100%" bg="#E9E9E9" alignItems="center">
            <ProfilePic url={photoURL} />
            <Box padding="4">
              <Text>
                <strong>{username}</strong>
              </Text>
              <Text fontSize="s">{createdAt}</Text>
            </Box>
            <Spacer />

            <HStack paddingRight="4">
              <PinButton postId={postId} />
              {canEdit && <EditButton setIsEditing={setIsEditing} />}
              <Votes postRef={postRef} />
            </HStack>
          </Flex>
          {isEditing ? (
            <EditPost
              post={post}
              setIsEditing={setIsEditing}
              postRef={postRef}
            />
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
