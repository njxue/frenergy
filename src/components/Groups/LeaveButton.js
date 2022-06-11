import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function LeaveButton(props) {
  const { groupData } = props;
  const { groupId, leader } = groupData;
  const { currUser } = useAuth();
  const groupMembersRef = ref.child(`groupMembers/${groupId}`);
  const memberRef = ref.child(`groupMembers/${groupId}/${currUser.uid}`);
  const groupRef = ref.child(`groups/${groupId}`);

  function handleLeave() {
    memberRef.remove();
    ref.child(`users/${currUser.uid}/groups/${groupId}`).remove();

    groupMembersRef.on("value", (snapshot) => {
      const numMembers = !snapshot.exists()
        ? 0
        : Object.keys(snapshot.val()).length;
      if (numMembers == 0) {
        ref.child(`notices/${groupId}`).remove();
        groupRef.remove();
      } else {
        ref.child(`notices/${groupId}/size`).transaction((size) => {
          return size + 1;
        });
      }
    });
  }
  return <Button onClick={handleLeave}>Leave</Button>;
}

export default LeaveButton;
