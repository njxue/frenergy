import {
  Avatar,
  SkeletonCircle,
  Tooltip,
  Icon,
  AvatarBadge,
} from "@chakra-ui/react";
import { RiVipCrownFill } from "react-icons/ri";

import { useProfile } from "../../utils/helper";

function MemberAvatar(props) {
  const { memberUid, isExpanded, isLeader } = props;

  const { username, photoURL } = useProfile(memberUid);

  return (
    <SkeletonCircle isLoaded={photoURL != undefined && username != undefined}>
      <Tooltip label={username} fontSize="sm">
        <Avatar size={isExpanded ? "md" : "sm"} name={username} src={photoURL}>
          {isLeader && (
            <AvatarBadge borderColor="transparent">
              <Icon as={RiVipCrownFill} color="gold" border="black" />
            </AvatarBadge>
          )}
        </Avatar>
      </Tooltip>
    </SkeletonCircle>
  );
}

export default MemberAvatar;
