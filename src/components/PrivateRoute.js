import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Loader from "./layout/Loader";
import { Outlet } from "react-router-dom";
import Banner from "./layout/Banner";

function PrivateRoute() {
  const { loggedIn } = useAuth();

  if (loggedIn == undefined) {
    return <Loader />;
  }
  return (
    <div>
      {loggedIn ? (
        <>
          <Banner />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default PrivateRoute;
