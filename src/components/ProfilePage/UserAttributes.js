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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

import { useAuth } from "../../contexts/AuthContext";

import { useProfile } from "../../utils/helper";
import EditUserAttributes from "./EditUserAttributes";
import ChangePhoto from "./ChangePhoto";
import { Badge } from "react-bootstrap";

function UserAttributes() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currUser } = useAuth();

  const { username, bio, major, photoURL } = useProfile(currUser.uid);

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
    <VStack w="100%" alignItems="start" padding={3}>
      <Flex direction="row" alignItems="center"  wrap="wrap" justifyContent="space-between" gap={10}>
        <HStack maxW="50vw" id="attributes">
          <Avatar
            src={url}
            size="2xl"
            opacity={isLoading ? 0.5 : 1.0}
          />
          <Box>
            <Flex direction="column" alignItems="start" wrap="wrap">
              <Heading noOfLines={2}>{username}</Heading>
              <Badge>{major}</Badge>
            </Flex>

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
                <HStack>
                  <p>Changing photo...</p>
                  <Spinner size="xs" />
                </HStack>
              ) : (
                <ChangePhoto setUrl={setUrl} setIsLoading={setIsLoading} />
              )}
            </VStack>
          </Box>
        </HStack>
        <Spacer />
        {isEditing && (
          <EditUserAttributes userData={userData} setIsEditing={setIsEditing} />
        )}
        {!isEditing && (
          <Box maxH="10vh">
            <Heading>
              <i>"{bio}"</i>
            </Heading>
          </Box>
        )}
      </Flex>
    </VStack>
  );
}

export default UserAttributes;
