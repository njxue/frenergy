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

function App() {
  return (
    <Box h="100vh">
      <AuthProvider>
        <Banner />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/dne" exact element={<DoesNotExist />} />
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route
            path="/users/:username"
            element={
              <PrivateRoute>
                <UsersProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/:moduleCode" element={<ModuleMain />}>
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

          <Route
            path="/group/:groupId"
            element={
              <PrivateRoute>
                <GroupMain />
              </PrivateRoute>
            }
          />
          <Route path="*" exact element={<div>This page does not exist</div>} />
        </Routes>
      </AuthProvider>
    </Box>
  );
}

export default App;
