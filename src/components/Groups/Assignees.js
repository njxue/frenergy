import { AvatarGroup } from "@chakra-ui/react";
import MemberAvatar from "../NoticeBoard/MemberAvatar";
function Assignees(props) {
  const { assignees } = props;

  return assignees == undefined ? (
    <p>Not assigned</p>
  ) : (
    <AvatarGroup size="sm" spacing={-2}>
      {Object.keys(assignees).map((memberUid) => (
        <MemberAvatar memberUid={memberUid} />
      ))}
    </AvatarGroup>
  );
}

export default Assignees;