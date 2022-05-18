import UserInfoProvider from "../../contexts/UserInfoContext";
import ModulesList from "./ModulesList";

function Dashboard() {
  return (
    <div>
      <UserInfoProvider>
        <ModulesList editable={false}/>
      </UserInfoProvider>
    </div>
  );
}

export default Dashboard;
