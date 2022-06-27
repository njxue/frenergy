import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
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
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="space-around"
      align="top"
      padding={2}
      gap={2}
    >
      <UserAttributes />
      <Flex direction="column" align="center" wrap="wrap" w="600px" gap={2}>
        <UserPosts uid={currUser.uid} personal />
        <UserModules />
      </Flex>
      <UserGroups />
    </Flex>
  );
}

export default Profile;
