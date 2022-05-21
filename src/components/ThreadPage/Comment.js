import { EditIcon } from "@chakra-ui/icons";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ref } from "../../config/firebase";
import { useEditRights } from "../../utils/helper";
import EditComment from "./EditComment";

function Comment(props) {
  const { comment, threadId } = props;
  const { author, createdAt, body, commentId } = comment;
  const [isEditing, setIsEditing] = useState(false);

  const commentRef = ref
    .child("threads")
    .child(threadId)
    .child("comments")
    .child(commentId);

  const hasEditRights = useEditRights(author);
 
  return hasEditRights && isEditing ? (
    <EditComment
      commentRef={commentRef}
      comment={comment}
      setIsEditing={setIsEditing}
    />
  ) : (
    <>
      <Stack>
        <HStack>
          <Box>
            <Text>{author.displayName}</Text>
            <Text>{createdAt}</Text>
          </Box>
          <EditIcon onClick={() => setIsEditing(true)} hidden={!hasEditRights} />
        </HStack>
        <Text>{body}</Text>
      </Stack>
    </>
  );
}

export default Comment;
