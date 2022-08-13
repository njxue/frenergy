import { formatDate, useProfile } from "../../utils/helper";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../layout/UserAvatar";

function ChatItem(props) {
  const { chat } = props;
  const { author, body, time } = chat;
  const { currUser } = useAuth();

  const formattedTime = formatDate(new Date(time), false, true);

  return (
    <HStack
      justifyContent={currUser.uid == author ? "flex-end" : "flex-start"}
      w="100%"
      align="top"
    >
      {currUser.uid != author && <UserAvatar uid={author} />}
      <VStack align={currUser.uid == author ? "end" : "start"} spacing={0}>
        <Text
          bg={currUser.uid == author ? "#FF5600" : "#051e3e"}
          padding={2}
          borderRadius={10}
          color="white"
          maxW="700px"
        >
          {body}
        </Text>
        <Text fontSize="xs">{formattedTime}</Text>
      </VStack>
      {currUser.uid == author && <UserAvatar uid={author} />}
    </HStack>
  );
}

export default ChatItem;
