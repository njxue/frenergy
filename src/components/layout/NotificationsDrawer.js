import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Notification from "./Notification";

function NotificationsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currUser } = useAuth();
  const notificationsRef = ref.child("notifications").child(currUser.uid);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationsRef.orderByKey().on("value", (snapshot) => {
      const tmp = [];
      snapshot.forEach((data) => {
        tmp.push(data.val());
      });
      setNotifications(tmp);
    });
  }, []);
  return (
    <>
      <IconButton icon={<BellIcon />} variant="unstyled" onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notifications</DrawerHeader>
          <DrawerBody>
            {notifications.map((notif) => (
              <Notification notif={notif} onClose={onClose}/>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NotificationsDrawer;
