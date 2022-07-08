import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../utils/helper";
import UserAvatar from "../layout/UserAvatar";

function ProfileButton(props) {
  const { withText } = props;
  const navigate = useNavigate();
  const { currUser } = useAuth();
  const username = currUser.displayName;

  return (
    <HStack onClick={() => navigate("/profile")} cursor="pointer">
      <UserAvatar uid={currUser.uid} size="sm" disableClick />
      <Text>{withText ? "Go to profile" : username}</Text>
    </HStack>
  );
}

export default ProfileButton;
