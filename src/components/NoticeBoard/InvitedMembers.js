import { AvatarGroup, FormLabel, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import SearchUsers from "../layout/SearchUsers";
import UserAvatar from "../layout/UserAvatar";

function InvitedMembers(props) {
  const { invitedMembers, setInvitedMembers } = props;
  const { currUser } = useAuth();

  function handleClick(userData) {
    if (userData.uid == currUser.uid) {
      return "You cannot invite yourself";
    }

    if (!invitedMembers.some((user) => user.username == userData.username)) {
      setInvitedMembers([...invitedMembers, userData]);
    }
  }

  return (
    <VStack align="start">
      <HStack>
        <FormLabel>Invite users</FormLabel>
        <SearchUsers handleClick={handleClick} />
      </HStack>
      <AvatarGroup>
        {invitedMembers.map((member) => (
          <UserAvatar
            size="md"
            username={member.username}
            photoURL={member.photoURL}
          />
        ))}
      </AvatarGroup>
    </VStack>
  );
}

export default InvitedMembers;
