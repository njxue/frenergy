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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

import { useAuth } from "../../contexts/AuthContext";

import { useProfile } from "../../utils/helper";
import EditUserAttributes from "./EditUserAttributes";
import ChangePhoto from "./ChangePhoto";
import MajorBadge from "./MajorBadge";

function UserAttributes(props) {
  const { uid } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      bg="#F0ECEC"
      shadow="md"
      borderWidth="2px"
      borderRadius="7px"
      w="300px"
      maxW="90vw"
      minW="350px"
      padding={2}
    >
      <Avatar src={url} boxSize="200px" opacity={isLoading ? 0.5 : 1.0} />
      <VStack spacing={3} align="center" maxW="100%">
        <Heading noOfLines={2} padding={1} size="md">
          {username}
        </Heading>
        <MajorBadge major={major} />
        {!isEditing && bio && (
          <Text padding={1} maxW="inherit">
            {bio}
          </Text>
        )}

        <HStack spacing={2} align="center">
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

          {isLoading ? (
            <HStack>
              <p>Changing photo...</p>
              <Spinner size="xs" />
            </HStack>
          ) : (
            !isEditing &&
            uid == currUser.uid && (
              <ChangePhoto setUrl={setUrl} setIsLoading={setIsLoading} />
            )
          )}
        </HStack>

        <Spacer />
      </VStack>
      {isEditing && (
        <EditUserAttributes userData={userData} setIsEditing={setIsEditing} />
      )}
    </VStack>
  );
}

export default UserAttributes;
