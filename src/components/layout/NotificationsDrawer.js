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
  VStack,
} from "@chakra-ui/react";
import { BellIcon, CheckIcon } from "@chakra-ui/icons";
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
        tmp.push(Object.assign(data.val(), {key: data.key}));
      });
      setNotifications(tmp);
      console.log(tmp)
    });
    return () => notificationsRef.off();
  }, []);

  function handleClick() {
    notificationsRef.remove();
  }
  
  return (
    <>
      <IconButton icon={<BellIcon />} variant="unstyled" onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Notifications
            <IconButton icon={<CheckIcon />} onClick={handleClick} />
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="stretch" spacing={5}>
              {notifications.map((notif) => (
                <Notification notif={notif} onClose={onClose} />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NotificationsDrawer;
