import {
  VStack,
  StackDivider,
} from "@chakra-ui/react";
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

  return (
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
  );
}

export default Notifications;
