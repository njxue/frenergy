import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useSuccess, useError } from "../../utils/helper";

function ApplyButton(props) {
  const { noticeData, leader } = props;
  const { noticeId, event } = noticeData;
  const { setSuccess } = useSuccess();
  const { setError } = useError();
  const { currUser } = useAuth();
  const notificationRef = ref.child(`notifications/${leader}`);

  function handleApply() {
    const notification = {
      title: event,
      body: `${currUser.displayName} has requested to join your group`,
      type: "notice",
      link: `/group/${noticeId}`,
    };

    const updateObj = {
      [`publicNotices/${noticeId}/applicants/${currUser.uid}`]: true,
    };

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to apply. Please try again later");
      } else {
        notificationRef.push(notification);
        setSuccess("Applied! Please wait for leader to accept your request");
      }
    });
  }

  return (
    <>
      <Button w="100%" colorScheme="green" onClick={handleApply}>
        Apply
      </Button>
    </>
  );
}

export default ApplyButton;
