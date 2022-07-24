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
import UserAvatar from "../layout/UserAvatar";

function RequestItem(props) {
  const { applicantUid, groupData, eventName } = props;
  const { username, photoURL } = useProfile(applicantUid);

  return (
    <HStack justifyContent="space-between" paddingLeft={2} paddingRight={2}>
      <HStack>
        <UserAvatar uid={applicantUid} size="sm" />
        <Text>
          <b>{username}</b>
        </Text>
      </HStack>
      <ButtonGroup>
        <AcceptButton
          applicantUid={applicantUid}
          groupData={groupData}
          eventName={eventName}
        />
        <RejectButton
          applicantUid={applicantUid}
          eventName={eventName}
          groupData={groupData}
        />
      </ButtonGroup>
    </HStack>
  );
}

export default RequestItem;
