import {
  VStack,
  Badge,
  HStack,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { CheckIcon } from "@chakra-ui/icons";
import { ref } from "../../config/firebase";
import { useState } from "react";

function Notification(props) {
  const { notif } = props;
  const { title, body, link, notifId, type } = notif;
  const navigate = useNavigate();
  const { currUser } = useAuth();
  const notificationRef = ref.child(`notifications/${currUser.uid}/${notifId}`);
  const [background, setBackground] = useState("white");

  const badges = {
    forum: { symbol: "F", color: "red" },
    notice: { symbol: "R", color: "#FDC900" },
    group: { symbol: "S", color: "blue" },
  };

  function handleClick() {
    notificationRef.remove();
  }

  return (
    <HStack
      cursor="pointer"
      bg={background}
      onMouseOver={() => setBackground("#EFEDED")}
      onMouseLeave={() => setBackground("white")}
      padding={2}
      w="100%"
      justifyContent="space-between"
    >
      <VStack onClick={() => navigate(link)} align="start" spacing={0}>
        <HStack>
          <Badge color="white" bg={badges[type].color}>
            {badges[type].symbol}
          </Badge>
          <Text as="b">{title}</Text>
        </HStack>
        <Text>{body}</Text>
      </VStack>
   
      <Tooltip label="Mark as read">
        <CheckIcon cursor="pointer" onClick={handleClick} />
      </Tooltip>
    </HStack>
  );
}

export default Notification;
