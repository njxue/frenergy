import { VStack, HStack, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { ref } from "../../config/firebase";
import ChatItem from "./ChatItem";
import BlockwaveLoad from "../layout/BlockwaveLoad";
import EmptyPrompt from "../Dashboard/EmptyPrompt";

function ChatList(props) {
  const { chatId } = props;
  const chatRef = ref.child(`chats/${chatId}`);
  const [chats, setChats] = useState();
  const messagesEnd = useRef(null);

  useEffect(() => {
    chatRef.on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const chats = snapshot.val();
        for (const k in chats) {
          tmp.push(chats[k]);
        }
      }
      setChats(tmp);
    });
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  function scrollToBottom() {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <VStack
      bg="gray.100"
      h="90%"
      border="solid 1px"
      borderColor="gray.300"
      borderRadius="10px"
      overflow="auto"
      padding={2}
    >
      {chats == undefined ? (
        <Center h="100%" w="100%">
          <HStack>
            <Heading>Loading Chat...</Heading>
            <BlockwaveLoad />
          </HStack>
        </Center>
      ) : chats[0] ? (
        chats.map((chat) => {
          return <ChatItem chat={chat} key={chat.time} />;
        })
      ) : (
        <Center h="100%" w="100%">
          <EmptyPrompt
            group="chat messages"
            message="Say hi to your new friends!"
          />
        </Center>
      )}
      <div ref={messagesEnd}></div>
    </VStack>
  );
}

export default ChatList;
