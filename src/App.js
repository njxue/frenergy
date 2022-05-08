import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Register from "./components/Register";
import Banner from "./components/layout/Banner";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthContext";
import UserInfoProvider from "./contexts/UserInfoContext";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import MODULES from "./utils/tmpapi";
import ModuleMain from "./components/ModuleMain";
import CategoryMain from "./components/CategoryMain";
import { CATEGORIES } from "./utils/tmpapi";

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
          {MODULES.map((m) => (
            <Route path={"/" + m}>
              <Route index element={<ModuleMain id={m} />} />
              {CATEGORIES.map(c => <Route path={c.type.toLowerCase()} element={<CategoryMain mod={m} cat={c.type}/>} />)}
            </Route>
          ))}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
