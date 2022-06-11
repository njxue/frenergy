import { IconButton } from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { ref } from "../../config/firebase";

function AcceptButton(props) {
  const { applicantUid, groupId, eventName } = props;
  const notificationRef = ref.child(`notifications/${applicantUid}`);
  const noticeRef = ref.child(`notices/${groupId}`);

  function handleAccept() {
    const notifObj = {
      title: "Accepted ^O^",
      body: `Your request to join ${eventName} has been accepted`,
      type: "notice",
      link: `/group/${groupId}`,
    };

    const updateObj = {
      [`users/${applicantUid}/groups/${groupId}`]: true,
      [`groupMembers/${groupId}/${applicantUid}`]: true,
    };

    noticeRef.transaction(
      (notice) => {
        if (notice) {
          if (notice.applicants && notice.applicants[applicantUid]) {
            notice.applicants[applicantUid] = null;
            notice.size--;
          }
        }
        return notice;
      },
      (error) => {
        if (error) {
          console.log("error here");
        } else {
          ref.update(updateObj, (error) => {
            if (error) {
              console.log("error here");
            } else {
              notificationRef.push(notifObj);
            }
          });
        }
      }
    );
  }
  return (
    <IconButton
      size="xs"
      variant="ghost"
      color="green"
      as={AiFillCheckCircle}
      cursor="pointer"
      onClick={handleAccept}
    />
  );
}

export default AcceptButton;
