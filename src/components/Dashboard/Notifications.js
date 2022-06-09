import {
  Heading,
  IconButton,
  VStack,
  StackDivider,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { BellIcon, CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Notification from "./Notification";

function Notifications() {
  const { currUser } = useAuth();
  const notificationsRef = ref.child("notifications").child(currUser.uid);
  const [notifications, setNotifications] = useState([]); //array of notification objects

  /*
      notif_id = {
        title: string,
        body: string
        link: string
      }
    */

  useEffect(() => {
    notificationsRef.orderByKey().on("value", async (snapshot) => {
      const tmp = [];
      const notifications = await snapshot.val();
      for (const notifId in notifications) {
        tmp.push(Object.assign({ notifId: notifId }, notifications[notifId]));
      }
      tmp.reverse();
      setNotifications(tmp);
    });
    return () => notificationsRef.off();
  }, []);

  function handleClick() {
    notificationsRef.remove();
  }

  return (
    <VStack
      align="start"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
    >
      <HStack w="100%" justifyContent="space-between">
        <Heading fontSize="lg" fontFamily="arial">
          WHAT'S NEW
        </Heading>
        <Tooltip label="Mark all as read">
          <CheckIcon cursor="pointer" onClick={handleClick} />
        </Tooltip>
      </HStack>
      <VStack
        alignItems="stretch"
        spacing={0}
        divider={<StackDivider />}
        w="100%"
        h="500px"
        overflow="auto"
      >
        {notifications.map((notif) => (
          <Notification notif={notif} key={notif.notifId} />
        ))}
      </VStack>
    </VStack>
  );
}

export default Notifications;
