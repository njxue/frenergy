import { Flex, VStack, Box } from "@chakra-ui/react";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import { useRef } from "react";

function Chat(props) {
  const { chatId } = props;

  return (
    <Flex direction="column" justifyContent="space-between" h="500px">
      <ChatList chatId={chatId} />
      <ChatForm chatId={chatId} />
    </Flex>
  );
}

export default Chat;
