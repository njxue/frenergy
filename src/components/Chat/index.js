import { Flex, VStack, Box } from "@chakra-ui/react";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";

function Chat(props) {
  const { chatId } = props;

  return (
    <Flex direction="column" justifyContent="space-between" h="450px">
      <ChatList chatId={chatId} />
      <ChatForm chatId={chatId} />
    </Flex>
  );
}

export default Chat;
