import { MdOutlinePersonRemove } from "react-icons/md";
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import ConfirmationModal from "../layout/ConfirmationModal";
import { useProfile } from "../../utils/helper";

function KickButton(props) {
  const { memberUid, groupData } = props;
  const { username } = useProfile(memberUid);
  const { groupId, name } = groupData;
  const { isOpen, onClose, onOpen } = useDisclosure();

  function actionOnConfirm() {
    const updateObject = {
      [`groups/${groupId}/members/${memberUid}`]: null,
      [`users/${memberUid}/groups/${groupId}`]: null,
      [`invites/${memberUid}/${groupId}`]: null,
    };

    const notifObj = {
      title: "Oh shucks!",
      body: "You have been kicked from " + name,
      type: "group",
    };

    ref.update(updateObject);
    ref.child(`notifications/${memberUid}`).push(notifObj);
  }

  function handleKick() {
    onOpen();
  }

  return (
    <>
      <Tooltip label="Kick" shouldWrapChildren>
        <IconButton
          size="2xs"
          variant="ghost"
          as={MdOutlinePersonRemove}
          onClick={handleKick}
        />
      </Tooltip>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        action={`kick ${username} from ${name}`}
        actionOnConfirm={actionOnConfirm}
      />
    </>
  );
}

export default KickButton;
