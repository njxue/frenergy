import Votes from "./Votes";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import EditPost from "./EditPost";
import { EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import {
  IconButton,
  Alert,
  VStack,
  Box,
  Text,
  AlertIcon,
  AlertTitle,
  Flex,
  Spacer,
  Divider,
  Stack,
  HStack,
} from "@chakra-ui/react";
import PinButton from "./PinButton";
import EditButton from "./EditButton";

function Post(props) {
  const { currUser } = useAuth();
  const { postRef } = props;

  const [post, setPost] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setError("");
    try {
      postRef.on("value", async (snapshot) => {
        const post = await snapshot.val();
        setPost(post);
      });
    } catch {
      setError("Unable to load post. Please try again");
    }
    setIsLoading(false);
  }, [postRef]);

  useEffect(() => {
    if (post) {
      console.log(canEdit);
      if (currUser.uid == post.author.uid) {
        setCanEdit(true);
      }
    }
  }, [post]);

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
          <Flex width="100%" bg="#E9E9E9">
            <Box padding="4">
              <Text>
                <strong>{post.author.displayName}</strong>
              </Text>
              <Text fontsize="s">{post.createdAt}</Text>
            </Box>
            <Spacer />

            <HStack paddingRight="4">
              <PinButton post={post} />
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
