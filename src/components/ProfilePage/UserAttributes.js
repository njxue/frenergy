import { Image, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState, useLayoutEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserInfoContext } from "../../contexts/UserInfoContext";

function UserAttributes() {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const { changeProfilePic } = useUserInfoContext();
  const { currUser } = useAuth();

  useEffect(() => {
    setImageURL(currUser.photoURL);
  }, []);

  useEffect(() => {
    if (image != undefined) {
      const imgURL = URL.createObjectURL(image);
      setImageURL(imgURL);
      changeProfilePic(image);
    }
  }, [image]);

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <VStack>
      <Image
        boxSize="150px"
        objectFit="cover"
        src={imageURL}
        borderRadius="full"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <form>
        <Input type="file" onChange={handleChange}></Input>;
      </form>
    </VStack>
  );
}

export default UserAttributes;
