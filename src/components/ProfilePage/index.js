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
    >
      <UserAttributes />
      <VStack align="center" wrap="wrap" w="600px">
        <UserPosts uid={currUser.uid} personal />
        <UserModules />
      </VStack>
      <UserGroups />
    </Flex>
  );
}

export default Profile;
