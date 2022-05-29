import SelectModules from "./SelectModules";

import ModulesList from "../Dashboard/ModulesList";
import { Box, Flex, HStack } from "@chakra-ui/react";
import UsersPosts from "./UserPosts";
import { useAuth } from "../../contexts/AuthContext";
import UserAttributes from "./UserAttributes";

function Profile() {
  const { currUser } = useAuth();
  return (
    <Flex justifyContent="space-around" flexWrap="wrap" gap={10} maxW="100vw">
      <UserAttributes />
      <Flex direction="row" alignItems="top" flexWrap="wrap">
        <ModulesList editable={true} />
        <SelectModules />
      </Flex>
      <Box maxW="100vw">
        <UsersPosts uid={currUser.uid} />
      </Box>
    </Flex>
  );
}

export default Profile;
