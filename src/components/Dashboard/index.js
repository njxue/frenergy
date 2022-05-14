import MainNavigation from "../layout/MainNavigation";
import UserInfoProvider from "../../contexts/UserInfoContext";
import ModulesList from "./ModulesList";

function Dashboard() {
  return (
    <div>
      <MainNavigation />
      <UserInfoProvider>
        <ModulesList />
      </UserInfoProvider>
    </div>
  );
}

export default Dashboard;
