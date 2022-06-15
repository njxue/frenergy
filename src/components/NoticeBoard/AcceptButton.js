import { Button, ButtonGroup } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useError, useSuccess } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";

function AcceptButton(props) {
  const { noticeData } = props;
  const { noticeId } = noticeData;
  const { currUser } = useAuth();
  const { setSuccess } = useSuccess();
  const { setError } = useError();

  function handleAccept() {
    const updateObj = {
      [`/groups/${noticeId}/members/${currUser.uid}`]: true,
      [`/users/${currUser.uid}/groups/${noticeId}`]: true,
      [`/invites/${currUser.uid}/${noticeId}`]: null,
    };

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to accept invite. Please try again later");
      } else {
        setSuccess("You've accepted the invitation!");
      }
    });
  }

  function handleReject() {
    ref.child(`/invites/${currUser.uid}/${noticeId}`).remove();
  }

  return (
    <ButtonGroup>
      <Button w="100%" colorScheme="green" onClick={handleAccept}>
        Accept
      </Button>
      <Button w="100%" colorScheme="red" onClick={handleReject}>
        Reject
      </Button>
    </ButtonGroup>
  );
}

export default AcceptButton;
