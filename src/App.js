import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Banner from "./components/layout/Banner";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthContext";
import UserInfoProvider from "./contexts/UserInfoContext";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/ProfilePage";
import ModuleMain from "./components/ModulePage/ModuleMain";
import CategoryMain from "./components/CategoryPage";
import Thread from "./components/ThreadPage";
import NoticeBoard from "./components/NoticeBoard";
import GroupMain from "./components/Groups";
import DoesNotExist from "./components/layout/DoesNotExist";
import UsersProfile from "./components/OthersProfilePage";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { CATEGORIES } from "./api/customapi";
import ModuleExistChecker from "./components/ModulePage/ModuleExistChecker";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dne" exact element={<DoesNotExist />} />
          <Route path="/users/:username" element={<UsersProfile />} />
          <Route path="/profile" element={<Profile isPersonal={true} />} />

          <Route
            path="/:moduleCode"
            element={
              <ModuleExistChecker>
                <ModuleMain />
              </ModuleExistChecker>
            }
          >
            {CATEGORIES.map((category) => (
              <Route path={category}>
                <Route path="" element={<CategoryMain category={category} />} />
                <Route
                  path=":postId"
                  element={<Thread category={category} />}
                />
              </Route>
            ))}
          </Route>

          <Route path="/group/:groupId" element={<GroupMain />} />
          <Route path="*" exact element={<DoesNotExist />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
