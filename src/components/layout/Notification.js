import { Flex, IconButton, Stack, Text } from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function Notification(props) {
  const { notif } = props;

  /*
    notif = {
      notifId: string,
      title: string,
      body: string
      link: string
    }
  */
  const { title, body, link, notifId } = notif;
  console.log(link)
  const onClose = props.onClose;
  const navigate = useNavigate();

  const { currUser } = useAuth();
  const notificationRef = ref
    .child("notifications")
    .child(currUser.uid)
    .child(notifId);

  function handleClick() {
    notificationRef.remove();
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
          <b>{title}</b>
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
