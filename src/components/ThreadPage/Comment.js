import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Button,
  MenuButton,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import ConfirmationModal from "../layout/ConfirmationModal";
import { useEditRights, useProfile } from "../../utils/helper";
import DeleteButton from "../layout/DeleteButton";

import AuthorDetails from "./AuthorDetails";
import EditComment from "./EditComment";
import Votes from "./Votes";

function Comment(props) {
  const { commentRef, comment } = props;
  const { author, createdAt, body, deleted } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasEditRights = useEditRights(author);

  function handleDelete() {
    commentRef.update(
      {
        body: "This comment has been deleted",
        deleted: true,
      },
      (error) => {
        if (error) {
          console.log("Error deleting comment. Please try again later");
        }
      }
    );
  }

  return (
    <Stack border="solid" borderColor="gray.300" padding="3">
      <Flex alignItems="center" gap={2}>
        <AuthorDetails author={author} createdAt={createdAt} />
        <Spacer />

        <Votes contentRef={commentRef} disabled={deleted} />
        {!deleted && hasEditRights && (
          <Menu size="sm">
            <MenuButton size="xs" as={Button} variant="ghost">
              <IconButton size="xs" as={AiOutlineEllipsis} variant="ghost" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setIsEditing(true)}>Edit</MenuItem>
              <MenuItem onClick={onOpen}>
                Delete
                <ConfirmationModal
                  isOpen={isOpen}
                  action="delete this comment"
                  onClose={onClose}
                  actionOnConfirm={handleDelete}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      {!deleted && hasEditRights && isEditing ? (
        <EditComment
          commentRef={commentRef}
          comment={comment}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Box>
          <Text as={deleted ? "i" : ""} color={deleted ? "gray" : "black"}>
            {body}
          </Text>
        </Box>
      )}
    </Stack>
  );
}

export default Comment;
