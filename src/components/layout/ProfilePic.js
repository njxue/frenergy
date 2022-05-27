import { useEffect, useState } from "react";
import { storageRef } from "../../config/firebase";
import { Image } from "@chakra-ui/react";
function ProfilePic(props) {
  const { url } = props;

  return (
    <Image
      src={url}
      objectFit="cover"
      boxSize="50px"
      borderRadius="full"
    />
  );
}

export default ProfilePic;
