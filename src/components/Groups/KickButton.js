import { TiUserDelete } from "react-icons/ti";
import { IconButton } from "@chakra-ui/react";
import { ref } from "../../config/firebase";

function KickButton(props) {
  const { memberUid, groupData } = props;
  const { groupId, name } = groupData;

  function handleKick() {
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
  return (
    <IconButton
      size="2xs"
      variant="ghost"
      as={TiUserDelete}
      onClick={handleKick}
    />
  );
}

export default KickButton;
