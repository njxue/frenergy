import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Loader from "./layout/Loader";
import { Outlet } from "react-router-dom";
import Banner from "./layout/Banner";
import { VStack, Box } from "@chakra-ui/react";

function PrivateRoute() {
  const { loggedIn } = useAuth();

  if (loggedIn == undefined) {
    return <Loader />;
  }
  return (
    <Box margin={0} padding={0}>
      {loggedIn ? (
        <VStack h="100vh" align="stretch" spacing={0}>
          <Banner />
          <Outlet />
        </VStack>
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default PrivateRoute;
