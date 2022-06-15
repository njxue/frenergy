import { Skeleton, Text, Avatar, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import UserAvatar from "./UserAvatar";

function SearchItem(props) {
  const { userData, handleClick } = props;

  const { photoURL, username, uid } = userData;

  return (
    <HStack paddingTop={2} onClick={handleClick}>
      <UserAvatar
        size="md"
        username={username}
        photoURL={photoURL}
        disableClick
      />
      <Text color="black">{username}</Text>;
    </HStack>
  );
}
export default SearchItem;
