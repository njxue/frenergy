import { Avatar, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../utils/helper";

function UserAvatar(props) {
  const { uid, disableClick, size } = props;
  const navigate = useNavigate();
  const { photoURL, username } = useProfile(uid);

  return (
    <Tooltip label={username}>
      <Avatar
        cursor="pointer"
        name={username}
        src={photoURL}
        size={size}
        onClick={() => (disableClick ? null : navigate(`/users/${username}`))}
      />
    </Tooltip>
  );
}

export default UserAvatar;
