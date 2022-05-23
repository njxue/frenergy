import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
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

  return (
    <Stack border="solid" borderColor="gray.300" padding="3">
      <Flex>
        <Box>
          <Text>
            <strong>{author.displayName}</strong>
          </Text>
          <Text fontSize="xs">{createdAt}</Text>
        </Box>
        <Spacer />
        <Box>
          <IconButton
            icon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            hidden={!hasEditRights}
          />
        </Box>
      </Flex>
      {hasEditRights && isEditing ? (
        <EditComment
          commentRef={commentRef}
          comment={comment}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Box>
          <Text>{body}</Text>
        </Box>
      )}
    </Stack>
  );
}

export default Comment;
