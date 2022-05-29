import { Flex, HStack, Spacer, G } from "@chakra-ui/react";
import UserInfoProvider from "../../contexts/UserInfoContext";
import ModulesList from "./ModulesList";
import Feed from "./Feed";

function Dashboard() {
  return (
    <div>
      <UserInfoProvider>
        <Flex direction="row" flexWrap="wrap">
          <ModulesList editable={false} />
          <Feed />
        </Flex>
      </UserInfoProvider>
    </div>
  );
}

export default Dashboard;
