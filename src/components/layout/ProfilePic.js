import { useEffect, useState } from "react";
import { storageRef } from "../../config/firebase";
import { Image } from "@chakra-ui/react";
function ProfilePic(props) {
  const { user } = props;
  const [profilePicURL, setProfilePicURL] = useState();

  useEffect(() => {
    setProfilePicURL(user.photoURL);
  }, []);

  return (
    <Image
      src={profilePicURL}
      objectFit="cover"
      boxSize="50px"
      borderRadius="full"
    />
  );
}

export default ProfilePic;
