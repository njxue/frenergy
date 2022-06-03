import {
  Flex,
  HStack,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import UserInfoProvider from "../../contexts/UserInfoContext";
import ModulesList from "./ModulesList";
import Feed from "./Feed";
import NoticeBoard from "../NoticeBoard";

function Dashboard() {
  return (
    <div>
      <Tabs defaultIndex={0} isManual variant="enclosed">
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Noticeboard</Tab>
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
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Dashboard;
