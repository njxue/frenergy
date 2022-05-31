import { Box, Divider, Flex, HStack, VStack } from "@chakra-ui/react";
import UsersPosts from "./UserPosts";
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
      <Flex
        direction="row"
        alignItems="top"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={10}
        maxH="50vh"
      >
        <UserModules />
        <UsersPosts uid={currUser.uid} />
        <UserGroups />
      </Flex>
    </VStack>
  );
}

export default Profile;
