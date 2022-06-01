import { Badge, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";

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
      body: string,
      link: string,
      type: string
    }
  */
  const { title, body, link, notifId, type } = notif;
  console.log(link);
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
    <Flex
      bg="#F2F2F2"
      borderRadius="10px"
      border="solid"
      borderWidth="1px"
      padding={3}
    >
      <Stack
        onClick={() => {
          navigate(link);
          onClose();
        }}
        cursor="pointer"
        spacing={0}
        w="90%"
      >
        <HStack>
          {type == "notice" ? (
            <Badge bg="#FDC900" color="white">
              N
            </Badge>
          ) : type == "forum" ? (
            <Badge bg="red" color="white">
              F
            </Badge>
          ) : (
            <Badge bg="green" color="white">
              G
            </Badge>
          )}

          <Text fontSize="sm" noOfLines={1}>
            <b>{title}</b>
          </Text>
        </HStack>
        <Text fontSize="sm" noOfLines={1}>
          {body}
        </Text>
      </Stack>
      <IconButton icon={<CheckIcon />} variant="ghost" onClick={handleClick} />
    </Flex>
  );
}

export default Notification;
