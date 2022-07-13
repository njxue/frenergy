import { Button, useDisclosure, Icon } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmationModal from "../layout/ConfirmationModal";
import { BsFillDoorOpenFill } from "react-icons/bs";

function LeaveButton(props) {
  const { groupData } = props;
  const { groupId, visibility, module, name } = groupData;
  const { currUser } = useAuth();
  const groupMembersRef = ref.child(`groups/${groupId}/members`);
  const groupLeaderRef = ref.child(`groups/${groupId}/leader`);
  const memberRef = ref.child(`groups/${groupId}/members/${currUser.uid}`);
  const groupRef = ref.child(`groups/${groupId}`);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        ref.child(`${visibility}NoticeIds/${module}/${groupId}`).remove();
        //ref.child(`userNotices/${leader}/${groupId}`).remove();
        groupRef.remove();
      } else {
        //ref.child(`userNotices/${leader}/${visibility}/${groupId}`).remove();
        const firstMember = Object.keys(snapshot.val())[0];
        groupLeaderRef.set(firstMember);
        //ref
        //  .child(`userNotices/${firstMember}/${visibility}/${groupId}`)
        //  .set(true);
      }
    });
  }
  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<Icon as={BsFillDoorOpenFill} />}
        w="100%"
        colorScheme="red"
      >
        Leave
      </Button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        action={`leave ${name}`}
        actionOnConfirm={handleLeave}
      />
    </>
  );
}

export default LeaveButton;
