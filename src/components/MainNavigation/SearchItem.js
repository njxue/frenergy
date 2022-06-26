import { Skeleton, Text, Avatar, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import UserAvatar from "../layout/UserAvatar";

function SearchItem(props) {
  const { userData, handleClick, onClose } = props;
  const [error, setError] = useState("");
  const { username, uid } = userData;

  return (
    <VStack align="stretch">
      <HStack
        paddingTop={2}
        onClick={() => {
          const error = handleClick();

          if (error) {
            setError(error);
          } else {
            onClose();
          }
        }}
      >
        <UserAvatar size="md" uid={uid} disableClick />
        <Text color="black">{username}</Text>;
      </HStack>
      {error && <Text color="red">{error}</Text>}
    </VStack>
  );
}
export default SearchItem;
