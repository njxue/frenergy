import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function EditButton(props) {
  const { setIsEditing } = props;
  return (
    <IconButton
      bg="F7F7F7"
      icon={<EditIcon />}
      onClick={() => setIsEditing(true)}
    />
  );
}

export default EditButton;
