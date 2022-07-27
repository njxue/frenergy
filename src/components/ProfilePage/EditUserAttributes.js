import {
  Box,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import SaveCancelButton from "../layout/SaveCancelButton";
import { MAJORS, FACULTIES } from "../../api/customapi";
import { useError, useSuccess } from "../../utils/helper";
import { updateProfile } from "firebase/auth";

function EditUserAttributes(props) {
  const { userData, setIsEditing } = props;
  const { username, bio, major } = userData;
  const { setError } = useError();

  const newUsernameRef = useRef(username);
  const [newBio, setNewBio] = useState(bio);
  const [newMajor, setNewMajor] = useState(major);

  const { currUser } = useAuth();

  function validUsername(username) {
    return /^[A-Za-z\s]*$/.test(username);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newUsername = newUsernameRef.current.value.trim();

    if (newUsername.length == 0) {
      setError("Username must contain at least 1 character");
      return;
    }

    if (!validUsername(newUsername)) {
      setError("Username must contain only alphanumeric characters and spaces");
      return;
    }

    if (newUsername.length > 20) {
      setError("Username can only contain up to 20 characters");
      return;
    }

    const updateObj = {
      [`users/${currUser.uid}/profile/username`]: newUsername,
      [`users/${currUser.uid}/profile/bio`]: newBio.substring(0, 300),
      [`users/${currUser.uid}/profile/major`]: newMajor,
      [`usernames/${username}`]: null,
      [`usernames/${newUsername}`]: currUser.uid,
    };

    //check if username already exists
    ref.child(`usernames/${newUsername}`).once("value", (snapshot) => {
      if (snapshot.exists() && snapshot.val() != currUser.uid) {
        setError("This username has been taken!");
      } else {
        //username not taken

        ref.update(updateObj, () => {
          setIsEditing(false);
        });

        updateProfile(currUser, {
          displayName: newUsername,
        })
          .then(() => console.log(currUser))
          .catch((error) => console.log(error));

        setIsEditing(false);
      }
    });
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <VStack
          maxW="100vw"
          spacing={3}
          alignItems="stretch"
          bg="#E2E2E2"
          padding={2}
        >
          <HStack>
            <b>Username: </b>
            <Input
              type="text"
              defaultValue={username}
              ref={newUsernameRef}
              isRequired
              bg="white"
              placeholder="Username"
            />
          </HStack>
          <HStack>
            <b>Bio: </b>
            <Textarea
              placeholder="Bio"
              type="text"
              value={newBio.substring(0, 300)}
              onChange={(e) => {
                setNewBio(e.target.value);
              }}
              bg="white"
              whiteSpace="pre-wrap"
            />
          </HStack>
          <Text fontSize="xs" align="right">
            Characters left: {Math.max(300 - newBio.length, 0)}
          </Text>

          <HStack>
            <b>Major: </b>
            <Select
              bg="white"
              value={newMajor}
              onChange={(e) => setNewMajor(e.target.value)}
            >
              {FACULTIES.map((f) => {
                return (
                  <>
                    <option disabled>{f}</option>
                    {MAJORS[f].map((m) => (
                      <option value={m}>{m}</option>
                    ))}
                    <option disabled></option>
                  </>
                );
              })}
            </Select>
          </HStack>
          <SaveCancelButton
            action="stop editing"
            actionOnConfirm={() => setIsEditing(false)}
          />
        </VStack>
      </form>
    </Box>
  );
}

export default EditUserAttributes;
