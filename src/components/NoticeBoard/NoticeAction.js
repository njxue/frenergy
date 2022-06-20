import { useMembership } from "../../utils/helper";
import ApplyButton from "./ApplyButton";
import EditNotice from "./EditNotice";
import AcceptButton from "./AcceptButton";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";

function NoticeAction(props) {
  const { noticeData, leader } = props;
  const { currUser } = useAuth();
  const { applicants, noticeId } = noticeData;
  const isMember = useMembership(noticeId);
  const [isInvited, setIsInvited] = useState(false);
 
  function applied() {
    if (applicants == undefined) {
      return false;
    }

    return applicants[currUser.uid];
  }

  useEffect(() => {
    ref
      .child(`invites/${currUser.uid}/${noticeData.noticeId}`)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          setIsInvited(true);
        }
      });
  }, []);

  if (isMember) {
    return (
      <Button w="100%" colorScheme="green" disabled>
        Joined
      </Button>
    );
  } else if (!isInvited) {
    if (!applied()) {
      return <ApplyButton noticeData={noticeData} leader={leader} />;
    } else {
      return (
        <Button w="100%" colorScheme="green" disabled>
          Request Pending
        </Button>
      );
    }
  } else {
    return <AcceptButton noticeData={noticeData} setIsInvited={setIsInvited} />;
  }
}

export default NoticeAction;
