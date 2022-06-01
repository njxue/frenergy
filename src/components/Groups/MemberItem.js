import {
  Avatar,
  HStack,
  Text,
  VStack,
  Badge,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useProfile } from "../../utils/helper";
import { RiVipCrownFill } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";

import KickButton from "./KickButton";

function MemberItem(props) {
  const { memberUid, groupData } = props;
  const { leader } = groupData;
  const { username, photoURL, major } = useProfile(memberUid);
 
  const isLeader = memberUid == leader;
  const { currUser } = useAuth();

  return (
    <HStack align="center">
      <Avatar name={username} src={photoURL} />
      <VStack align="start">
        <HStack>
          <Text>{username}</Text>
          {isLeader && <Icon as={RiVipCrownFill} color="gold" />}
        </HStack>
        <Badge>{major}</Badge>
      </VStack>
      {currUser.uid == leader && !isLeader && (
        <KickButton memberUid={memberUid} groupData={groupData} />
      )}
    </HStack>
  );
}

export default MemberItem;
