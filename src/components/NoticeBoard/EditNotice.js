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
  Switch,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ref } from "../../config/firebase";
import SaveCancelButton from "../layout/SaveCancelButton";
import DatePicker from "react-datepicker";
import DeleteButton from "../layout/DeleteButton";
import { useError, useSuccess } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";
import InvitedMembers from "./InvitedMembers";

function EditNotice(props) {
  const { notice } = props;
  const { event, details, noticeId, isPrivate, module } = notice;

  const [invitedMembers, setInvitedMembers] = useState([]);
  const [privated, setPrivated] = useState(isPrivate);

  let visibility = isPrivate ? "private" : "public";
  let noticeRef = ref.child(`${visibility}Notices/${noticeId}`);
  let noticeIdRef = ref.child(`${visibility}NoticeIds/${module}/${noticeId}`);

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const newEventRef = useRef();
  const newDetailsRef = useRef();
  // const [newSize, setNewSize] = useState(size);
  //const [minSize, setMinSize] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    notice["event"] = newEventRef.current.value;
    notice["details"] = newDetailsRef.current.value;
    notice["isPrivate"] = privated;

    // delete old notice
    noticeIdRef.remove();
    noticeRef.remove();

    // then add new notice
    visibility = privated ? "private" : "public";
    noticeIdRef = ref.child(`${visibility}NoticeIds/${module}/${noticeId}`);
    noticeRef = ref.child(`${visibility}Notices/${noticeId}`);

    noticeRef.set(notice, (error) => {
      if (error) {
        console.log(error);
        setError("Unable to edit notice! Please try again later");
      } else {
        setSuccess("Saved!");
      }
    });

    noticeIdRef.set(true);
    ref
      .child(`groups/${noticeId}/visibility`)
      .set(visibility, (error) => console.log(error));
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
              <VStack spacing={3} align="start">
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
                <InvitedMembers
                  invitedMembers={invitedMembers}
                  setInvitedMembers={setInvitedMembers}
                />
              </VStack>
            </ModalBody>
            <Flex justifyContent="space-between" padding={2}>
              <HStack>
                <Switch
                  colorScheme="red"
                  onChange={() => setPrivated(!privated)}
                  isChecked={privated}
                />
                <Text as="b">{privated ? "Private" : "Public"}</Text>
              </HStack>
              <Text fontSize="xs">
                {privated
                  ? "Your notice will only be visible to invited members"
                  : "Your notice will only be visible to users"}
              </Text>
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
