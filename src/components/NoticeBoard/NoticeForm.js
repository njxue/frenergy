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
  ModalFooter,
  InputRightAddon,
  Text,
  HStack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError, useSuccess } from "../../utils/helper";

function NoticeForm(props) {
  const { isOpen, onClose } = props;

  const eventInputRef = useRef();
  const detailsInputRef = useRef();
  const sizeInputRef = useRef(1);

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const noticesRef = ref.child("notices");

  const today = new Date();

  const [date, setDate] = useState(today);
  const { currUser } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();

    const enteredEvent = eventInputRef.current.value;
    const enteredDetails = detailsInputRef.current.value;
    const enteredSize = sizeInputRef.current;

    date.setUTCHours(15, 59, 59, 999); // set deadline as end of the stipulated day

    console.log(date);

    const noticeId = noticesRef.push().key;

    const noticeData = {
      event: enteredEvent,
      details: enteredDetails,
      size: enteredSize,
      applyby: date.toString(),
      leader: currUser.uid,
      noticeId: noticeId,
    };
    const dogBreeds = require("dog-breeds");
    const randomName = dogBreeds.random().name;

    const updateObj = {
      [`notices/${noticeId}`]: noticeData,
      [`groups/${noticeId}/members/${currUser.uid}`]: true,
      [`groups/${noticeId}/leader`]: currUser.uid,
      [`groups/${noticeId}/name`]: "Group " + randomName,
      [`groups/${noticeId}/groupId`]: noticeId,
      [`users/${currUser.uid}/groups/${noticeId}`]: true,
    };

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to create new notice. Please try again laters");
      } else {
        setSuccess("New notice created!");
      }
    });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
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
                  <FormLabel htmlFor="description">Looking for </FormLabel>
                  <HStack align={"center"}>
                    <NumberInput
                      defaultValue={1}
                      min={1}
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
                    <Text>pax</Text>
                  </HStack>
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
