import SelectModules from "./SelectModules";

import ModulesList from "../Dashboard/ModulesList";
import { Box, Flex, HStack } from "@chakra-ui/react";
import UsersPosts from "./UserPosts";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { currUser } = useAuth();
  return (
    <Flex justifyContent="center" flexWrap="wrap" gap={10} maxW="100vw">
      <Flex direction="row" alignItems="top" flexWrap="wrap">
        <ModulesList editable={true} />
        <SelectModules />
      </Flex>
      <Box maxW="100vw">
        <UsersPosts user={currUser} />
      </Box>
    </Flex>
  );
}

export default Profile;
