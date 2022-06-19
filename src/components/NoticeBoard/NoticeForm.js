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
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError, useSuccess } from "../../utils/helper";
import SearchUsers from "../layout/SearchUsers";
import InvitedMembers from "./InvitedMembers";
import ModuleFilter from "./ModuleFilter";

function NoticeForm(props) {
  const { isOpen, onClose } = props;

  const eventInputRef = useRef();
  const detailsInputRef = useRef();

  const [module, setModule] = useState({
    value: {
      moduleCode: "None",
      title: "None",
    },
    label: "None",
  });

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const today = new Date();

  const [date, setDate] = useState(today);
  const { currUser } = useAuth();
  const [privated, setPrivated] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState([]);
  // const [size, setSize] = useState(2);

  function handleSubmit(e) {
    e.preventDefault();

    const enteredEvent = eventInputRef.current.value;

    const enteredDetails = detailsInputRef.current.value;

    const moduleCode = module.label;

    date.setHours(23, 59, 59, 999); // set deadline as end of the stipulated day

    // Generate notice id
    const noticeId = ref.push().key;

    const noticeData = {
      event: enteredEvent,
      details: enteredDetails,
      //size: size,
      applyby: date.toString(),

      noticeId: noticeId,
      isPrivate: privated,
      module: moduleCode,
    };

    const visibility = privated ? "private" : "public";

    // Generate random group name
    const dogBreeds = require("dog-breeds");
    const randomName = dogBreeds.random().name;

    const updateObj = {
      [`groups/${noticeId}/leader`]: currUser.uid,
      [`groups/${noticeId}/members/${currUser.uid}`]: true,
      [`groups/${noticeId}/name`]: "Group " + randomName,
      [`groups/${noticeId}/groupId`]: noticeId,
      [`groups/${noticeId}/visibility`]: visibility,
      [`groups/${noticeId}/module`]: moduleCode,
      [`users/${currUser.uid}/groups/${noticeId}`]: true,

      [`${visibility}Notices/${noticeId}`]: noticeData,
      [`${visibility}NoticeIds/${moduleCode}/${noticeId}`]: true,
      [`userNotices/${currUser.uid}/${visibility}/${noticeId}`]: true,
    };

    invitedMembers.map(
      (memberData) =>
        (updateObj[`invites/${memberData.uid}/${noticeId}`] = visibility)
    );

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to create new notice. Please try again laters");
      } else {
        setSuccess("New notice created!");
        setInvitedMembers([]);
        setPrivated(false);
        // setSize(1);
        onClose();
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
        initialFocusRef={eventInputRef}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Notice</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={5} align="start">
                <FormControl isRequired>
                  <FormLabel htmlFor="title">Event Name</FormLabel>
                  <Input
                    placeholder="Event name (e.g. Assignment 1 Discussion)"
                    type="text"
                    id="event"
                    ref={eventInputRef}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="event">Details</FormLabel>
                  <Input
                    id="description"
                    as="textarea"
                    placeholder="Event details"
                    isRequired
                    ref={detailsInputRef}
                  />
                </FormControl>
                <FormLabel>Related Module</FormLabel>
                <ModuleFilter module={module} setModule={setModule} />
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
                  <Button type="submit" colorScheme="green">
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
