import { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function NoticeForm(props) {
  const { isOpen, onClose } = props;
  const eventInputRef = useRef();
  const detailsInputRef = useRef();
  const sizeInputRef = useRef(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const noticesRef = ref.child("notices");
  const today = new Date();

  const [date, setDate] = useState(today);
  const { currUser } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();

    const enteredEvent = eventInputRef.current.value;
    const enteredDetails = detailsInputRef.current.value;
    const enteredSize = sizeInputRef.current;

    const noticeData = {
      event: enteredEvent,
      details: enteredDetails,
      size: enteredSize,
      applyby: date.toString(),
      leader: currUser.uid,
    };

    const noticeId = noticesRef.push().key;
    noticesRef.child(noticeId).set(noticeData, (error) => {
      if (error) {
        console.log(error);
        setError("Unabble to create new notice! Please try again later");
      } else {
        setSuccess("Notice created!");
      }
    });
  }

  return (
    <>
      {success && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>{success} </AlertTitle>
          <CloseButton onClick={() => setSuccess(false)} />
        </Alert>
      )}
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
            <ModalHeader>New Notice</ModalHeader>
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
                    ref={eventInputRef}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="event">Details</FormLabel>
                  <Input
                    id="description"
                    as="textarea"
                    placeholder="Event details"
                    isRequired
                    ref={detailsInputRef}
                  ></Input>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="description">Group size</FormLabel>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={10}
                    onChange={(num) => {
                      sizeInputRef.current = num;
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
            <ModalFooter>
              <Button type="submit" onClick={onClose}>
                Add Notice
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NoticeForm;
