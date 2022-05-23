import { IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ConfirmationModal from "./ConfirmationModal";

function DeleteButton(props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleDelete } = props;
  return (
    <>
      <IconButton icon={<DeleteIcon />} color="red" onClick={onOpen} />
      <ConfirmationModal
        isOpen={isOpen}
        action={"delete this comment"}
        onClose={onClose}
        actionOnConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteButton;
