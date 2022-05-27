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
import Loader from "../layout/Loader";
import SaveCancelButton from "../layout/SaveCancelButton";

function UserAttributes() {
  const [isEditing, setIsEditing] = useState(false);

  const { currUser } = useAuth();
  const { username, bio, major, photoURL, setImage, setUsername, setBio, setMajor, saveEdits } =
    useProfile(currUser);

  

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveEdits();
    setIsEditing(false);
  }

  return (
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

      <TableContainer w="100%" maxW="100vw">
        <form onSubmit={handleSubmit}>
          <Table>
            <colgroup>
              <col span="1" style={{ width: "15%" }} />
              <col span="1" style={{ width: "85%" }} />
            </colgroup>
            <Tbody>
              {isEditing && (
                <Tr>
                  <Td>
                    <b>Profile pic</b>
                  </Td>
                  <Td>
                    <Input type="file" onChange={handleChange} />
                  </Td>
                </Tr>
              )}
              <Tr>
                <Td>
                  <b>Username: </b>
                </Td>
                <Td>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  ) : (
                    username
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <b>Major: </b>
                </Td>
                <Td>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                    />
                  ) : (
                    major
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <b>Bio: </b>
                </Td>
                <Td>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  ) : (
                    bio
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          {isEditing && (
            <SaveCancelButton
              action="stop editing"
              actionOnConfirm={() => setIsEditing(false)}
            />
          )}
        </form>
      </TableContainer>
    </VStack>
  );
}

export default UserAttributes;
