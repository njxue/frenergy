import { useDisclosure, Button, ButtonGroup } from "@chakra-ui/react";
import ConfirmationModal from "./ConfirmationModal";

function SaveCancelButton(props) {
  const { action, actionOnConfirm, isLoading } = props;
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <ButtonGroup>
        <Button type="submit" size="sm" colorScheme="green" isLoading={isLoading}>
          Save
        </Button>
        <Button onClick={onOpen} size="sm" colorScheme="red">
          Cancel
        </Button>
      </ButtonGroup>
      <ConfirmationModal
        isOpen={isOpen}
        action={action}
        onClose={onClose}
        actionOnConfirm={actionOnConfirm}
      />
    </>
  );
}

export default SaveCancelButton;
