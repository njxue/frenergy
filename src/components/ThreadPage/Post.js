import Votes from "./Votes";

import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import EditPost from "./EditPost";

import { useAuth } from "../../contexts/AuthContext";
import {
  Alert,
  VStack,
  Box,
  Text,
  AlertIcon,
  AlertTitle,
  Flex,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";
import ProfilePic from "../layout/ProfilePic";
import { useProfile } from "../../utils/helper";

function Post(props) {
  const { currUser } = useAuth();
  const { post, postRef } = props;
  const { username, photoURL } = useProfile(post.author);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (currUser.uid == post.author.uid) {
      setCanEdit(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <Loader hidden={!isLoading} />
      {error && (
        <Alert status="danger">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      {post && (
        <VStack align="stretch">
          <Flex width="100%" bg="#E9E9E9" alignItems="center">
            <ProfilePic url={photoURL} />
            <Box padding="4">
              <Text>
                <strong>{username}</strong>
              </Text>
              <Text fontSize="s">{post.createdAt}</Text>
            </Box>
            <Spacer />

            <HStack paddingRight="4">
              <PinButton post={post} />
              {canEdit && <EditButton setIsEditing={setIsEditing} />}
              <Votes postRef={postRef}/>
            </HStack>
          </Flex>
          {isEditing ? (
            <EditPost post={post} setIsEditing={setIsEditing} postRef={postRef} />
          ) : (
            <Box paddingLeft="4" paddingBottom="2">
              <Text>
                <strong>{post.title}</strong>
              </Text>
              <Text>{post.body}</Text>
            </Box>
          )}
        </VStack>
      )}
    </>
  );
}

export default Post;
