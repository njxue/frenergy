import { Avatar, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function UserAvatar(props) {
  const { username, photoURL, size, disableClick } = props;
  const navigate = useNavigate();

  return (
    <Tooltip label={username}>
      <Avatar
        cursor="pointer"
        src={photoURL}
        size={size}
        onClick={() => (disableClick ? null : navigate(`/users/${username}`))}
      />
    </Tooltip>
  );
}

export default UserAvatar;
