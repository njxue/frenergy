import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useSuccess, useError } from "../../utils/helper";

function ApplyButton(props) {
  const { notice } = props;
  const { noticeId, applicants, leader, size } = notice;
  const { setSuccess, successAlert } = useSuccess();
  const { setError, errorAlert } = useError();
  const { currUser } = useAuth();
  const notificationRef = ref.child(`notifications/${leader}`);
  const userGroupRef = ref.child(`users/${currUser.uid}/groups/${noticeId}`);
  const [joined, setJoined] = useState();

  useEffect(() => {
    userGroupRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        setJoined(true);
      } else {
        setJoined(false);
      }
    });
  }, [notice]);

  function applied() {
    if (applicants == undefined) {
      return false;
    }

    return applicants[currUser.uid];
  }

  function handleApply() {
    if (!applied()) {
      const notification = {
        title: notice.event,
        body: `${currUser.displayName} has requested to join your group`,
        type: "notice",
        link: `/group/${noticeId}`,
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
        disabled={applied() || joined || size == 0}
      >
        {joined
          ? "Joined"
          : size == 0
          ? "No more slots"
          : applied()
          ? "Applied"
          : "Apply"}
      </Button>
    </>
  );
}

export default ApplyButton;
