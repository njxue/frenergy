import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../utils/helper";
import UserAvatar from "../layout/UserAvatar";

function ProfileButton(props) {
  const MAX_USERNAME_LENGTH = 15;
  const { withText } = props;
  const navigate = useNavigate();
  const { currUser } = useAuth();

  const username = currUser.displayName;
  var trimmedUsername = username.substring(0, MAX_USERNAME_LENGTH);

  if (username.length > MAX_USERNAME_LENGTH) {
    trimmedUsername += "...";
  }

  return (
    <HStack onClick={() => navigate("/profile")} cursor="pointer">
      <UserAvatar uid={currUser.uid} size="sm" disableClick />
      <Text>{withText ? "Go to profile" : trimmedUsername}</Text>
    </HStack>
  );
}

export default ProfileButton;
