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
  Box,
} from "@chakra-ui/react";

import ModulesList from "./ModulesList";
import UserGroups from "./UserGroups";

import NoticeBoard from "../NoticeBoard";
import ModuleInfo from "./ModuleInfo";
import Pinned from "./Pinned";

function Dashboard() {
  return (
    <Tabs defaultIndex={0} isManual variant="enclosed" isLazy h="100%">
      <TabList>
        <Tab data-testid="dashboardTab">Dashboard</Tab>
        <Tab data-testid="loungeTab">Study Lounge</Tab>
        <Tab data-testid="nusmodsTab">
          <HStack>
            <Text align="center">Modules Info</Text>
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
  );
}

export default Dashboard;
