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
      <UserInfoProvider>
        <Tabs defaultIndex={0} isManual variant="enclosed">
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Noticeboard</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex direction="row" flexWrap="wrap">
                <ModulesList editable={false} />
                <Feed />
              </Flex>
            </TabPanel>
            <TabPanel>
              <NoticeBoard />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </UserInfoProvider>
    </div>
  );
}

export default Dashboard;
