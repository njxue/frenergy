import { useRef, useState } from "react";
import {
  Button,
  VStack,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  HStack,
  StackItem,
  FormErrorMessage,
} from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError, useSuccess } from "../../utils/helper";
import InvitedMembers from "./InvitedMembers";
import GroupNameInput from "./GroupNameInput";
import EventInput from "./EventInput";
import DetailsInput from "./DetailsInput";
import ModuleInput from "./ModuleInput";
import VisibilityToggle from "./VisibilityToggle";

function NoticeForm(props) {
  const { isOpen, onClose } = props;

  const [groupName, setGroupName] = useState("");
  const groupNameRef = useRef();
  const [groupNameError, setGroupNameError] = useState(false);
  const [eventError, setEventError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const eventInputRef = useRef();
  const detailsInputRef = useRef();
  const defaultModule = {
    value: {
      moduleCode: "None",
      title: "None",
    },
    label: "None",
  };

  const [module, setModule] = useState(defaultModule);

  const { setSuccess } = useSuccess();
  const { setError } = useError();

  //const [date, setDate] = useState(today);
  const { currUser } = useAuth();
  const [privated, setPrivated] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState({});
  // const [size, setSize] = useState(2);

  const closeAction = () => {
    setGroupName("");
    setGroupNameError(false);
    setEventError(false);
    setDetailsError(false);
    setInvitedMembers([]);
    setPrivated(false);
    setModule(defaultModule);
    onClose();
  };

  function handleSubmit(e) {
    e.preventDefault();
    setGroupNameError(false);
    setEventError(false);
    setDetailsError(false);

    const enteredEvent = eventInputRef.current.value.trim();
    const enteredDetails = detailsInputRef.current.value.trim();
    const moduleCode = module.label;

    const invalidEvent = enteredEvent.length == 0;
    const invalidDetails = enteredDetails.length == 0;
    const invalidGroupName =
      groupName.trim().length == 0 || groupName.trim().length > 30;

    if (invalidGroupName) {
      setGroupNameError(true);
    }

    if (invalidEvent) {
      setEventError(true);
    }

    if (invalidDetails) {
      setDetailsError(true);
    }

    if (invalidGroupName || invalidDetails || invalidEvent) {
      return;
    }

    //date.setHours(23, 59, 59, 999); // set deadline as end of the stipulated day

    // Generate notice id
    const noticeId = ref.push().key;

    const noticeData = {
      event: enteredEvent,
      details: enteredDetails,
      noticeId: noticeId,
      isPrivate: privated,
      module: moduleCode,
    };

    const visibility = privated ? "private" : "public";

    const updateObj = {
      [`groups/${noticeId}/leader`]: currUser.uid,
      [`groups/${noticeId}/members/${currUser.uid}`]: true,
      [`groups/${noticeId}/name`]: groupName.trim(),
      [`groups/${noticeId}/groupId`]: noticeId,
      [`groups/${noticeId}/visibility`]: visibility,
      [`groups/${noticeId}/module`]: moduleCode,
      [`users/${currUser.uid}/groups/${noticeId}`]: true,
      [`${visibility}Notices/${noticeId}`]: noticeData,
      [`${visibility}NoticeIds/${moduleCode}/${noticeId}`]: true,
      [`groupsVisibility/${noticeId}`]: visibility,
    };

    Object.keys(invitedMembers).map(
      (memberUid) => (updateObj[`invites/${memberUid}/${noticeId}`] = true)
    );

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to create new lounge. Please try again later");
      } else {
        setSuccess("New study lounge created!");
        closeAction();
      }
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeAction}
        size="2xl"
        initialFocusRef={groupNameRef}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Study Lounge</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={5} align="start">
                <GroupNameInput
                  groupName={groupName}
                  setGroupName={setGroupName}
                  ref={groupNameRef}
                  isInvalid={groupNameError}
                />

                <EventInput ref={eventInputRef} isInvalid={eventError} />
                <DetailsInput ref={detailsInputRef} isInvalid={detailsError} />
                <ModuleInput module={module} setModule={setModule} />
                <InvitedMembers
                  invitedMembers={invitedMembers}
                  setInvitedMembers={setInvitedMembers}
                />
                {/*<FormControl>
                  <FormLabel htmlFor="Date">Apply By</FormLabel>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={today}
                    dateFormat="d MMMM, yyyy"
                  />
                </FormControl>*/}
                <HStack justifyContent="space-between" align="center" w="100%">
                  <StackItem>
                    <VisibilityToggle
                      privated={privated}
                      setPrivated={setPrivated}
                    />
                  </StackItem>
                  <Button type="submit" colorScheme="green">
                    Create Study Lounge
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
