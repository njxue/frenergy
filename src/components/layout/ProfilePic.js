import { useEffect, useState } from "react";
import { storageRef } from "../../config/firebase";
import { Avatar, Image } from "@chakra-ui/react";
function ProfilePic(props) {
  const { url } = props;

  return <Avatar src={url} size="md" />;
}

export default ProfilePic;
