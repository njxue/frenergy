import {
  Avatar,
  ButtonGroup,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProfile } from "../../utils/helper";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";

function RequestItem(props) {
  const { applicantUid, groupId, eventName } = props;
  const { username, photoURL } = useProfile(applicantUid);

  console.log(applicantUid + username)
  
  return (
    <HStack justifyContent="space-between" paddingLeft={2} paddingRight={2}>
      <HStack>
        <Avatar name={username} src={photoURL} size="sm" />
        <Text>
          <b>{username}</b>
        </Text>
      </HStack>
      <ButtonGroup>
        <AcceptButton
          applicantUid={applicantUid}
          groupId={groupId}
          eventName={eventName}
        />
        <RejectButton
          applicantUid={applicantUid}
          groupId={groupId}
          eventName={eventName}
        />
      </ButtonGroup>
    </HStack>
  );
}

export default RequestItem;
