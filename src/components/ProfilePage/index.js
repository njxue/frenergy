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

function Profile(props) {
  var { uid } = props;
  const { currUser } = useAuth();

  if (uid == undefined) {
    uid = currUser.uid;
  }

  return (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="space-around"
      align="top"
      padding={2}
      gap={2}
    >
      <UserAttributes uid={uid} />
      <Flex
        direction="column"
        align="center"
        wrap="wrap"
        w={uid == currUser.uid ? "600px" : "75%"}
        gap={2}
      >
        <UserPosts uid={uid} />
        <UserModules uid={uid} />
      </Flex>
      {currUser.uid == uid && <UserGroups />}
    </Flex>
  );
}

export default Profile;
