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
} from "@chakra-ui/react";
import { useState } from "react";
 
import { useEditRights, useProfile } from "../../utils/helper";
import DeleteButton from "../layout/DeleteButton";
import ProfilePic from "../layout/ProfilePic";
import EditComment from "./EditComment";

function Comment(props) {
  const { commentRef, comment } = props;
  const { author, createdAt, body, deleted } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const { username, photoURL } = useProfile(author);
 

  const hasEditRights = useEditRights(author)

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
      <Flex alignItems="center">
        <ProfilePic url={photoURL} />
        <Box>
          <Text>
            <strong>{username}</strong>
          </Text>
          <Text fontSize="xs">{createdAt}</Text>
        </Box>
        <Spacer />

        {!deleted && hasEditRights && (
          <ButtonGroup>
            <IconButton
              icon={<EditIcon />}
              onClick={() => setIsEditing(true)}
              hidden={!hasEditRights || deleted}
            />
            <DeleteButton
              handleDelete={handleDelete}
              hidden={!hasEditRights || deleted}
            />
          </ButtonGroup>
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
