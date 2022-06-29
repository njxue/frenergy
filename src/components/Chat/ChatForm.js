import { ChatIcon } from "@chakra-ui/icons";
import {
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate, useTime } from "../../utils/helper";

function ChatForm(props) {
  const { chatId } = props;

  const chatRef = ref.child(`chats/${chatId}`);
  const { currUser } = useAuth();

  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const timeNow = new Date().getTime();

    const messageId = chatRef.push().key;

    const chatBody = body.trim();

    if (chatBody.length == 0) {
      return;
    }

    const messageObj = {
      author: currUser.uid,
      time: timeNow,
      body: chatBody,
    };

    chatRef.child(messageId).set(messageObj, (error) => {
      if (error) {
      } else {
        setBody("");
      }
    });
  }

  return (
    <Box bottom="0" h="50px" marginTop={1}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <HStack>
            <InputGroup>
              <Input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <InputLeftElement children={<ChatIcon />} pointerEvents="none" />
            </InputGroup>
            <IconButton
              colorScheme="teal"
              borderRadius="100px"
              as={RiSendPlaneFill}
              size="md"
              padding={2}
              cursor="pointer"
              onClick={handleSubmit}
            />
          </HStack>
        </FormControl>
      </form>
    </Box>
  );
}

export default ChatForm;
