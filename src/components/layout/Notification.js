import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NotificationsDrawer from "./NotificationsDrawer";

function Notification(props) {
  const { author, module, category, title, body, createdAt, threadId } =
    props.notif;
  const onClose = props.onClose;
  const navigate = useNavigate();
  const link = `/${module}/${category}/${threadId}`;
  return (
    <Stack 
      onClick={() => {
        navigate(link);
        onClose();
      }}
      cursor="pointer"
      spacing={0}
    >
      <Text fontSize="sm" noOfLines={1}>
        <b>{author.displayName}</b> commented on your post <i>"{title}"</i>
      </Text>
      <Text fontSize="sm" noOfLines={1}>
        {body}
      </Text>
    </Stack>
  );
}

export default Notification;
