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
    <Box>
      <Tabs defaultIndex={0} isManual variant="enclosed" isLazy>
        <TabList>
          <Tab _focus={{ borderColor: "#051e3e", borderWidth: "5px" }}>
            Dashboard
          </Tab>
          <Tab _focus={{ borderColor: "#051e3e", borderWidth: "5px" }}>
            Study Lounge
          </Tab>
          <Tab _focus={{ borderColor: "#051e3e", borderWidth: "5px" }}>
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
    </Box>
  );
}

export default Dashboard;
