import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Banner from "./components/layout/Banner";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthContext";
import UserInfoProvider from "./contexts/UserInfoContext";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import ModuleMain from "./components/ModuleMain";
import CategoryMain from "./components/CategoryMain";
import CATEGORIES from "./utils/tmpapi";
import Thread from "./components/Thread";
import { ref } from "./utils/firebase";

function App() {
  return (
    <AuthProvider>
      <div>
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
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserInfoProvider>
                  <Profile />
                </UserInfoProvider>
              </PrivateRoute>
            }
          />
          <Route path="/:moduleCode/:category/:threadId" element={<Thread />} />
          <Route path="/:moduleCode/:category" element={<CategoryMain />} />
          <Route path="/:moduleCode" element={<ModuleMain />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
