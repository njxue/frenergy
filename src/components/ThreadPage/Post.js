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
  const { threadId, moduleCode, category } = props;

  const threadsRef = ref.child("threads").child(threadId).child("post");

  const [post, setPost] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setError("");
    try {
      threadsRef.on("value", async (snapshot) => {
        const post = await snapshot.val();
        setPost(post);
      });
    } catch {
      setError("Unable to load post. Please try again");
    }
    setIsLoading(false);
  }, [threadId]);

  useEffect(() => {
    if (post) {
      if (currUser.uid == post.author.uid) {
        setCanEdit(true);
        console.log(canEdit);
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
              <PinButton threadId={threadId} />
              <EditButton hidden={!canEdit} setIsEditing={setIsEditing} />
              <Votes
                threadId={threadId}
                initialCount={post.votes}
                module={post.module}
                category={post.category}
              />
            </HStack>
          </Flex>
          {isEditing ? (
            <EditPost
              initTitle={post.title}
              initBody={post.body}
              setIsEditing={setIsEditing}
              paths={[
                `threads/${threadId}/post`,
                `posts/${moduleCode + category}/${threadId}`,
              ]}
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
