import { Input, Text, Icon } from "@chakra-ui/react";
import { ref, storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { MdAddAPhoto } from "react-icons/md";
import { updateProfile } from "firebase/auth";
import ChangeablePhoto from "../layout/ChangeablePhoto";

function UserPhoto() {
  const { currUser } = useAuth();
  const userPhotoRef = ref.child(`users/${currUser.uid}/profile/photoURL`);
  const userPhotoStorage = storageRef.child(`${currUser.uid}/profile`);

  return (
    <ChangeablePhoto
      storageRef={userPhotoStorage}
      databaseRef={userPhotoRef}
      initUrl={currUser.photoURL}
      callback={(url) => {
        updateProfile(currUser, { photoURL: url });
      }}
      size={150}
    />
  );
}

export default UserPhoto;
