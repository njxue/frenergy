import {
  Button,
  HStack,
  Image,
  VStack,
  Heading,
  Box,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

import { useProfile } from "../../utils/helper";
import EditUserAttributes from "./EditUserAttributes";
import ChangePhoto from "./ChangePhoto";

function UserAttributes() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currUser } = useAuth();

  const { username, bio, major, photoURL } = useProfile(currUser);

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
    <VStack w="500px" maxW="80vw">
      <HStack spacing={10}>
        <Image
          boxSize="150px"
          objectFit="cover"
          src={url}
          borderRadius="full"
          opacity={isLoading ? 0.5 : 1.0}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box>
          <Heading>{username}</Heading>

          <VStack spacing={0} alignItems="start">
            {!isEditing && (
              <Button
                fontSize="s"
                variant="link"
                onClick={() => setIsEditing(true)}
              >
                Edit profile
              </Button>
            )}

            {isLoading ? (
              <p>Changing photo...</p>
            ) : (
              <ChangePhoto setUrl={setUrl} setIsLoading={setIsLoading} />
            )}
          </VStack>
        </Box>
      </HStack>

      {isEditing ? (
        <EditUserAttributes userData={userData} setIsEditing={setIsEditing} />
      ) : (
        <VStack maxW="100vw" spacing={3} alignItems="stretch">
          <HStack>
            <b>Username: </b>
            <p>{username}</p>
          </HStack>
          <HStack>
            <b>Bio: </b>
            <p>{bio}</p>
          </HStack>
          <HStack>
            <b>Major: </b>
            <p>{major}</p>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}

export default UserAttributes;
