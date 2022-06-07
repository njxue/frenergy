import { IconButton, Icon, Tooltip } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function EditButton(props) {
  const { setIsEditing } = props;
  return (
    <Tooltip label="Edit">
      <EditIcon
        bg="F7F7F7"
        cursor="pointer"
        onClick={() => setIsEditing(true)}
      />
    </Tooltip>
  );
}

export default EditButton;
