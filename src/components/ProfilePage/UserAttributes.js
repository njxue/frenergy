import {
  Button,
  HStack,
  Image,
  Input,
  VStack,
  Text,
  FormControl,
  Table,
  Tr,
  Td,
  TableContainer,
  Tbody,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useProfile } from "../../utils/helper";
import SaveCancelButton from "../layout/SaveCancelButton";

function UserAttributes() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currUser } = useAuth();
  const {
    username,
    bio,
    major,
    photoURL,
    setUsername,
    setBio,
    setMajor,
    setPhotoURL,
    setPhoto,
    saveEdits,
  } = useProfile(currUser);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await saveEdits();
    setIsLoading(false);
    setIsEditing(false);
  }

  return  (
    <VStack w="500px" maxW="80vw">
      <HStack spacing={10}>
        <Image
          boxSize="150px"
          objectFit="cover"
          src={photoURL}
          borderRadius="full"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box>
          <Heading>{username}</Heading>
          {!isEditing && (
            <Button variant="link" onClick={() => setIsEditing(true)}>
              Edit profile
            </Button>
          )}
        </Box>
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack maxW="100vw" spacing={3} alignItems="stretch">
          {isEditing && (
            <HStack>
              <b>Profile pic</b>
              <Input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </HStack>
          )}
          <HStack>
            <b>Username: </b>
            {isEditing ? (
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <p>{username}</p>
            )}
          </HStack>
          <HStack>
            <b>Bio: </b>
            {isEditing ? (
              <Input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p>{bio}</p>
            )}
          </HStack>
          <HStack>
            <b>Major: </b>
            {isEditing ? (
              <Input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            ) : (
              <p>{major}</p>
            )}
          </HStack>
          {isEditing && (
            <SaveCancelButton
              action="stop editing"
              isLoading={isLoading}
              actionOnConfirm={() => setIsEditing(false)}
            />
          )}
        </VStack>
      </form>
    </VStack>
  );
}

export default UserAttributes;
