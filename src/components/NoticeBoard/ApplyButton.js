import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useSuccess, useError } from "../../utils/helper";

function ApplyButton(props) {
  const { notice } = props;
  const { noticeId, applicants, leader } = notice;
  const { setSuccess, successAlert } = useSuccess();
  const { setError, errorAlert } = useError();
  const { currUser } = useAuth();
  const notificationRef = ref.child(`notifications/${leader}`);

  function canApply() {
    if (applicants == undefined) {
      return true;
    }

    return applicants[currUser];
  }

  function handleApply() {
    if (canApply()) {
      const notification = {
        title: notice.event,
        body: `${currUser.displayName} has requested to join your group`,
        type: "notice"
      };

      const updateObj = {
        [`notices/${noticeId}/applicants/${currUser.uid}`]: true,
        [`users/${currUser.uid}/groupRequests/${noticeId}`]: true,
      };

      ref.update(updateObj, (error) => {
        if (error) {
          setError("Unable to apply. Please try again later");
        } else {
          notificationRef.push(notification).then(() => console.log("ok"));
          setSuccess("Applied! Please wait for leader to accept your request");
        }
      });
    } else {
      console.log("error");
    }
  }

  return (
    <>
      {successAlert}
      {errorAlert}
      <Button
        w="100%"
        colorScheme="green"
        onClick={handleApply}
        disabled={!canApply()}
      >
        {canApply() ? "Apply" : "Applied"}
      </Button>
    </>
  );
}

export default ApplyButton;
