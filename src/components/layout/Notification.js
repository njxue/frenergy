import { Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../config/firebase";

function Notification(props) {
  const { author, module, category, title, body, threadId, notifId } =
    props.notif;
  const onClose = props.onClose;
  const navigate = useNavigate();
  const link = `/${module}/${category}/${threadId}`;
  const { currUser } = useAuth();
  const notificationsRef = ref.child("notifications").child(currUser.uid);

  function handleClick() {
    notificationsRef.child(notifId).remove();
  }

  return (
    <Flex>
      <Stack
        onClick={() => {
          navigate(link);
          onClose();
        }}
        cursor="pointer"
        spacing={0}
        w="90%"
      >
        <Text fontSize="sm" noOfLines={1}>
          <b>{author.displayName}</b> commented in <i>"{title}"</i>
        </Text>
        <Text fontSize="sm" noOfLines={1}>
          {body}
        </Text>
      </Stack>
      <IconButton icon={<CheckIcon />} variant="ghost" onClick={handleClick} />
    </Flex>
  );
}

export default Notification;