import {
  Flex,
  HStack,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import Notifications from "./Notifications";
import ModulesList from "./ModulesList";
import UserGroups from "./UserGroups";

import NoticeBoard from "../NoticeBoard";
import ModuleInfo from "./ModuleInfo";
import Pinned from "./Pinned";

function Dashboard() {
  return (
    <div>
      <Tabs defaultIndex={0} isManual variant="enclosed" isLazy>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Study Lounge</Tab>
          <Tab>
            <HStack>
              <Text align="start">Modules Info</Text>
              <Image
                src={require("../../static/nusmodslogo.png")}
                boxSize="20px"
              />
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              direction="row"
              flexWrap="wrap"
              justifyContent="space-around"
              gap={5}
            >
              <ModulesList />
              <UserGroups />
              <Pinned />
            </Flex>
          </TabPanel>
          <TabPanel>
            <NoticeBoard />
          </TabPanel>
          <TabPanel>
            <ModuleInfo />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Dashboard;
