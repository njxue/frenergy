import {
  VStack,
  FormControl,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState, useRef } from "react";
import { ref } from "../../config/firebase";
import ChatItem from "./ChatItem";
import { useAuth } from "../../contexts/AuthContext";

function ChatList(props) {
  const { chatId } = props;
  const chatRef = ref.child(`chats/${chatId}`);
  const [chats, setChats] = useState([]);
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
    console.log("scrolling");
    scrollToBottom();
  }, [chats]);

  function scrollToBottom() {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <VStack bg="gray.100" h="90%" overflow="auto" padding={2}>
      {chats.map((chat) => {
        return <ChatItem chat={chat} />;
      })}
      <div ref={messagesEnd}></div>
    </VStack>
  );
}

export default ChatList;
