import {
  Button,
  HStack,
  Image,
  VStack,
  Heading,
  Box,
  ButtonGroup,
  Input,
  Flex,
  Spinner,
  Spacer,
  Avatar,
  Badge,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

import { useProfile } from "../../utils/helper";
import EditUserAttributes from "./EditUserAttributes";
import UserPhoto from "./UserPhoto";
import MajorBadge from "./MajorBadge";

function UserAttributes(props) {
  const { uid } = props;
  const [isEditing, setIsEditing] = useState(false);
  const { currUser } = useAuth();

  const { username, bio, major, photoURL } = useProfile(uid);

  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(photoURL);
  }, [photoURL]);

  const userData = {
    username: username,
    bio: bio,
    major: major,
  };

  return url == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="center"
      shadow="lg"
      borderWidth="2px"
      borderRadius="7px"
      maxW="90vw"
      minW="350px"
    >
      <VStack align="center" w="100%" spacing={0}>
        <Box w="100%" align="center" padding={2} bg="#E2E2E2">
          <HStack spacing={0}>
            <Divider />
            {currUser.uid == uid ? (
              <UserPhoto />
            ) : (
              <Avatar src={photoURL} h={150} w={150} />
            )}
            <Divider />
          </HStack>
        </Box>
        <VStack
          spacing={3}
          align="center"
          w="100%"
          paddingBottom={10}
          bg="#E2E2E2"
        >
          <Heading noOfLines={2} marginTop={5} size="md">
            {username}
          </Heading>
          <MajorBadge major={major} />
        </VStack>
        <HStack spacing={2} align="center" top="-5%" position="relative">
          {!isEditing && uid == currUser.uid && (
            <Button
              fontSize="s"
              onClick={() => setIsEditing(true)}
              borderRadius="100px"
              bg="#051e3e"
              color="white"
              _hover={{ bg: "darkblue" }}
            >
              Edit profile
            </Button>
          )}
        </HStack>
        <Spacer />
        {isEditing && (
          <EditUserAttributes userData={userData} setIsEditing={setIsEditing} />
        )}
      </VStack>

      {!isEditing && bio && (
        <Text padding={1} as="i" maxW="inherit" fontSize="lg">
          {bio}
        </Text>
      )}
    </VStack>
  );
}

export default UserAttributes;
