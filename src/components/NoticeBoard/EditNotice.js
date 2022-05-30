import {
  FormControl,
  Input,
  FormLabel,
  Button,
  VStack,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ref } from "../../config/firebase";
import SaveCancelButton from "../layout/SaveCancelButton";
import DatePicker from "react-datepicker";
import { DeleteIcon } from "@chakra-ui/icons";

function EditNotice(props) {
  const { isOpen, onClose, notice, setSuccess } = props;
  const { event, details, size, applyby, noticeId } = notice;
  const noticeRef = ref.child(`notices/${noticeId}`);
  const [error, setError] = useState();

  const newEventRef = useRef();
  const newDetailsRef = useRef();
  const newSizeRef = useRef(size);
  const [date, setDate] = useState(new Date(Date.parse(applyby)));
  const today = new Date();

  function handleSubmit(e) {
    console.log(newSizeRef.current);
    e.preventDefault();
    const noticeObj = {
      event: newEventRef.current.value,
      details: newDetailsRef.current.value,
      size: newSizeRef.current,
      applyby: date.toString(),
    };

    noticeRef.update(noticeObj, (error) => {
      if (error) {
        console.log(error);
        setError("Unable to edit notice! Please try again later");
      } else {
        setSuccess("Saved!");
      }
    });
  }

  function handleDelete() {
    noticeRef.remove();
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Notice</ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                <FormControl>
                  <FormLabel htmlFor="title">Event & Description</FormLabel>
                  <Input
                    placeholder="Event name"
                    type="text"
                    isRequired
                    id="event"
                    defaultValue={event}
                    ref={newEventRef}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="event">Details</FormLabel>
                  <Input
                    id="description"
                    as="textarea"
                    placeholder="Event details"
                    isRequired
                    defaultValue={details}
                    ref={newDetailsRef}
                  ></Input>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="description">Group size</FormLabel>
                  <NumberInput
                    defaultValue={size}
                    min={1}
                    max={10}
                    onChange={(num) => {
                      newSizeRef.current = num;
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="Date">Apply By</FormLabel>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={today}
                    dateFormat="d MMMM, yyyy"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <Flex justifyContent="space-between" padding={2}>
              <Button
                colorScheme="red"
                leftIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <SaveCancelButton
                action="stop editing"
                actionOnConfirm={onClose}
                onSave={onClose}
              />
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditNotice;
