import {
  FormControl,
  Input,
  FormLabel,
  Button,
  VStack,
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
  Icon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ref } from "../../config/firebase";
import SaveCancelButton from "../layout/SaveCancelButton";
import { useError, useSuccess } from "../../utils/helper";
import { FaEdit } from "react-icons/fa";
import InvitedMembers from "./InvitedMembers";
import EventInput from "./EventInput";
import DetailsInput from "./DetailsInput";

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

  const [invalidEvent, setInvalidEvent] = useState(false);
  const [invalidDetails, setInvalidDetails] = useState(false);

  // reset invited members field on modal close
  const closeAction = () => {
    setInvitedMembers([]);
    onClose();
  };

  function handleSubmit(e) {
    e.preventDefault();
    setInvalidEvent(false);
    setInvalidDetails(false);

    const newEvent = newEventRef.current.value.trim();
    const newDetails = newDetailsRef.current.value.trim();

    if (newEvent.length == 0) {
      setInvalidEvent(true);
    }

    if (newDetails.length == 0) {
      setInvalidDetails(true);
    }

    if (newEvent.length == 0 || newDetails.length == 0) {
      return;
    }

    notice["event"] = newEvent;
    notice["details"] = newDetails;
    notice["isPrivate"] = privated;

    // delete old notice
    noticeIdRef.remove();
    noticeRef.remove();

    // then add new notice
    visibility = privated ? "private" : "public";
    console.log(visibility);
    const updateObj = {
      [`${visibility}NoticeIds/${module}/${noticeId}`]: true,
      [`${visibility}Notices/${noticeId}`]: notice,
      [`groups/${noticeId}/visibility`]: visibility,
      [`groupsVisibility/${noticeId}`]: visibility,
    };

    Object.keys(invitedMembers).map(
      (memberUid) => (updateObj[`invites/${memberUid}/${noticeId}`] = true)
    );

    ref.update(updateObj, (error) => {
      if (error) {
        console.log(error);
        setError("Unable to edit notice! Please try again later");
      } else {
        setSuccess("Saved!");
      }
    });
    closeAction();
  }

  return (
    <>
      <Button
        w="100%"
        onClick={onOpen}
        colorScheme="yellow"
        rightIcon={<Icon as={FaEdit} />}
      >
        Edit Notice
      </Button>
      <Modal isOpen={isOpen} onClose={closeAction} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Notice</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3} align="start">
                <EventInput
                  ref={newEventRef}
                  defaultValue={event}
                  isInvalid={invalidEvent}
                />
                <DetailsInput
                  ref={newDetailsRef}
                  defaultValue={details}
                  isInvalid={invalidDetails}
                />
                <InvitedMembers
                  invitedMembers={invitedMembers}
                  setInvitedMembers={setInvitedMembers}
                />
              </VStack>
            </ModalBody>
            <Flex justifyContent="space-between" padding={5}>
              <VStack align="start" spacing={0}>
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
                    : "Make this lounge private"}
                </Text>
              </VStack>
              <SaveCancelButton
                action="stop editing"
                actionOnConfirm={closeAction}
              />
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditNotice;
