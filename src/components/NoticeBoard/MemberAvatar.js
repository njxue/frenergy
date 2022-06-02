import { Avatar, SkeletonCircle, Tooltip } from "@chakra-ui/react";

import { useProfile } from "../../utils/helper";

function MemberAvatar(props) {
  const { memberUid } = props;
  const { username, photoURL } = useProfile(memberUid);

  return (
    <SkeletonCircle isLoaded={photoURL != undefined}>
      <Tooltip label={username} fontSize="sm">
        <Avatar size="sm" name={username} src={photoURL} />
      </Tooltip>
    </SkeletonCircle>
  );
}

export default MemberAvatar;
