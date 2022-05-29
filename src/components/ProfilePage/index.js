import SelectModules from "./SelectModules";

import ModulesList from "../Dashboard/ModulesList";
import { Box, Divider, Flex, HStack, VStack } from "@chakra-ui/react";
import UsersPosts from "./UserPosts";
import { useAuth } from "../../contexts/AuthContext";
import UserAttributes from "./UserAttributes";

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
        h="100%"
      >
        <Flex direction="row" alignItems="top" maxW="50vw" wrap="wrap">
          <ModulesList editable={true} />
          <SelectModules />
        </Flex>

        <Box>
          <UsersPosts uid={currUser.uid} />
        </Box>
      </Flex>
    </VStack>
  );
}

export default Profile;
