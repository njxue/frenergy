import {
  Box,
  Divider,
  Flex,
  HStack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import UserPosts from "./UserPosts";
import { useAuth } from "../../contexts/AuthContext";
import UserAttributes from "./UserAttributes";
import UserModules from "./UserModules";
import UserGroups from "./UserGroups";
import { useLocation } from "react-router-dom";
import { useSuccess } from "../../utils/helper";
import { useEffect } from "react";

function Profile() {
  const { currUser } = useAuth();
  const { state } = useLocation();
  const { setSuccess } = useSuccess();

  useEffect(() => {
    if (state && state.fromRegistration) {
      setSuccess("Yay! Your account has been created!");
    }
  }, []);

  return (
    <VStack alignItems="stretch">
      <UserAttributes fromRegistration={state && state.fromRegistration} />
      <Divider />
      <HStack
        align="top"
        wrap="wrap"
        justifyContent="center"
        divider={<StackDivider borderColor="gray" />}
      >
        <UserModules />
        <UserPosts uid={currUser.uid} personal />
        <UserGroups />
      </HStack>
    </VStack>
  );
}

export default Profile;
