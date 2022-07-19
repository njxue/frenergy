import {
  VStack,
  Stack,
  Flex,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  HStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ref } from "../../config/firebase";
import { useEditRights } from "../../utils/helper";
import AuthorDetails from "./AuthorDetails";
import Votes from "./Votes";

import EditOptions from "./EditOptions";
import EditMode from "./EditMode";

function Reply(props) {
  const { reply } = props;
  const { author, createdAt, body, deleted, replyId, commentId } = reply;
  const votesRef = ref.child(`votes/${replyId}`);

  const [isEditing, setIsEditing] = useState(false);
  const hasEditRights = useEditRights(author);
  const replyRef = ref.child(`replies/${commentId}/${replyId}`);

  function handleDelete() {
    replyRef.update({
      deleted: true,
    });
  }

  return (
    <Stack borderWidth="2px" shadow="md" padding="3" w="90%">
      <Flex alignItems="center" gap={2}>
        <AuthorDetails author={author} createdAt={createdAt} />
        <Spacer />
        <Votes votesRef={votesRef} disabled={deleted} />

        {!deleted && hasEditRights && (
          <EditOptions
            handleDelete={handleDelete}
            setIsEditing={setIsEditing}
          />
        )}
      </Flex>
      {!deleted && hasEditRights && isEditing ? (
        <EditMode
          contentRef={replyRef}
          content={reply}
          setIsEditing={setIsEditing}
        />
      ) : (
        <HStack justifyContent="space-between">
          <Box>
            <Text
              as={deleted ? "i" : ""}
              color={deleted ? "gray" : "black"}
              data-testid="body"
            >
              {deleted ? "This reply has been deleted" : body}
            </Text>
          </Box>
        </HStack>
      )}
    </Stack>
  );
}

export default Reply;
