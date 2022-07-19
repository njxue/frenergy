import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

function ConfirmationModal(props) {
  const { action, isOpen, onClose, actionOnConfirm, actionOnCancel } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to <strong>{action}</strong>?
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="green"
              onClick={() => {
                if (actionOnConfirm) {
                  actionOnConfirm();
                }
                onClose();
              }}
              data-testid="confirmBtn"
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
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
