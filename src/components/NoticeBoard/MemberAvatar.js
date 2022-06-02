import { Avatar, SkeletonCircle, Tooltip, Icon } from "@chakra-ui/react";

import { useProfile } from "../../utils/helper";
 

function MemberAvatar(props) {
  const { memberUid, isExpanded } = props;
  const { username, photoURL } = useProfile(memberUid);

  return (
    <SkeletonCircle isLoaded={photoURL != undefined}>
      <Tooltip label={username} fontSize="sm">
      
        <Avatar
          size={isExpanded ? "md" : "sm"}
          name={username}
          src={photoURL}
        />
      </Tooltip>
    </SkeletonCircle>
  );
}

export default MemberAvatar;
