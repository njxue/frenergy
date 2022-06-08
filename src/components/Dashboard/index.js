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
} from "@chakra-ui/react";
import UserInfoProvider from "../../contexts/UserInfoContext";
import ModulesList from "./ModulesList";
import Feed from "./Feed";
import NoticeBoard from "../NoticeBoard";
import ModuleInfo from "./ModuleInfo";

function Dashboard() {
  return (
    <div>
      <Tabs defaultIndex={0} isManual variant="enclosed">
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Noticeboard</Tab>
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
            <Flex direction="row" flexWrap="wrap">
              <UserInfoProvider>
                <ModulesList editable={false} />
              </UserInfoProvider>
              <Feed />
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
