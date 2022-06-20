import { AvatarGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";

import MemberAvatar from "./MemberAvatar";

function MembersAvatar(props) {
  const { groupId, isExpanded } = props;
  const membersRef = ref.child(`groups/${groupId}/members`);
  const leaderRef = ref.child(`groups/${groupId}/leader`);

  const [members, setMembers] = useState([]);
  const [leader, setLeader] = useState("");

  useEffect(() => {
    membersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const tmp = [];
      for (const memberUid in data) {
        tmp.push(memberUid);
      }
      setMembers(tmp);
    });

    leaderRef.on("value", (snapshot) => {
      setLeader(snapshot.val());
    });
  }, [groupId]);

  return (
    <AvatarGroup size="sm" spacing={-2} max={isExpanded ? 10 : 5}>
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
