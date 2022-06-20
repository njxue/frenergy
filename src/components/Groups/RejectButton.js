import { IconButton } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ref } from "../../config/firebase";

function RejectButton(props) {
  const { applicantUid, eventName, groupData } = props;
  const { groupId, visibility } = groupData;
  const notificationRef = ref.child(`notifications/${applicantUid}`);
  const applicantRef = ref.child(
    `${visibility}Notices/${groupId}/applicants/${applicantUid}`
  );

  function handleReject() {
    const notifObj = {
      title: "Rejected :(",
      body: `Your request to join ${eventName} has been rejected`,
      type: "notice",
    };

    applicantRef.remove();
    notificationRef.push(notifObj);
  }

  return (
    <IconButton
      size="xs"
      variant="ghost"
      color="red"
      as={AiFillCloseCircle}
      cursor="pointer"
      onClick={handleReject}
    />
  );
}

export default RejectButton;
