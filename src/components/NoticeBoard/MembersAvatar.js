import { AvatarGroup } from "@chakra-ui/react";

import MemberAvatar from "./MemberAvatar";

function MembersAvatar(props) {
  const { members, isExpanded, leader } = props;

  return (
    <AvatarGroup size="sm" spacing={-2} max={isExpanded ? 10 : 3}>
      {members.map((memberUid) => (
        <MemberAvatar
          memberUid={memberUid}
          isExpanded={isExpanded}
          isLeader={memberUid == leader}
        />
      ))}
    </AvatarGroup>
  );
}

export default MembersAvatar;
