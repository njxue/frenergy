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
  Text,
  Flex,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ref } from "../../config/firebase";
import SaveCancelButton from "../layout/SaveCancelButton";
import DatePicker from "react-datepicker";
import DeleteButton from "../layout/DeleteButton";
import { useError, useSuccess } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";
import InvitedMembers from "./InvitedMembers";

function EditNotice(props) {
  const { notice } = props;
  const { event, details, size, applyby, noticeId, isPrivate } = notice;

  const [invitedMembers, setInvitedMembers] = useState([]);
  const { currUser } = useAuth();
  const noticeRef = isPrivate
    ? ref.child(`privateNotices/${noticeId}`)
    : ref.child(`publicNotices/${noticeId}`);

  const noticeIdRef = isPrivate
    ? ref.child(`privateNoticeIds/${noticeId}`)
    : ref.child(`publicNoticeIds/${noticeId}`);

  const userNoticeRef = ref.child(`userNotices/${currUser.uid}/${noticeId}`);

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const newEventRef = useRef();
  const newDetailsRef = useRef();
  const newSizeRef = useRef(size);
  const [date, setDate] = useState(new Date(Date.parse(applyby)));
  const today = new Date();

  function handleSubmit(e) {
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
    setSuccess("Deleted notice");

    // remove from collection containing the notice details
    noticeRef.remove();

    // remove from collection containing the notice ids
    noticeIdRef.remove();

    // remove from collection containing user notices
    userNoticeRef.remove();

    onClose();
  }

  return (
    <>
      <Button w="100%" onClick={onOpen} colorScheme="yellow">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
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
                  <FormLabel htmlFor="description">Looking for</FormLabel>
                  <HStack aling="center">
                    <NumberInput
                      defaultValue={size}
                      min={0}
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
            <Flex justifyContent="space-between" padding={2}>
              <DeleteButton
                handleDelete={handleDelete}
                action="delete this notice"
              />
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
