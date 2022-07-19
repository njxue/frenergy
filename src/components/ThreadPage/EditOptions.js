import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmationModal from "../layout/ConfirmationModal";
import { AiOutlineEllipsis } from "react-icons/ai";

function EditOptions(props) {
  const { handleDelete, setIsEditing } = props;
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Menu size="sm">
      <MenuButton size="xs" as={Button} variant="ghost">
        <IconButton size="xs" as={AiOutlineEllipsis} variant="ghost" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setIsEditing(true)} data-testid="editOption">
          Edit
        </MenuItem>
        <MenuItem onClick={onOpen} data-testid="deleteOption">
          Delete
          <ConfirmationModal
            isOpen={isOpen}
            action="delete this reply"
            onClose={onClose}
            actionOnConfirm={handleDelete}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default EditOptions;
