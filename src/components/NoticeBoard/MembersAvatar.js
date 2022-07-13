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
    leaderRef.on("value", (snapshot) => {
      setLeader(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (leader) {
      membersRef.on("value", (snapshot) => {
        const data = snapshot.val();
        const tmp = [];
        for (const memberUid in data) {
          if (memberUid != leader) {
            tmp.push(memberUid);
          }
        }

        tmp.push(leader);
        tmp.reverse();

        setMembers(tmp);
      });
    }
  }, [groupId, leader]);

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
