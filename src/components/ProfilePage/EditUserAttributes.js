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

  function handleSubmit(e) {
    e.preventDefault();

    const newUsername = newUsernameRef.current.value.trim();

    if (newUsername.length == 0) {
      setError("Username must contain at least 1 non-empty character!");
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
    <Box padding={2} w="100%">
      <form onSubmit={handleSubmit}>
        <VStack maxW="100vw" spacing={3} alignItems="stretch">
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
