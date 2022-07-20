import {
  AvatarGroup,
  FormLabel,
  HStack,
  Text,
  VStack,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import SearchUsers from "../MainNavigation/SearchUsers";
import UserAvatar from "../layout/UserAvatar";
import { SmallCloseIcon } from "@chakra-ui/icons";

function InvitedMembers(props) {
  const { invitedMembers, setInvitedMembers } = props;
  const { currUser } = useAuth();

  function handleClick(userData) {
    const uid = userData.uid;

    if (uid == currUser.uid) {
      return "You cannot invite yourself";
    }

    if (!invitedMembers[uid]) {
      const newInvitedMembers = {};
      Object.assign(newInvitedMembers, {
        ...invitedMembers,
        [uid]: true,
      });

      setInvitedMembers(newInvitedMembers);
    }
  }

  function handleRemove(uid) {
    console.log(uid);
    if (invitedMembers[uid]) {
      const { [uid]: value, ...remaining } = invitedMembers;

      setInvitedMembers(remaining);
    }
  }

  return (
    <VStack align="start" data-testid="inviteUsers">
      <HStack>
        <FormLabel>Invite users</FormLabel>
        <SearchUsers handleClick={handleClick} />
      </HStack>
      <HStack>
        {Object.keys(invitedMembers).map((memberUid) => (
          <Box>
            <UserAvatar size="md" uid={memberUid} disableClick />
            <Tooltip label="Remove">
              <SmallCloseIcon
                cursor="pointer"
                onClick={() => handleRemove(memberUid)}
              />
            </Tooltip>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
}

export default InvitedMembers;
