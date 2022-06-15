import { useMembership } from "../../utils/helper";
import ApplyButton from "./ApplyButton";
import EditNotice from "./EditNotice";
import AcceptButton from "./AcceptButton";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@chakra-ui/react";

function NoticeAction(props) {
  const { type, noticeData, leader } = props;
  const { currUser } = useAuth();
  const { applicants, noticeId } = noticeData;
  const isMember = useMembership(noticeId);

  function applied() {
    if (applicants == undefined) {
      return false;
    }

    return applicants[currUser.uid];
  }

  if (type == "edit") {
    return <EditNotice notice={noticeData} />;
  } else if (isMember) {
    return (
      <Button w="100%" colorScheme="green" disabled>
        Joined
      </Button>
    );
  } else if (type == "apply") {
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
    return <AcceptButton noticeData={noticeData} />;
  }
}

export default NoticeAction;
