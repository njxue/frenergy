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

function Profile() {
  const { currUser } = useAuth();
  return (
    <VStack alignItems="stretch">
      <UserAttributes />
      <Divider />
      <HStack
        align="top"
        wrap="wrap"
        justifyContent="center"
        divider={<StackDivider borderColor="gray" />}
      >
        <UserModules />
        <UserPosts uid={currUser.uid} />
        <UserGroups />
      </HStack>
    </VStack>
  );
}

export default Profile;
