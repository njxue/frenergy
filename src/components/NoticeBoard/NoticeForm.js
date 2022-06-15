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
  Switch,
  StackItem,
  StackDivider,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError, useSuccess } from "../../utils/helper";
import SearchUsers from "../layout/SearchUsers";
import InvitedMembers from "./InvitedMembers";

function NoticeForm(props) {
  const { isOpen, onClose } = props;

  const eventInputRef = useRef();
  const detailsInputRef = useRef();
  const sizeInputRef = useRef(1);

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const today = new Date();

  const [date, setDate] = useState(today);
  const { currUser } = useAuth();
  const [privated, setPrivated] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const enteredEvent = eventInputRef.current.value;
    const enteredDetails = detailsInputRef.current.value;
    const enteredSize = sizeInputRef.current;

    date.setHours(23, 59, 59, 999); // set deadline as end of the stipulated day

    // Generate notice id
    const noticeId = ref.push().key;

    const noticeData = {
      event: enteredEvent,
      details: enteredDetails,
      size: enteredSize,
      applyby: date.toString(),
      leader: currUser.uid,
      noticeId: noticeId,
      isPrivate: privated,
    };

    // Generate random group name
    const dogBreeds = require("dog-breeds");
    const randomName = dogBreeds.random().name;

    const updateObj = {
      [`groups/${noticeId}/leader`]: currUser.uid,
      [`groups/${noticeId}/members/${currUser.uid}`]: true,
      [`groups/${noticeId}/name`]: "Group " + randomName,
      [`groups/${noticeId}/groupId`]: noticeId,
      [`users/${currUser.uid}/groups/${noticeId}`]: true,
    };

    // Public or private
    if (!privated) {
      updateObj[`publicNotices/${noticeId}`] = noticeData;
      updateObj[`publicNoticeIds/${noticeId}`] = true;
      updateObj[`userNotices/${currUser.uid}/public/${noticeId}`] = true;
    } else {
      updateObj[`privateNotices/${noticeId}`] = noticeData;
      updateObj[`privateNoticeIds/${noticeId}`] = true;
      updateObj[`userNotices/${currUser.uid}/private/${noticeId}`] = true;
    }
    invitedMembers.map(
      (memberData) =>
        (updateObj[`invites/${memberData.uid}/${noticeId}`] = privated
          ? "private"
          : "public")
    );

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to create new notice. Please try again laters");
      } else {
        setSuccess("New notice created!");
        setInvitedMembers([]);
        setPrivated(false);
      }
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setInvitedMembers([]);
          setPrivated(false);
        }}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Notice</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={5} align="start">
                <FormControl>
                  <FormLabel htmlFor="title">Event Name</FormLabel>
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
                      isDisabled={privated}
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
                <InvitedMembers
                  invitedMembers={invitedMembers}
                  setInvitedMembers={setInvitedMembers}
                />
                <FormControl>
                  <FormLabel htmlFor="Date">Apply By</FormLabel>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={today}
                    dateFormat="d MMMM, yyyy"
                  />
                </FormControl>{" "}
                <HStack justifyContent="space-between" align="center" w="100%">
                  <StackItem>
                    <HStack>
                      <Switch
                        colorScheme="red"
                        onChange={() => setPrivated(!privated)}
                      />
                      <Text as="b">{privated ? "Private" : "Public"}</Text>
                    </HStack>
                    <Text fontSize="xs">
                      {privated
                        ? "Your notice will only be visible to invited members"
                        : "Your notice will only be visible to users"}
                    </Text>
                  </StackItem>
                  <Button type="submit" onClick={onClose}>
                    Add Notice
                  </Button>
                </HStack>
              </VStack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NoticeForm;
