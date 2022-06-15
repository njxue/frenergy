import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function LeaveButton(props) {
  const { groupData } = props;
  const { groupId, leader } = groupData;
  const { currUser } = useAuth();
  const groupMembersRef = ref.child(`groups/${groupId}/members`);
  const groupLeaderRef = ref.child(`groups/${groupId}/leader`);
  const memberRef = ref.child(`groups/${groupId}/members/${currUser.uid}`);
  const groupRef = ref.child(`groups/${groupId}`);

  function handleLeave() {
    memberRef.remove();
    ref.child(`users/${currUser.uid}/groups/${groupId}`).remove();

    ref.child(`notices/${groupId}/size`).transaction((size) => {
      console.log("Size before leaving: " + size);
      return size + 1;
    });

    groupMembersRef.once("value", (snapshot) => {
      const numMembers = !snapshot.exists()
        ? 0
        : Object.keys(snapshot.val()).length;

      if (numMembers == 0) {
        ref.child(`notices/${groupId}`).remove();
        groupRef.remove();
      }
    });
  }
  return <Button onClick={handleLeave}>Leave</Button>;
}

export default LeaveButton;
