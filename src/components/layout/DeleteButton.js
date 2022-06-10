import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ConfirmationModal from "./ConfirmationModal";

function DeleteButton(props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { handleDelete, action, text  } = props;

  return (
    <>
      {text ? (
        <Button
          leftIcon={<DeleteIcon />}
          bg="red"
          color="white"
          onClick={onOpen}
        >
          {text}
        </Button>
      ) : (
        <IconButton
          icon={<DeleteIcon />}
          bg="red"
          color="white"
          onClick={onOpen}
        />
      )}
      <ConfirmationModal
        isOpen={isOpen}
        action={action}
        onClose={onClose}
        actionOnConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteButton;
