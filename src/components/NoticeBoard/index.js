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
} from "@chakra-ui/react";
import NoticeForm from "./NoticeForm";
import UserNotices from "./UserNotices";
import PublicNotices from "./PublicNotices";
import Invites from "./Invites";

function NoticeBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack align="stretch">
      <HStack>
        <Heading>NoticeBoard</Heading>
        <Button onClick={onOpen}>Create new Notice</Button>{" "}
        <NoticeForm isOpen={isOpen} onClose={onClose} />
      </HStack>
      <Tabs>
        <TabList>
          <Tab>Public</Tab>
          <Tab>Private Invites</Tab>
          <Tab>Your Notices</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PublicNotices />
          </TabPanel>
          <TabPanel>
            <Invites />
          </TabPanel>
          <TabPanel>
            <UserNotices />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default NoticeBoard;
