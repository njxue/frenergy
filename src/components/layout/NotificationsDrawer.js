import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Heading,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, CheckIcon } from "@chakra-ui/icons";
import Notifications from "../Dashboard/Notifications";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function NotificationsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currUser } = useAuth();
  const notificationsRef = ref.child(`notifications/${currUser.uid}`);
  return (
    <>
      <BellIcon cursor="pointer" onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack w="100%" justifyContent="space-between">
              <Heading fontSize="lg" fontFamily="arial">
                WHAT'S NEW
              </Heading>
              <Tooltip label="Mark all as read">
                <CheckIcon
                  cursor="pointer"
                  onClick={() => notificationsRef.remove()}
                />
              </Tooltip>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Notifications />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NotificationsDrawer;
