import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function LeaveButton(props) {
  const { groupData } = props;
  const { groupId, leader, visibility, moduleCode } = groupData;
  const { currUser } = useAuth();
  const groupMembersRef = ref.child(`groups/${groupId}/members`);
  const groupLeaderRef = ref.child(`groups/${groupId}/leader`);
  const memberRef = ref.child(`groups/${groupId}/members/${currUser.uid}`);
  const groupRef = ref.child(`groups/${groupId}`);

  function handleLeave() {
    // delete member from group
    memberRef.remove();
    // remove group from member's group list
    ref.child(`users/${currUser.uid}/groups/${groupId}`).remove();

    // count number of members remaining. If no more members, delete the group (and notice) entirely,
    // else, transfer leadership (and notice ownserhip, if any) to another member
    groupMembersRef.once("value", (snapshot) => {
      const numMembers = !snapshot.exists()
        ? 0
        : Object.keys(snapshot.val()).length;
      console.log(numMembers);

      if (numMembers == 0) {
        ref.child(`${visibility}Notices/${groupId}`).remove();
        ref.child(`${visibility}NoticeIds/${moduleCode}/${groupId}`).remove();
        ref.child(`userNotices/${leader}/${groupId}`).remove();
        groupRef.remove();
      } else {
        ref.child(`userNotices/${leader}/${visibility}/${groupId}`).remove();
        const firstMember = Object.keys(snapshot.val())[0];
        groupLeaderRef.set(firstMember);
        ref
          .child(`userNotices/${firstMember}/${visibility}/${groupId}`)
          .set(true);
      }
    });
  }
  return <Button onClick={handleLeave}>Leave</Button>;
}

export default LeaveButton;