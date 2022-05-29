import { HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref, storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import SaveCancelButton from "../layout/SaveCancelButton";

function EditUserAttributes(props) {
  const { userData, setIsEditing } = props;
  const { username, bio, major } = userData;
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const [newMajor, setNewMajor] = useState(major);

  const { currUser } = useAuth();
  const userRef = ref.child(`users/${currUser.uid}/profile`);

  function handleSubmit(e) {
    e.preventDefault();
    userRef.update(
      {
        username: newUsername,
        bio: newBio,
        major: newMajor,
      },
      () => {
        setIsEditing(false);
      }
    );

    currUser.updateProfile({
      displayName: newUsername,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack maxW="100vw" spacing={3} alignItems="stretch">
        <HStack>
          <b>Username: </b>
          <Input
            type="text"
            defaultValue={username}
            onChange={(e) => setNewUsername(e.target.value)}
            isRequired
          />
        </HStack>
        <HStack>
          <b>Bio: </b>
          <Textarea
            type="text"
            defaultValue={bio}
            onChange={(e) => setNewBio(e.target.value)}
          />
        </HStack>

        <HStack>
          <b>Major: </b>
          <Input
            type="text"
            defaultValue={major}
            onChange={(e) => setNewMajor(e.target.value)}
          />
        </HStack>
        <SaveCancelButton
          action="stop editing"
          actionOnConfirm={() => setIsEditing(false)}
        />
      </VStack>
    </form>
  );
}

export default EditUserAttributes;
