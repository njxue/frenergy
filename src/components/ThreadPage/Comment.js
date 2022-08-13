import {
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  VStack,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEditRights, useError } from "../../utils/helper";
import { BsReplyFill } from "react-icons/bs";
import AuthorDetails from "./AuthorDetails";
import EditMode from "./EditMode";
import Votes from "./Votes";
import ReplyForm from "./ReplyForm";
import { ref } from "../../config/firebase";
import EditOptions from "./EditOptions";
import OverflowableContent from "./OverflowableContent";

function Comment(props) {
  const { comment } = props;
  const { author, createdAt, body, deleted, postId, commentId } = comment;
  const votesRef = ref.child(`votes/${commentId}`);
  const { setError } = useError();

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const hasEditRights = useEditRights(author);

  const commentRef = ref.child(`comments/${postId}/${commentId}`);

  function handleDelete() {
    commentRef.update(
      {
        deleted: true,
      },
      (error) => {
        if (error) {
          setError("Error deleting comment. Please try again later");
        }
      }
    );
  }

  return (
    <VStack align="stretch">
      <Stack borderWidth="2px" shadow="md" padding="3">
        <Flex alignItems="center" gap={2}>
          <AuthorDetails author={author} createdAt={createdAt} />
          <Spacer />

          <Votes votesRef={votesRef} disabled={deleted} />
          <Tooltip label="Reply" shouldWrapChildren>
            <Icon
              as={BsReplyFill}
              size="xs"
              onClick={() => {
                setIsReplying(true);
              }}
              cursor="pointer"
              data-testid="replyIcon"
            />
          </Tooltip>
          {!deleted && hasEditRights && (
            <EditOptions
              handleDelete={handleDelete}
              setIsEditing={setIsEditing}
            />
          )}
        </Flex>
        {!deleted && hasEditRights && isEditing ? (
          <EditMode
            contentRef={commentRef}
            content={comment}
            contentName="Comment"
            setIsEditing={setIsEditing}
          />
        ) : (
          <OverflowableContent heightBeforeOverflow="200px" showDivider={false}>
            <Box>
              <Text
                as={deleted ? "i" : ""}
                color={deleted ? "gray" : "black"}
                data-testid="body"
                whiteSpace="pre-wrap"
              >
                {deleted ? "This comment has been deleted" : body}
              </Text>
            </Box>
          </OverflowableContent>
        )}
      </Stack>
      {isReplying && (
        <ReplyForm comment={comment} setIsReplying={setIsReplying} />
      )}
    </VStack>
  );
}

export default Comment;
