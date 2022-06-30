import {
  Avatar,
  HStack,
  Text,
  VStack,
  Badge,
  Icon,
  IconButton,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useProfile } from "../../utils/helper";
import { RiVipCrownFill } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../layout/UserAvatar";
import KickButton from "./KickButton";
import { useNavigate } from "react-router-dom";

function MemberItem(props) {
  const { memberUid, leader, groupData } = props;
  const isLeader = memberUid == leader;
  const { username, major } = useProfile(memberUid);
  const { currUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Skeleton isLoaded={username != undefined && major != undefined}>
      <HStack
        align="center"
        onClick={() => navigate(`/users/${username}`)}
        cursor="pointer"
      >
        <UserAvatar uid={memberUid} />
        <VStack align="start">
          <HStack>
            <Text>{username}</Text>
            {isLeader && <Icon as={RiVipCrownFill} color="gold" />}
          </HStack>
          <Badge>{major}</Badge>
        </VStack>
        {currUser.uid == leader && !isLeader && (
          <KickButton memberUid={memberUid} groupData={groupData} /> // move this elsewhere
        )}
      </HStack>
    </Skeleton>
  );
}

export default MemberItem;
