import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

function ConfirmationModal(props) {
  const { action, isOpen, onClose, actionOnConfirm, actionOnCancel } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to {action}?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={() => {
              if (actionOnConfirm) {
                actionOnConfirm();
              }
              onClose();
            }}
          >
            Yes
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              if (actionOnCancel) {
                actionOnCancel();
              }
              onClose();
            }}
          >
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
