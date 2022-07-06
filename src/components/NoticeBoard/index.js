import {
  HStack,
  Heading,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  VStack,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import NoticeForm from "./NoticeForm";
import UserGroups from "../Dashboard/UserGroups";
import PublicNotices from "./PublicNotices";

import Invites from "./Invites";
import { TabPane } from "react-bootstrap";

function NoticeBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack align="stretch">
      <HStack>
        <Heading>Study Lounge</Heading>
        <Button onClick={onOpen}>Create</Button>
        <NoticeForm isOpen={isOpen} onClose={onClose} />
      </HStack>
      <Text fontSize="sm">
        Tired of doing assignments alone? Checkout the <strong> public </strong>
        tab to join available study lounges, or check out the
        <strong> invites </strong> tab to check for any invitations!
      </Text>
      <Tabs isLazy>
        <TabList>
          <Tab>Public</Tab>
          <Tab>Invites</Tab>
          <Tab>My Lounges</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PublicNotices />
          </TabPanel>
          <TabPanel>
            <Invites />
          </TabPanel>
          <TabPanel>
            <UserGroups />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default NoticeBoard;
